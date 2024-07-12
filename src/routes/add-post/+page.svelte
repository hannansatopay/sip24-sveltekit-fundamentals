<script>
    let files = null;
    import { onMount } from "svelte";
  
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
  
      if (filter === 'none' || !['grayscale', 'sepia', 'invert', 'brightness', 'contrast'].includes(filter)) {
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
  
          switch(filter) {
            case 'grayscale':
              ctx.filter = 'grayscale(100%)';
              break;
            case 'sepia':
              ctx.filter = 'sepia(100%)';
              break;
            case 'invert':
              ctx.filter = 'invert(100%)';
              break;
            case 'brightness':
              ctx.filter = 'brightness(150%)';
              break;
            case 'contrast':
              ctx.filter = 'contrast(200%)';
              break;
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
    .file-input {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      border: 2px dashed #ccc;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    .file-input:hover {
      border-color: #888;
    }
    .file-input svg {
      margin-bottom: 0.5rem;
    }
    .sidebar {
      background-color: #f7f7f7;
      padding: 2rem;
      border-right: 1px solid #ddd;
    }
    .content {
      padding: 2rem;
      flex-grow: 1;
    }
  </style>

  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold font-['Comic_Sans_MS'] text-blue-600">Craftlab</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>

  <div class="container mx-auto flex mt-5">
    <div class="sidebar w-1/4">
      <label for="dropzone" class="file-input flex flex-col items-center justify-center mb-5">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          {#if fileInput && fileInput.files && fileInput.files.length > 0}
            <p class="text-sm text-gray-500 font-semibold">{fileInput.files[0].name}</p>
          {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
          {/if}
        </div>
        <input bind:files on:change="{handleFileChange}" bind:this="{fileInput}" name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
      </label>

      <div class="mb-3">
        <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Apply Filter</label>
        <select id="filter" name="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" on:change="{handleFilterChange}">
          <option value="none">None</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
        </select>
      </div>
    </div>

    <div class="content w-3/4">
      <canvas bind:this="{canvas}" class="mb-3 flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"></canvas>

      <form method="POST" enctype="multipart/form-data" class="mt-5">
        <div class="mb-3">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>
        <div class="mb-3">
          <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
          <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
      </form>
    </div>
  </div>n