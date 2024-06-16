<script>
    let files = null;
    let filter = ''; // To store the current filter

    // Function to handle image preview
    const previewImage = () => {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImage = document.getElementById('preview-image');
                previewImage.src = e.target.result;
                previewImage.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle file input change
    const handleFileInputChange = (event) => {
        const fileList = event.target.files;
        files = fileList;
    };

    // Function to apply grayscale filter
    const applyGrayscale = () => {
        filter = 'grayscale(100%)';
        applyFilter();
    };

    // Function to apply sepia filter
    const applySepia = () => {
        filter = 'sepia(100%)';
        applyFilter();
    };

    // Function to apply current filter
    const applyFilter = () => {
        const previewImage = document.getElementById('preview-image');
        previewImage.style.filter = filter;
    };
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" action="" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileInputChange}/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" type="text" name="username" id="username">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" name="content" id="content"></textarea>
    </div>
    <button type="button" id="preview" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" on:click={previewImage}>Image Preview</button>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
    <img src="" id="preview-image" class="hidden w-64 h-64 object-cover mt-3 flex items-center" alt="">
    <div class="mt-3">
        <button type="button" class="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 mr-2" on:click={applyGrayscale}>Grayscale</button>
        <button type="button" class="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2" on:click={applySepia}>Sepia</button>
    </div>
</form>