<script>
    let files = null;
    $: console.log(files);
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="Container mx-auto px-4 flex justify-between items-center">
        <h1 class="px-6 text-2xl font-bold font-['Comic_Sans_MS']">CraftLab </h1>
        <a href="/" class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-900">Home</a>
    </div>
</header>

<form class="container mx-auto p-6" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-300 dark:hover:bg-gray-200">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-600 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-600 font-semibold">click to upload</p>
            {/if}   
        </div>   
        <input bind:files name="images" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-bold text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-bold text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"></textarea>
    </div>
    <button type="share" class="text-white bg-green-500 hover:bg-green-900 font-bold rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
