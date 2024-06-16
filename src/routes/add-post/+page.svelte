<script>
  let files = null;
</script>

<style>
  .font-comic-sans {
    font-family: 'Comic Sans MS', cursive;
  }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10 flex justify-between items-center px-4">
  <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
  <a href="/" class="ml-auto">
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Home
    </button>
  </a>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg p-5">
    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <!-- <path fill-rule="evenodd" d="M10 1a1 1 0 0 1 1 1v4.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 6.586V2a1 1 0 0 1 1-1z" clip-rule="evenodd" /> -->
      <!-- <path fill-rule="evenodd" d="M18 8a1 1 0 0 0-1-1h-4V2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H3a1 1 0 0 0-1 1v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-6-3v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5h7zm7 12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9h15v8z" clip-rule="evenodd" /> -->
    </svg>
    {#if files && files.length}
      <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
    {:else}
      <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
    {/if}
    <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden">
  </label>

  <div class="mb-4">
    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
    <input type="text" id="username" name="username" class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
  </div>

  <div class="mb-4">
    <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
    <textarea id="content" name="content" class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
  </div>
  <div>
    <button type='submit' class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
  </div>
</form>
