<script>
    let files = null;
    let imageUrl = '';
    let filter = '';

    function handleFileChange(event) {
        files = event.target.files;
        if (files && files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function applyFilter(selectedFilter) {
        filter = selectedFilter;
    }
</script>

<style>
    .hidden { display: none; }
    .image-preview {
        max-width: 100%;
        max-height: 100%;
        object-fit: fill;
        transition: filter 0.3s ease;
    }
    .filter-none { filter: none; }
    .filter-grayscale { filter: grayscale(100%); }
    .filter-sepia { filter: sepia(100%); }
    .filter-blur { filter: blur(5px); }
    .filter-brightness { filter: brightness(150%); }
    .filter-contrast { filter: contrast(200%); }
    .filter-invert { filter: invert(100%); }
    .filter-hue-rotate { filter: hue-rotate(90deg); }
    .filter-saturate { filter: saturate(200%); }
    .filter-drop-shadow { filter: drop-shadow(5px 5px 10px black); }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Instagram</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-8 w-full h-full">
            {#if imageUrl}
                <img src={imageUrl} alt="Uploaded Image" class="image-preview {filter}">
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required />
    </label>

    <div class="mb-3">
        <label for="filterSelect" class="text-sm font-medium text-gray-900">Select Filter:</label>
        <select id="filterSelect" class="mt-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-36 p-2.5" on:change={() => applyFilter(event.target.value)}>
            <option value="filter-none">None</option>
            <option value="filter-grayscale">Grayscale</option>
            <option value="filter-sepia">Sepia</option>
            <option value="filter-blur">Blur</option>
            <option value="filter-brightness">Brightness</option>
            <option value="filter-contrast">Contrast</option>
            <option value="filter-invert">Invert</option>
            <option value="filter-hue-rotate">Hue Rotate</option>
            <option value="filter-saturate">Saturate</option>
            <option value="filter-drop-shadow">Drop Shadow</option>
        </select>
    </div>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Caption</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div><button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>


