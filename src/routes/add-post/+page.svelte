<script>
  import { onMount } from "svelte";

  let files = null;
  let imagePreview = null;
  let filter = "none"; // Initialize with no filter

  function handleFileSelect(event) {
    files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  function applyFilter(selectedFilter) {
    filter = selectedFilter;
  }

  onMount(() => {
    const dropzone = document.getElementById("dropzone");
    dropzone.addEventListener("change", handleFileSelect);
  });
</script>

<header class="bg-white py-4 shadow-md sticky top-0">
  <div class="container mx-auto">
    <div class="flex justify-between items-center">
      <a href="/" class="text-2xl font-bold text-gray-800 pr-4">InstaPost</a>
      <a href="/" class="bg-blue-500 text-white p-1 rounded font-semibold text-sm mr-2 hover:bg-blue-600">Home</a>
    </div>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <div class="flex justify-center items-center">
    <div class="w-full md:w-1/2">
      <h1 class="text-2xl font-bold text-center">Add Post</h1>
      <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          {#if imagePreview}
            <img src={imagePreview} alt="Preview" class="w-2/3 h-2/3 object-contain" style="filter: {filter};" />
            <p class="text-gray-500 text-xs font-semibold">{files[0].name}</p>
          {:else if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
          {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500">PNG or JPG</p>
          {/if}
        </div>
        <input 
          id="dropzone" 
          name="image"
          type="file" 
          accept="image/png, image/jpeg" 
          class="hidden"
        />
      </label>
      
      <!-- Filter Options -->
      <div class="mt-4 text-center">
        <span class="font-semibold text-gray-600">Filters: </span>
        <button type="button" class="bg-gray-200 p-2 rounded mr-2 hover:bg-gray-300" on:click={() => applyFilter('none')}>None</button>
        <button type="button" class="bg-gray-200 p-2 rounded mr-2 hover:bg-gray-300" on:click={() => applyFilter('grayscale(100%)')}>Grayscale</button>
        <button type="button" class="bg-gray-200 p-2 rounded mr-2 hover:bg-gray-300" on:click={() => applyFilter('contrast(200%)')}>Vivid</button>
      </div>
      
      <div class="mt-4">
        <label for="username" class="block text-sm font-semibold text-gray-600">Username</label>
        <input type="text" id="username" name="username" class="w-full p-2 border border-gray-300 rounded mt-1">
      </div>
      <div class="mt-4">
        <label for="description" class="block text-sm font-semibold text-gray-600">Description</label>
        <textarea name="description" id="description" class="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
      </div>
      <div class="mt-4">
        <button class="bg-blue-500 text-white p-2 rounded font-semibold text-sm mr-2 hover:bg-blue-600" type="submit">Add Post</button>
      </div>
    </div>
  </div>
</form>
