<script>
    let files = null;
    let imagePreviewSrc = '';
    let originalImageSrc = '';

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreviewSrc = e.target.result;
                originalImageSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreviewSrc = '';
            originalImageSrc = '';
        }
    };

    const applyGrayscale = () => {
        const previewImage = document.getElementById('imagePreview');
        if (previewImage && imagePreviewSrc) {
            previewImage.style.filter = 'grayscale(100%)';
        }
    };

    const applySepia = () => {
        const previewImage = document.getElementById('imagePreview');
        if (previewImage && imagePreviewSrc) {
            previewImage.style.filter = 'sepia(100%)';
        }
    };

    const resetFilters = () => {
        const previewImage = document.getElementById('imagePreview');
        if (previewImage && imagePreviewSrc) {
            previewImage.style.filter = 'none';
            imagePreviewSrc = originalImageSrc;
        }
    };
</script>

<style>
    .image-preview {
        max-width: 100%;
        height: auto;
        max-height: 400px;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-top: 10px;
    }
</style>

<header class="bg-gradient-to-r from-purple-500 to-orange-500 py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-comic text-white">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data"> 
        
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-600 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"></svg>
                <p class="text-sm text-gray-600 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300">
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300"></textarea>
    </div>

    <div class="mb-3" if={imagePreviewSrc}>
        <label class="block mb-2 text-sm font-medium text-gray-900">Image Preview</label>
        <div class="flex space-x-3 mb-2">
            <button type="button" class="text-gray-800 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-300" on:click={applyGrayscale}>Grayscale</button>
            <button type="button" class="text-gray-800 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-300" on:click={applySepia}>Sepia</button>
            <button type="button" class="text-gray-800 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-300" on:click={resetFilters}>Reset</button>
        </div>
        <img src={imagePreviewSrc} alt="Preview" id="imagePreview" class="image-preview">
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300">Share</button>
</form>