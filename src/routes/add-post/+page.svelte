<script>
    let files = [];
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-100">
    <div class="container p-4 flex justify-between items-center">
        <h1 class="text-2xl font-['Arial'] font-bold">
            craftLab
        </h1>
        <a href="/" class="bg-blue-500 rounded px-3 py-2">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <div class="py-3">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                    <p class="text-sm text-gray font-semibold">{files[0].name}</p>    
                {:else}
                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p class="text-sm text-gray font-semibold">Click to upload</p>
                {/if}
            </div>
            <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
        </label>

        <div class="mb-3">
            <label for="username" class="font-semibold text-gray-800 py-5">username</label>
            <input name="username" id="username" type="text" class="border bg-gray-200 rounded-sm w-full h-8">
        </div>
        
        <div class="mb-3">
            <label for="content" class="font-semibold text-gray-800 py-5">description</label>
            <textarea name="content" id="content" type="text" class="border bg-gray-200 rounded-sm w-full h-20"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 rounded px-3 py-2">Share</button>
    </div>
</form>