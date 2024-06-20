<script>
  let files = null;

  // $: console.log(files);
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <label for="dropzone" class="mb-3 flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length}
        <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
      {:else}
        <svg class="w-8 h-8 mt-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5V3m5 4H5m1.293 5.707L10 8.414l3.707 3.293L15 10l-5-5-5 5z"/>
        </svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
    </div>
    <input bind:files={files} id="dropzone" type="file" accept="image/*" class="hidden"/>
  </label>

  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
    <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username" required>
  </div>

  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
    <textarea id="content" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Content" required></textarea>
  </div>

  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share</button>
</form>

<style>
  /* Add any necessary styles here */
</style>

  