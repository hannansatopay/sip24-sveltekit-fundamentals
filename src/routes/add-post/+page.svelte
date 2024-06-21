<script>
    let files = null;
    let imageUrl = '';
    let filter = '';

    function handleFileChange(event) {
        files = event.target.files;
        if (files && files.length) {
            const file = files[0];
            imageUrl = URL.createObjectURL(file);
        } else {
            imageUrl = '';
        }
    }

    function applyFilter(selectedFilter) {
        filter = selectedFilter;
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Charter_BT']">Instagram</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if imageUrl}
                <img src={imageUrl} alt="Image Preview" class="max-h-48 mb-4" style="filter: {filter}"/>
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" type="file" id="dropzone" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileChange}>
    </label>
    <div class="flex space-x-2 mb-3">
        <button type="button" class="text-sm rounded-lg px-5 py-2 bg-gray-200 hover:bg-gray-300" on:click={() => applyFilter('grayscale(100%)')}>Grayscale</button>
        <button type="button" class="text-sm rounded-lg px-5 py-2 bg-gray-200 hover:bg-gray-300" on:click={() => applyFilter('sepia(100%)')}>Sepia</button>
        <button type="button" class="text-sm rounded-lg px-5 py-2 bg-gray-200 hover:bg-gray-300" on:click={() => applyFilter('')}>Original</button>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-800 text-sm rounded-lg px-5 py-2">Share</button>
</form>



