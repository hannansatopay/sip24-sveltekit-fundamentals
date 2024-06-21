<script>
    let files=null;
</script>


<header class="py-4 bg-white shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between ">
        <h1 class="font-bold text-2xl  font-['Comic_Sans_MS']">
           Craftlab
        </h1>
        <a href="/" class=" bg-blue-500 text-white font-bold px-4 py-2 rounded">Home</a>
    </div>
</header>

<form method="POST" enctype="multipart/form-data" class="container mx-auto p-4">
    <label for="dropzone" class=" flex flex-col justify-center w-full">
        <div class=" flex flex-col justify-center items-center pt-5 pb-6">
        {#if files && files.length}
            <p class="text-gray-500 text-smm font-semibold">
                {files[0].name}
            </p>
        {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">
                Click to upload
            </p>
        {/if}
        </div>
        <input bind:files type="file" name="image" id="dropzone" accept="image/png, image/jpeg" class="hidden" required>
    </label>
    <div class="mb-3">
        <label for="username" class="block text-small font-medium text-gray-900 mb-2">Username</label>
        <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  ">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>