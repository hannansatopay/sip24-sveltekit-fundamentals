<script>
    let file;

    let previewImage;
    let selectedFilter = '';

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImage = reader.result;
            };
            reader.readAsDataURL(selectedFile);
            file = selectedFile;
        } else {
            previewImage = null;
            file = null;
        }
    }
    function applyFilter(value) {
        selectedFilter = value;
    }
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">OnlyPics</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-15 border-2 border-gray-300">
        <div>
            {#if file && file.name}
                <p class="text-sm text-gray-500 font-semibold text-center">{file.name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={file} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" on:change={handleFileChange} class="hidden" required />
    </label>

    {#if previewImage}
        <div class="mb-3">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <!-- svelte-ignore missing-declaration -->
            <img src={previewImage} alt="Image Preview" class="max-w-full h-auto mt-4" style="filter: {selectedFilter};" />
        </div>
        <div class="mb-3">
            <label for="filter" class="block mb-2 text-sm font-medium text-gray-900">Filter</label>
            <select id="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" bind:value={selectedFilter} on:change={() => applyFilter(selectedFilter)}>
                <option value = "none">None</option>
                <option value = "blur(3px)">Blur</option>
                <option value = "brightness(150%)">Brightness</option>
                <option value = "saturate(200%)">Saturate</option>
            </select>
        </div>
    {/if}

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>

    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg font-medium text-sm px-5 py-2.5">Share</button>
</form>