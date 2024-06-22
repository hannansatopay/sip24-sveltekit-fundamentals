<script>
    let files = null;
    let imageUrl = null;
    let canvas;
    let filteredImageData = null;
    
    function handleFileChange(event) {
        files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
                drawImageOnCanvas(imageUrl);
            };
            reader.readAsDataURL(files[0]);
        }
    }
    function drawImageOnCanvas(imageUrl, filter = "none") {
        const img = new Image();
        img.onload = () => {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.filter = filter;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            filteredImageData = canvas.toDataURL("image/jpeg");
        };
        img.src = imageUrl;
    }
    function applyFilter(filter) {
        if (imageUrl) {
            drawImageOnCanvas(imageUrl, filter);
        }
    }
    function greyscale() {
        applyFilter("grayscale(1)");
    }
    function sepia() {
        applyFilter("sepia(1)");
    }
    function resetFilter() {
        applyFilter("none");
    }
</script>

<header class="bg-gradient-to-r from-indigo-500 to-purple-500 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-white hover:bg-gray-200 text-indigo-600 font-bold py-2 px-4 rounded shadow-lg transition duration-300">Home</a>
    </div>
</header>

<form class="container mx-auto p-5 bg-white shadow-lg rounded-lg" method="post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 transition duration-300 hover:bg-gray-100">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <canvas bind:this={canvas} class="object-cover" height="256" width="984"></canvas>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input on:change={handleFileChange} bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

    <input type="hidden" name="filteredImageData" id="filteredImageData" bind:value={filteredImageData} />

    <div class="flex space-x-2 mb-3">
        <button type="button" class="text-white bg-indigo-500 hover:bg-indigo-600 font-bold py-2 px-4 rounded-lg shadow transition duration-300" on:click={greyscale}>Greyscale</button>
        <button type="button" class="text-white bg-indigo-500 hover:bg-indigo-600 font-bold py-2 px-4 rounded-lg shadow transition duration-300" on:click={sepia}>Sepia</button>
        <button type="button" class="text-white bg-indigo-500 hover:bg-indigo-600 font-bold py-2 px-4 rounded-lg shadow transition duration-300" on:click={resetFilter}>Reset</button>
    </div>

    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-lg shadow transition duration-300">Share</button>
</form>

<style>
    header {
        font-family: 'Comic Sans MS', sans-serif;
    }
    .container {
        max-width: 800px;
    }
    .text-indigo-600 {
        color: #4c51bf;
    }
    .hover\:bg-gray-200:hover {
        background-color: #edf2f7;
    }
    .rounded-lg {
        border-radius: 0.75rem;
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .p-6 {
        padding: 1.5rem;
    }
    .mb-3 {
        margin-bottom: 0.75rem;
    }
    .h-48 {
        height: 12rem;
    }
    .object-cover {
        object-fit: cover;
    }
    .gap-8 {
        gap: 2rem;
    }
    @media (max-width: 768px) {
        .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media (max-width: 1024px) {
        .lg\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>