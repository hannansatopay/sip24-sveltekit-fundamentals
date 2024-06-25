<script>
    import { onMount } from 'svelte';

    let files = null;
    let imageCanvas;
    let imageContext;
    let originalImage;

    onMount(() => {
        if (imageCanvas) {
            imageContext = imageCanvas.getContext('2d');
        }
    });

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                imageContext.drawImage(img, 0, 0);
                originalImage = img;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function applyFilter(filter) {
        if (!originalImage) return;
        imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        imageContext.filter = filter;
        imageContext.drawImage(originalImage, 0, 0);
    }

    function saveFilteredImage(event) {
        event.preventDefault();
        const dataURL = imageCanvas.toDataURL();
        document.getElementById('filteredImage').value = dataURL;
        document.getElementById('uploadForm').submit();
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Home</a>
    </div>
</header>

<form class="container mc-auto p-5" method="POST" enctype="multipart/form-data" id="uploadForm">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files={files} on:change={handleImageUpload} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>
    <canvas bind:this={imageCanvas} class="mb-3"></canvas>
    <div class="flex mb-3">
        <button type="button" on:click={() => applyFilter('grayscale(100%)')} class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">Grayscale</button>
        <button type="button" on:click={() => applyFilter('sepia(100%)')} class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5">Sepia</button>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input type="text" id="username" name="username" class="bg-gray-50 border border-gray-300 text-black-300 text-sm rounded-lg block w-full p-2.5"/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea id="content" name="content" class="bg-gray-50 border border-gray-300 text-black-300 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <input type="hidden" name="filteredImage" id="filteredImage" />
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5" on:click={saveFilteredImage}>Share</button>
</form>