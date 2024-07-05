<script>
    let files=null;

</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['comic_Sans_MS']">CraftLab</h1>
    <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" vibeBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.667 6.667A4.167 4.167 0 1 0 8.333 4.167M16.667 10H3.333a2.5 2.5 0 0 0-2.5 2.5v2.5h18.334v-2.5a2.5 2.5 0 0 0-2.5-2.5z"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
                {/if}
                
            </div>
            <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
        </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounder-lg block w-full p-2.5">
    </div>

    <div class="mb-3">
        <label for="Content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="Content" id="Content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounder-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>