<script>
    let files = null;

    $: console.log(files);
</script>


<header class="big-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <!---<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</button>-->
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>

</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <!-- <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w"></label>
    <div class="container mx-auto p-5">
        <div>
        <input type="file" />
        </div>  -->

        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500">
            <div class="flex flex-col items-center justify-center pt-7">
                {#if files && files.length}
                <p class="text-sm text-gray-500 group-hover:text-blue-500 pt-1 tracking-wider">{files[0].name}</p>
                {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-500 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12M17 16V12M12 20L12 4" />
                    <p class="text-sm text-gray-500 group-hover:text-blue-500 pt-1 tracking-wider">Click to Upload</p>
                </svg>
                {/if}

              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-500 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12M17 16V12M12 20L12 4" />
              </svg>
              <p class="text-sm text-gray-500 group-hover:text-blue-500 pt-1 tracking-wider">Click to Upload</p> -->
            </div>
            <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
        </label>
          
    
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input name="username" id="username" type="text" class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2">
        </div>

        <div class="mb-3">
            <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea name="content" id="content" class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2"></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
