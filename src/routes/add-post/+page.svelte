<script>
    let files = null;
    let imageSrc = '';
    let filter = '';

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data" action="/add-post">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 overflow-hidden">
        <div class="flex flex-col items-center justify-center pt-5 pb-6 h-full w-full">
            {#if imageSrc}
                <img src={imageSrc} alt="Uploaded Image" class="h-full w-full object-contain" style="filter: {filter};" />
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileUpload} required />
    </label>

    <div class="mb-3">
        <label for="Username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="Username" id="Username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm" />
    </div>

    <div class="mb-3">
        <label for="Content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="Content" id="Content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm"></textarea>
    </div>

    <div class="mb-3">
        <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Filter</label>
        <select id="filter" name="filter" bind:value={filter} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm">
            <option value="">None</option>
            <option value="grayscale(100%)">Grayscale</option>
            <option value="sepia(100%)">Sepia</option>
        </select>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
    .object-cover {
        object-fit: cover;
    }
    .object-contain {
        object-fit: contain;
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .h-full {
        height: 100%;
    }
    .w-full {
        width: 100%;
    }
</style>

