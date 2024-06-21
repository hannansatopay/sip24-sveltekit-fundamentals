<script>

    let files=null;
    let imageUrl = '';
    let selectedFilter = '';

// Function to handle the file change
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
  // Function to apply selected filter
  function applyFilter(filterName) {
    selectedFilter = filterName;
  }

  // Function to reset filters (set to normal)
  function resetFilters() {
    selectedFilter = ''; // Reset selected filter
  }


</script>

<header class="bg-white py-3 shadow-md px-2 sticky">
    <div class="flex justify-between items-center">
        <h1 class="font-bold text-3xl font-['Comic_Sans_MS']">MustPost</h1>
        <a href="./" class="bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white font-bold rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5"  method="POST" enctype="multipart/form-data">
   
    <label for="dropzone" class="mb-3 flex flex-col items-center   justify-center w-full ">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if imageUrl}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={imageUrl} alt="Selected Image" class="w-[300px] image-preview" style="--filter: {selectedFilter}">
    
            {:else}
            <img class="w-full h-[200px]" src="https://imgproxy.epicpxls.com/QYpDBZjuuguXNHJdTH_5ypHJARfCHXSL26i-1LGeDH4/rs:fill:800:600:0/g:no/aHR0cHM6Ly9pdGVt/cy5lcGljcHhscy5j/b20vdXBsb2Fkcy9w/aG90by80MGFhZjNl/YzQ0YTM5Y2VmMzM4/NzI5NjJkOWQ3NWYy/Yg.jpg" alt="">
            <p class="text-sm text-gray-500 font-semibold">click to upload</p>
       
            {/if}
          </div>
        <input bind:files on:change={handleFileChange} name="image" type="file" id="dropzone" accept="image/png ,image/jpeg" class="hidden" required>
    
       </label>
       <div class="flex justify-between mt-4">

        <button  type="button" on:click={() => applyFilter('grayscale(100%)')} class="bg-blue-400 py-2 px-3 rounded-lg text-white filter-button">Grayscale</button>
        <button  type="button" on:click={() => applyFilter('sepia(100%)')} class="bg-yellow-400 py-2 px-3 rounded-lg text-white filter-button">Sepia</button>
        <button  type="button" on:click={() => applyFilter('brightness(150%)')} class="bg-purple-400 py-2 px-3 rounded-lg text-white filter-button">Brightness</button>

        <button  type="button" on:click={resetFilters} class="bg-red-600 py-2 px-3 rounded-lg text-white">Reset</button> 
      </div>
   
    
    <div class=" ml-5 mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 py-2  w-full md:w-1/2 rounded-lg  border border-gray-300 text-sm block p-2.5">

    </div>
    <div class="ml-5 mb-3">
        <label for="content">Description</label>
        <textarea name="content" id="content" type="textarea" class="bg-gray-50 py-2 rounded-lg w-full md:w-1/2  border border-gray-300 text-sm block"></textarea>

    </div>
   
    <button type="submit" class="ml-5 text-white bg-blue-700 hover:bg-blue-500 py-3 px-5 rounded-lg font-medium text-sm">Post</button>
</form>
<style>
     .image-preview {
        filter:var(--filter)
     }
</style>