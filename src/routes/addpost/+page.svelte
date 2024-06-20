<script>
  let files = null;
  let imageUrl = '';
  let filter = '';

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      files = event.target.files;
    }
  }

  function applyFilter(type) {
    switch (type) {
      case 'grayscale':
        filter = 'grayscale(100%)';
        break;
      case 'sepia':
        filter = 'sepia(100%)';
        break;
      default:
        filter = '';
        break;
    }
  }
</script>

<header class="bg-gray-200 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 py-3 flex justify-between items-center">
    <h1 class="text-3xl font-comic-sans">INSTACLONE</h1>
    <a href="/" class="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200">Home</a>
  </div>
</header>

<main class="container mx-auto mt-8">
  <form class="p-6 bg-white shadow-md rounded-lg" method="POST" enctype="multipart/form-data">

    <label for="dropzone" class="mb-4 relative">
      <div class="flex items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer overflow-hidden" style="filter: {filter};">
        {#if imageUrl}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img src="{imageUrl}" alt="Uploaded Image" class="object-cover w-full h-full" style="object-fit: contain; filter: {filter};" />
        {:else}
          <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <p class="text-sm text-gray-500 mt-2">Click to Upload</p>
        {/if}
      </div>
      <input bind:files name="image" id="dropzone" type="file" accept="image/png,image/jpeg" class="hidden" required on:change={handleFileChange} />
    </label>

    <div class="flex justify-between mb-4">
      <button type="button" on:click={() => applyFilter('grayscale')} class="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-1 rounded-lg transition duration-200 border border-gray-300">Grayscale</button>
      <button type="button" on:click={() => applyFilter('sepia')} class="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-1 rounded-lg transition duration-200 border border-gray-300">Sepia</button>
      <button type="button" on:click={() => applyFilter('')} class="text-gray-600 hover:text-gray-800 font-medium text-sm px-3 py-1 rounded-lg transition duration-200 border border-gray-300">Reset</button>
    </div>

    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-900 mb-2">Username</label>
      <input name="username" id="username" type="text" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label for="content" class="block text-sm font-medium text-gray-900 mb-2">Content</label>
      <textarea name="content" id="content" type="text" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    </div>

    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-sm px-5 py-2.5 transition duration-200">Share</button>

  </form>
</main>

<style>
  .font-comic-sans {
    font-family: 'Comic Sans MS', cursive;
  }

  input[type="file"] {
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  button {
    outline: none;
  }


  button:active {
    transform: translateY(1px);
  }
</style>
