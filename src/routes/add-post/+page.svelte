<script>
    let files = null;
    </script>
    
    <header class="bg-gray-600 py-6 shadow-md sticky top-0 z-10">
      <div class="container mx-auto px-4 flex justify-between items-center">
          <h1 class="text-4xl text-white font-bold font-['Perpetua']">Connectory</h1>
          <a href="/" class="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Back</a>
      </div>
    </header>
    
    <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
      <div class="mb-4">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
          <input name="username" id="username" type="text" class="bg-gray-50 text-gray-900 text-sm w-full border border-gray-300 rounded-lg block shadow-sm p-2.5" required />
      </div>
    
      <div class="mb-4">
          <label for="caption" class="block mb-2 text-sm font-medium text-gray-700">Caption</label>
          <textarea name="caption"  id="caption" type="text" class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
      </div>
    
      <div class="mb-4">
          <label for="image" class="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
          <input bind:files name="image" type="file" id="image" accept="image/png, image/jpg" class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
      </div>
    
      <button type="submit" class="mt-  bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg shadow-md">Add new post</button>
    </form>
    