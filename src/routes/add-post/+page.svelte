<script>
  let files = [];
  $: console.log(files);
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-0"> 
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
    <a href="/" class="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Home</a>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <div class="box mx-auto p-5">
    <div class="main-frame bg-gray-200 p-4 rounded-lg shadow-lg">
      <label for="dropzone" class="bg-grey-500 mb-3 flex flex-col font-bold py-2 px-4 rounded items-center justify-center">
        {#if files && files.length > 0}
          <p class="bg-grey-50 border border-grey-300 text-grey-900 text-sm text-gray-500 font-semibold rounded-lg block w-full p-2.5">{files[0].name}</p>
        {:else}
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <div class="bg-white rounded-lg shadow-lg flex items-center justify-center w-24 h-24 mb-4">
              <svg class="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7M3 7l9-4 9 4M8 21v-4a4 4 0 014-4h0a4 4 0 014 4v4" />
              </svg>
            </div>
            <p class="bg-grey-50 border border-grey-300 text-grey-900 text-sm text-gray-500 font-semibold rounded-lg block w-full p-2.5">Click to upload</p>
          </div>
        {/if}
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" multiple>
      </label>
    </div>
  </div>
  <div class="mb-4">
    <label for="username" class="block text-sm font-semibold text-gray-700">Username</label>
    <input id="username" name="username" type="text" class="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 text-sm text-gray-700">
  </div>
  <div class="mb-4">
    <label for="content" class="block text-sm font-semibold text-gray-700">Content</label>
    <textarea id="content" name="content" class="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 text-sm text-gray-700"></textarea>
  </div>
  <button type="submit" class="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Post</button>
</form>
