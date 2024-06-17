<script>
    let files = null;
    let imageUrl = '';
    let originalImage = null;
    let selectedFilter = 'none';
  
    function handleFileUpload(event) {
      files = event.target.files;
      if (files && files.length) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl = e.target.result;
          loadImage(imageUrl);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  
    function loadImage(src) {
      const img = new Image();
      img.onload = () => {
        originalImage = img;
        drawImageWithFilter('none');
        drawFilterPreviews();
      };
      img.src = src;
    }
  
    const filters = {
      none: '',
      grayscale: 'grayscale(100%)',
      sepia: 'sepia(100%)',
      blur: 'blur(5px)',
      brightness: 'brightness(150%)',
      invert: 'invert(100%)',
    };
  
    function drawImageWithFilter(filter) {
      const canvas = document.getElementById('mainCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      ctx.filter = filters[filter];
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    }
  
    function drawFilterPreviews() {
      for (const [filter, value] of Object.entries(filters)) {
        const canvas = document.getElementById(`filterCanvas-${filter}`);
        if (canvas) {
          const ctx = canvas.getContext('2d');
          canvas.width = 100;
          canvas.height = 100;
          ctx.filter = value;
          ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
        }
      }
    }
  
    function applyFilter(filter) {
      selectedFilter = filter;
      drawImageWithFilter(filter);
    }
  </script>
  
  <style>
    .image-container canvas {
      max-width: 100%;
      max-height: 100%;
    }
    .filter-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter-option {
      width: 100px;
      height: 120px;
      overflow: hidden;
      border: 2px solid #ccc;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .filter-option canvas {
      width: 100%;
      height: 100%;
    }
    .filter-option p {
      margin: 5px 0 0;
      font-size: 12px;
      text-align: center;
      color: initial;
    }
    .image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  </style>
  
  <header class="p-4 shadow-md sticky top-0 z-10" style="background-color: #FFFAF0;">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">MyInsta</h1>
      <a href="/" class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container mx-auto p-5 my-8 w-10/12 md:w-6/12 bg-green-50 rounded-lg shadow-md" method="POST" enctype="multipart/form-data" style="background-color: #F0FFF0;">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50" style="height: 360px; position: relative;">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if imageUrl}
          <div class="image-container mb-4 items-center justify-center" style="align-items: center; height: 300px; width: 100%;">
            <canvas id="mainCanvas"></canvas>
          </div>
          <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
          <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
      </div>
      <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden items-center justify-center" required on:change={handleFileUpload} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;"/>
    </label>
  
    {#if imageUrl}
      <div class="filter-options mb-4">
        {#each Object.entries(filters) as [filter, value]}
          <div class="filter-option" on:click={() => applyFilter(filter)}>
            <canvas width="100" height="100" id="filterCanvas-{filter}" style="filter: {value};"></canvas>
            <p>{filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
          </div>
        {/each}
      </div>
    {/if}
  
    <div class="mb-3">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
      <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
  
    <div class="mb-3">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
      <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
  
    <div class="flex justify-center">
      <button type="submit" class="w-60 text-white bg-pink-700 hover:bg-pink-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
    </div>
  </form>
  