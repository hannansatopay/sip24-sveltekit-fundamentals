<script>
    import { onMount } from "svelte";
    let files = null;
    let imageUrl = null;
    let canvas;
    let ctx;
    let originalImageData;
  
    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl = e.target.result;
          loadImage();
        };
        reader.readAsDataURL(file);
      }
    }
  
    function loadImage() {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
    }
  
    function applyFilter(filter) {
      if (!originalImageData) return;
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      for (let i = 0; i < imageData.data.length; i += 4) {
        const [r, g, b] = [
          imageData.data[i],
          imageData.data[i + 1],
          imageData.data[i + 2],
        ];
        if (filter === "grayscale") {
          const avg = (r + g + b) / 3;
          imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
        } else if (filter === "sepia") {
          imageData.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
          imageData.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
          imageData.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  
    function resetImage() {
      if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
      }
    }
  
    onMount(() => {
      if (canvas) {
        ctx = canvas.getContext("2d");
      }
    });
  </script>
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Helvetica']">Devgram</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="mb-4">
      <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
          {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
          {/if}
        </div>
      </label>
      <input bind:files={files} on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
    </div>
  
    <div class="mb-4">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
      <input id="username" name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>
  
    <div class="mb-4">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Content</label>
      <textarea id="content" name="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
  
    <div class="mb-5">
      {#if imageUrl}
        <div class="flex flex-col items-center">
          <canvas bind:this={canvas} class="mb-4"></canvas>
          <div class="flex space-x-4">
            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md" on:click={() => applyFilter("grayscale")}>Grayscale</button>
            <button type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md" on:click={() => applyFilter("sepia")}>Sepia</button>
            <button type="button" class="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-md" on:click={resetImage}>Reset</button>
          </div>
        </div>
      {/if}
    </div>
  
    <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Share</button>
  </form>
  
  <style>
    canvas {
      max-width: 100%;
      height: auto;
    }
  </style>
  