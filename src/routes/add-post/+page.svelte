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

  if (filter === 'none' || filter !== 'grayscale' && filter !== 'sepia') {
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


<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-comic-sans text-blue-700">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">

   <div class="w-full flex h-auto justify-between">
  <label for="dropzone" class="mb-3 flex flex-col items-center w-1/3 justify-center h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if fileInput && fileInput.files && fileInput.files.length > 0}
        <p class="text-sm text-gray-500 font-semibold">{fileInput.files[0].name}</p>
      {:else}
        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
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

  </select>
</div>

  <canvas bind:this="{canvas}" class="mb-3 flex flex-col items-center justify-center w-auto h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"></canvas>
  
</div>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="conten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>


<style>
  /* Ensure the font is Comic Sans MS */
  body {
      font-family: 'Arial', sans-serif;
  }

  .font-comic-sans {
      font-family: 'Comic Sans MS', sans-serif;
  }

  /* Styling for the header */
  header {
      background-color: #3f51b5;
      color: #ffffff;
      padding: 10px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      position: sticky;
      top: 0;
      z-index: 1000;
  }

  .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
  }

  /* Styling for input, textarea, and button */
  input[type="text"],
  textarea,
  button {
      width: 100%;
      padding: 10px;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.4;
      transition: border-color 0.3s ease;
      background-color: #f5f5f5;
  }

  input[type="text"]:focus,
  textarea:focus {
      outline: none;
      border-color: #3f51b5;
  }

  button {
      background-color: #3f51b5;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  button:hover {
      background-color: #303f9f;
  }

  /* Dropzone and canvas styling */
  .border-dashed {
      border-style: dashed;
  }
</style>
