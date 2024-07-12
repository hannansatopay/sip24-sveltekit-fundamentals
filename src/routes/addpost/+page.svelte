<script>
    let files=null;
</script>

<header class="bg-white shadow-md py-4 sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-[']">CRAFTLAB</h1>
        <a href="/"class="bg-violet-600 hover:bg-violet-500 font-bold text-white px-4 py-2 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed bg-gray-50 rounded-lg">
        <div class="flex flex-col border border-gray-50 items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="/image.png, /image.jpeg" class="hidden" required/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full "/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-violet-600 hover:bg-violet-500 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
</form>