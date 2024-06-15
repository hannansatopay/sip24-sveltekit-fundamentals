<script>
    let files = null;
    let imageSrc = null;

    // Load the selected image file
    const loadImage = () => {
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        }
    };

    // Apply filter to the image
    const applyFilter = (filter) => {
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            switch (filter) {
                case 'grayscale':
                    ctx.filter = 'grayscale(100%)';
                    break;
                case 'sepia':
                    ctx.filter = 'sepia(100%)';
                    break;
                default:
                    ctx.filter = 'none';
            }

            ctx.drawImage(image, 0, 0);

            // Convert canvas to Blob and update the file input
            canvas.toBlob((blob) => {
                const newFile = new File([blob], files[0].name, { type: files[0].type });
                files = [newFile];
            });
        };
    };

    // Watch for file changes and load the image
    $: if (files && files.length) {
        loadImage();
    }
</script>

<style>
    .filter-buttons {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                <img src={imageSrc} alt="Preview" class="w-full h-full object-cover mt-4"/>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
    </label>
    
    {#if files && files.length}
        <div class="mt-3">
            <canvas id="imageCanvas" class="w-full h-auto"></canvas>
        </div>
        <div class="filter-buttons">
            <button type="button" on:click={() => applyFilter('none')} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">No Filter</button>
            <button type="button" on:click={() => applyFilter('grayscale')} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">Grayscale</button>
            <button type="button" on:click={() => applyFilter('sepia')} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">Sepia</button>
        </div>
    {/if}

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
