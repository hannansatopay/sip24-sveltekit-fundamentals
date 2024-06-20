<script>
  import { onMount } from "svelte";
  let files = null;
  let imageSrc = "";
  let canvas, ctx;

  function loadImage() {
    const file = files && files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageSrc = e.target.result;
        drawImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  }

  function drawImage(src) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = src;
  }

  function applyGrayscale() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function applySepia() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
      data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
      data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    canvas.toBlob(async (blob) => {
      formData.set('image', blob, 'filtered-image.png');
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error('Failed to submit the form');
      }
    }, 'image/png');
  }

  onMount(() => {
    canvas = document.getElementById("imageCanvas");
    ctx = canvas.getContext("2d");
  });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-100">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
  </div>
</header>

<div class="flex justify-center items-center min-h-screen ">
  <div class=" shadow-custom w-full max-w-lg p-5 md:p-10 lg:p-20 bg-purple-200 rounded-lg">
    <form method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
      <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center p-4">
          {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
          {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
          {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={loadImage} />
      </label>
      <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>
      <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
      </div>
      <div class="canvas-container mb-3 bg-white">
        <canvas id="imageCanvas" class="border border-white rounded-lg w-full"></canvas>
      </div>
      <div class="mt-2 flex flex-col sm:flex-row gap-2">
        <button type="button" class="text-white bg-gray-900 font-bold rounded-lg text-xl px-5 py-2.5 w-full sm:w-1/3" on:click={applyGrayscale}>Grayscale</button>
        <button type="button" class="text-white bg-pink-800 font-bold rounded-lg text-xl px-5 py-2.5 w-full sm:w-1/3" on:click={applySepia}>Sepia</button>
        <button type="submit" class="text-white bg-blue-800  font-bold rounded-lg text-xl px-5 py-2.5 w-full sm:w-1/3">Upload</button>
      </div>
    </form>
  </div>
</div>


<style>
  /* styles.css */
.shadow-custom {
    box-shadow: 10px 10px 0 0 rgb(0, 15, 39);
}

  .canvas-container {
    max-width: 100%;
    overflow-x: auto;
  }
</style>
