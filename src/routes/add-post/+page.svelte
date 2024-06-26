<script>
  import { onMount } from "svelte";
  let files = null;
  let fileInput;
  let canvas;
  let ctx;
  let originalImageData = null;

  onMount(() => {
    ctx = canvas.getContext('2d');
  });

  function handleFileChange(event) {
    const selectElement = document.getElementById('filter');
    selectElement.selectedIndex = 0;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const aspectRatio = img.width / img.height;
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientWidth / aspectRatio;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.classList.add('fade-in');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function saveCanvasImage() {
    canvas.toBlob(blob => {
      const file = new File([blob], "modified_image.png", { type: "image/png" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      document.getElementById('dropzone').files = dataTransfer.files;
    }, 'image/png');
  }

  let currentFilter = 'none';

  function applyFilter(filter) {
    if (!canvas || !ctx) return;
    if (filter === 'none' || (filter !== 'grayscale' && filter !== 'sepia')) {
      if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
        originalImageData = null;
        saveCanvasImage();
        return;
      }
    }
    const img = new Image();
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientWidth / aspectRatio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (filter === 'none') {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveCanvasImage();
      } else {
        if (!originalImageData) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        if (filter === 'grayscale') {
          ctx.filter = 'grayscale(100%)';
        } else if (filter === 'sepia') {
          ctx.filter = 'sepia(100%)';
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveCanvasImage();
      }
      ctx.filter = 'none';
    };
    img.src = canvas.toDataURL();
  }

  function handleFilterChange(event) {
    currentFilter = event.target.value;
    applyFilter(currentFilter);
  }

  function resetFilter() {
    applyFilter('none');
  }
</script>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  header {
    animation: fadeIn 1s ease-in-out;
  }
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  .hover-effect:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    border-color: #00f;
  }
  .upload-label {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  .upload-label:hover {
    background-color: #e0f7fa;
    transform: scale(1.05);
  }
  select {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  select:hover {
    background-color: #e0f7fa;
    color: #00796b;
  }
  .submit-button {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  .submit-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  .filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
  }
  .filter-container select {
    margin-bottom: 10px;
  }
  .filter-container canvas {
    border: 1px solid #ccc;
    margin-top: 10px;
  }
  .bg-sky-blue {
        background-color: #22befb; /* Sky blue color */
    }
</style>

<header class="bg-white py-3 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaGallery</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-sky-blue">Home</a>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length}
        <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
      {:else}
        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
    </div>
    <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change="{handleFileChange}" bind:this="{fileInput}" required />
  </label>

  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
    <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
  </div>
  
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
    <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
  </div>

  <div class="filter-container mb-3">
    <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Choose Filter</label>
    <select id="filter" name="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" on:change="{handleFilterChange}">
      <option value="none">None</option>
      <option value="grayscale">Grayscale</option>
      <option value="sepia">Sepia</option>
    </select>
    <canvas bind:this="{canvas}" class="fade-in"></canvas>
  </div>

  <button type="submit" class="bg-sky-blue submit-button text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
