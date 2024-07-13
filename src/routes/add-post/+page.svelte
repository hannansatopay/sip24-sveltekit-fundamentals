<script>
    let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home
        </a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="mb-4">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
                {/if}
            </div>
        </label>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
    </div>
    <div class="mb-4">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input id="username" name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>

    <div class="mb-4">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Content</label>
        <textarea id="content" name="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Share</button>
</form>