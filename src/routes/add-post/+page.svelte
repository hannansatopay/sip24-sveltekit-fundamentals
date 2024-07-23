<script>
    let files = null;
    let filter = "none";

    function handleFileChange(event) {
        files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById("previewCanvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.filter = filter;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }

    function applyFilter(selectedFilter) {
        filter = selectedFilter;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById("previewCanvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.filter = filter;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Conic_Sans_MS']">CraftLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke=""/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click To Upload</p>
            {/if}
        </div>
        <input bind:files on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png,image/jpeg" class="hidden" required/>
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<div class="container mx-auto mt-5">
    <h2 class="text-lg font-medium mb-2">Image Preview</h2>
    <canvas id="previewCanvas" class="border border-gray-300"></canvas>

    <div class="mt-3">
        <button type="button" on:click={() => applyFilter('none')} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">No Filter</button>
        <button type="button" on:click={() => applyFilter('grayscale(100%)')} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">Grayscale</button>
        <button type="button" on:click={() => applyFilter('sepia(100%)')} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Sepia</button>
    </div>
</div>