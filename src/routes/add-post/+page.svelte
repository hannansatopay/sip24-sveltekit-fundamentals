<script>
    let files = null;
    let previewSrc = '';

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                previewSrc = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['comic_sans_MS']">Yash Gunjal</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5 bg-white shadow-md rounded" method="Post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if previewSrc}
                <img src={previewSrc} alt="Preview" class="w-full filter grayscale mb-4" />
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M7 8l3-3m0 0l3 3m-3-3v12"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden"/>
    </label>
    <div class="mt-4 mb-3">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" name="username" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"/>
    </div>

    <div class="mt-4 mb-3">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <input type="text" id="content" name="content" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"/>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
</form>

<style>
    .filter.grayscale {
        filter: grayscale(100%);
    }
</style>
