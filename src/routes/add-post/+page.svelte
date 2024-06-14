<script>
    let files = null;
  </script>
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if files && files.length}
          <p class="text-sm text-gray-500">{files[0].name}</p>
        {:else}
          <svg class="w-12 h-12 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16v4a1 1 0 001 1h3m10-1h3a1 1 0 001-1v-4m-2-4h-4m-4-6h4m1-3v3a1 1 0 001 1h3m-1 10h-4m-4 6H7a1 1 0 01-1-1v-4M4 4h16v12H4V4z" />
          </svg>
          <p class="text-sm text-gray-500">Drag and drop or click to upload</p>
        {/if}
      </div>
      <input bind:files id="dropzone" type="file" class="hidden">
    </label>
  
    <div class="mb-3">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
      <input id="username" name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-3" placeholder="Enter your username"/>
    </div>
  
    <div class="mb-3">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Content</label>
      <textarea id="content" name="content" class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" rows="4" placeholder="Share your thoughts"></textarea>
    </div>
  
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Share</button>
  </form>
  