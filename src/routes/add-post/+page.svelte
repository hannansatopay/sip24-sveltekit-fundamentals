<script>
  import { onMount } from 'svelte';

  let files = null;
  let imageUrl = '';
  let canvas;
  let ctx;
  let originalImageData;

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
    } else {
      console.error('Canvas element not found.');
    }
  });

  function handleFileChange(event) {
    if (event) {
      files = event.target.files;
    }
    if (files && files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl = event.target.result;
        loadImageToCanvas(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      imageUrl = '';
      clearCanvas();
    }
  }

  function loadImageToCanvas(url) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = url;
  }

  function applyGrayscale() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
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

  function resetImage() {
    if (originalImageData) {
      ctx.putImageData(originalImageData, 0, 0);
    }
  }

  function clearCanvas() {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      console.error('Canvas context is not available for clearing.');
    }
  }
</script>

<style>
  .canvas-container {
    margin-top: 20px;
    text-align: center;
  }

  canvas {
    border: 1px solid black;
  }

  .filter-buttons {
    margin-top: 20px;
  }

  .filter-buttons button {
    margin: 5px;
    padding: 10px;
  }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="font-bold text-2xl font-['Comic_Sans_MS']">Craftlab</h1>
    <a href="/"><button class="bg-blue-500 hover:bg-blue-700 border-none px-4 py-2 font-medium text-white rounded">Home</button></a>
  </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
  <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if files && files.length}
          <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
        {/if}
      </div>
      <input bind:files={files} name="image" id="dropzone-file" type="file" class="hidden" accept="image/png, image/jpeg, image/jpg" required on:change={handleFileChange}/>
    </label>
  </div>

  <div class="canvas-container">
    <canvas bind:this={canvas}></canvas>
    <div class="filter-buttons">
      <button type="button" on:click={applyGrayscale} class="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-medium text-sm rounded-md">Grayscale</button>
      <button type="button" on:click={applySepia} class="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-md">Sepia</button>
      <button type="button" on:click={resetImage} class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm rounded-md">Reset</button>
    </div>
  </div>

  <div class="space-y-2 my-2">
    <label for="username" class="block text-sm font-bold ml-1">Username</label>
    <input name="username" id="username" class="bg-gray-50 border border-gray-400 rounded-md p-2.5 w-full block" type="text">
  </div>
  <div class="space-y-2 my-2">
    <label for="content" class="block text-sm font-bold ml-1">Content</label>
    <textarea name="content" id="content" class="bg-gray-50 border border-gray-400 rounded-md p-2.5 w-full block" type="text"></textarea>
  </div>
  <button class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm rounded-md" type="submit">Share</button>
</form>
