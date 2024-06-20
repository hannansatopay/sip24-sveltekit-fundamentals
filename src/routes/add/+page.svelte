<script>
    import { onMount } from "svelte";
  
    let files = null;
    let canvas;
  
    // Function to handle the file change and draw on canvas
    function handleFileChange(event) {
      files = event.target.files;
      if (files && files.length) {
        const file = files[0];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  </script>
  
  <header class="bg-white py-5 shadow-md mb-6 sticky top-0">
    <div class="container mx-auto p-1 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-sans">
            INSTAHUB 
        </h1>
        <div>
            <a class="p-3 bg-green-300 rounded-lg text-sm font-semibold" href='/'>HOME</a>
        </div>
    </div>
</header>

  <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <canvas bind:this={canvas} class="mb-4 max-h-48"></canvas>
        {#if files && files.length}
          <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
          <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
      </div>
      <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
    </label>
    <div class="mb-3">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
      <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required/>
    </div>
    <div class="mb-3">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
      <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
  </form>
  