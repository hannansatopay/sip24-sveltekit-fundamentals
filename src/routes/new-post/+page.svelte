<script>
    let files = null;
    let currentFilter = null;
    let filteredImageData = null;

    function previewImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('previewCanvas');
                const ctx = canvas.getContext('2d');
                const { width, height } = constrainImage(img.width, img.height);
                canvas.width = width;
                canvas.height = height;
                ctx.clearRect(0, 0, width, height);
                ctx.filter = 'none'; // Reset any previous filter
                ctx.drawImage(img, 0, 0, width, height);

                applyFilter(currentFilter);
            };
            img.src = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
            files = [file];
        }
    }

    function applyFilter(filter) {
        currentFilter = filter;
        const canvas = document.getElementById('previewCanvas');
        const ctx = canvas.getContext('2d');

        if (filteredImageData && filter === currentFilter) {
            const img = new Image();
            img.src = filteredImageData;
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = filter === 'none' || !filter ? 'none' : `${filter}(100%)`;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        } else {
            const img = new Image();
            img.src = canvas.toDataURL();

            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = filter === 'none' || !filter ? 'none' : `${filter}(100%)`;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                filteredImageData = canvas.toDataURL();
            };
        }
    }

    function constrainImage(imgWidth, imgHeight) {
        const maxWidth = 400;
        const maxHeight = 300;
        let width = imgWidth;
        let height = imgHeight;

        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        return { width, height };
    }

    function clearFilters() {
        document.querySelectorAll('input[name="filter"]').forEach((input) => input.checked = false);
        currentFilter = null;
        applyFilter('none');
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <div id="imagePreview" class="w-full h-48 mb-3 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {#if files && files.length > 0}
                    <canvas id="previewCanvas" class="w-full h-full object-cover"></canvas>
                {:else}
                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
                {/if}
            </div>
            <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={previewImage} required/>
        </div>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <div class="mb-3">
        <label class="block mb-2 text-sm font-medium text-gray-900">Filter:</label>
        <div class="flex items-center">
            <input type="radio" id="filterSepia" name="filter" value="sepia" class="mr-2" on:change={() => applyFilter('sepia')}>
            <label for="filterSepia" class="text-sm text-gray-900">Sepia</label>
        </div>
        <div class="flex items-center mt-2">
            <input type="radio" id="filterGrayscale" name="filter" value="grayscale" class="mr-2" on:change={() => applyFilter('grayscale')}>
            <label for="filterGrayscale" class="text-sm text-gray-900">Grayscale</label>
        </div>
    </div>
    <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" on:click={clearFilters}>Clear Filters</button>

    <button type="submit" class="custom-button">
        <div class="svg-wrapper-1">
            <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
            </div>
        </div>
        <span>Share</span>
    </button>
</form>

<style>
    #imagePreview {
        transition: all 0.3s ease-in-out;
    }
    button.custom-button {
        font-family: inherit;
        font-size: 15px;
        background: royalblue;
        color: white;
        padding: 0.7em 1em;
        padding-left: 0.9em;
        display: flex;
        align-items: center;
        border: none;
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.2s;
        cursor: pointer;
        margin-top: 1rem;
    }

    button.custom-button span {
        display: block;
        margin-left: 0.3em;
        transition: all 0.3s ease-in-out;
    }

    button.custom-button svg {
        display: block;
        transform-origin: center center;
        transition: transform 0.3s ease-in-out;
    }

    button.custom-button:hover .svg-wrapper {
        animation: fly-1 0.6s ease-in-out infinite alternate;
    }

    button.custom-button:hover svg {
        transform: translateX(1.2em) rotate(45deg) scale(1.1);
    }

    button.custom-button:hover span {
        transform: translateX(5em);
    }

    button.custom-button:active {
        transform: scale(0.95);
    }

    @keyframes fly-1 {
        from {
            transform: translateY(0.1em);
        }
        to {
            transform: translateY(-0.1em);
        }
    }
</style>
