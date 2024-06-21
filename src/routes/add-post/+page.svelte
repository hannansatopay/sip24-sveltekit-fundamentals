<script>
   let  files =null;
  
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V8a4 4 0 0110.38-2.412M7 16h10M7 16v-2a4 4 0 00-4-4m14 6v-2a4 4 0 00-4-4m-4 4v4m0 0H4m16 0h-6"></path></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/*" class="hidden" required />
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required>
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required></textarea>
    </div>
<!-- 
    <div>
        <canvas id="canvas" width="800" height="600"></canvas>
        <div class="filter-buttons mt-3">
            <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" on:click={() => { filter = 'grayscale'; applyFilter(); }}>Grayscale</button>
            <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" on:click={() => { filter = 'sepia'; applyFilter(); }}>Sepia</button>
            <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" on:click={() => { filter = ''; applyFilter(); }}>None</button>
        </div>
    </div> -->

    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Submit</button>
</form>
