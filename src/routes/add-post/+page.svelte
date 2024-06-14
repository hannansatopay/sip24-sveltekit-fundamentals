<script>
    let files = null;
    let previewUrl = '';
    let fileName = '';

    function handleFileChange(event) {
        files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewUrl = e.target.result;
                fileName = files[0].name;
            };
            reader.readAsDataURL(files[0]);
        } else {
            previewUrl = '';
            fileName = '';
        }
    }
</script>

<style>
    .image-preview {
        width: 100%;
        max-width: 200px;
        max-height: 200px;
        object-fit: contain;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if previewUrl}
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={previewUrl} alt="Image Preview" class="image-preview" />
                <p class="text-sm text-gray-500 font-semibold">{fileName}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg, image/jpg" class="hidden">
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p"/>
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p"></textarea>
    </div>

    <div class="mb-3">
        <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Filter</label>
        <select id="filter" on:change={(e) => filter = e.target.value} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p">
            <option value="none">None</option>
            <option value="grayscale(100%)">Grayscale</option>
            <option value="sepia(100%)">Sepia</option>
            <option value="blur(5px)">Blur</option>
            <option value="contrast(200%)">Contrast</option>
            <option value="brightness(150%)">Brightness</option>
        </select>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded text-sm px-5 py-2.5">Share</button>
</form>