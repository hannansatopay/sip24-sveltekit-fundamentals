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
  
      if (filter === 'none' || ![
        'grayscale',
       'sepia', 
       'invert', 
       'contrast'
       , 'brightness'].includes(filter)) {
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
  
          switch (filter) {
            case 'grayscale':
              ctx.filter = 'grayscale(100%)';
              break;
            case 'sepia':
              ctx.filter = 'sepia(100%)';
              break;
            case 'invert':
              ctx.filter = 'invert(100%)';
              break;
            case 'contrast':
              ctx.filter = 'contrast(200%)';
              break;
            case 'brightness':
              ctx.filter = 'brightness(150%)';
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
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold font-sans">Craftlab</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 md:mb-0">
        <label for="dropzone" class="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
        <div class="flex justify-center">
          <label for="dropzone" class="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            {#if fileInput && fileInput.files && fileInput.files.length > 0}
              <img src="{URL.createObjectURL(fileInput.files[0])}" alt="Uploaded Image" class="max-h-48 mb-4" aria-hidden="true"/>
            {:else}
              <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
              <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
            <input bind:files on:change="{handleFileChange}" bind:this="{fileInput}" name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
          </label>
        </div>
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 md:mb-0">
        <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Apply Filter</label>
        <select id="filter" name="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" on:change="{handleFilterChange}">
          <option value="none">None</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
          <option value="contrast">Contrast</option>
          <option value="brightness">Brightness</option>
        </select>
      </div>
      <div class="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 md:mb-0">
        <canvas bind:this="{canvas}" class="w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"></canvas>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 xl:w-1/2 px-3 mb-6 md:mb-0">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>
      <div class="w-full md:w-1/2 xl:w-1/2 px-3 mb-6 md:mb-0">
        <label for="content" class="blockmb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
      </div>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
  </form>