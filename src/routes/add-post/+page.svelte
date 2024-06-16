<script>
    let files = null;
    let image = null;
    let filter = "none";

    function previewImage(event) {
        files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                image = new Image();
                image.onload = function() {
                    drawImageOnCanvas();
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function drawImageOnCanvas() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const dropzone = document.getElementById('dropzone-container');

        // Calculate aspect ratio
        const dropzoneWidth = dropzone.clientWidth;
        const dropzoneHeight = dropzone.clientHeight;
        const imgWidth = image.width;
        const imgHeight = image.height;
        const imgAspectRatio = imgWidth / imgHeight;
        const dropzoneAspectRatio = dropzoneWidth / dropzoneHeight;

        // Calculate the dimensions of the image to maintain the aspect ratio
        let drawWidth, drawHeight;
        if (imgAspectRatio > dropzoneAspectRatio) {
            drawWidth = dropzoneWidth;
            drawHeight = drawWidth / imgAspectRatio;
        } else {
            drawHeight = dropzoneHeight;
            drawWidth = drawHeight * imgAspectRatio;
        }

        canvas.width = drawWidth;
        canvas.height = drawHeight;

        // Center the image in the dropzone
        const offsetX = (dropzoneWidth - drawWidth) / 2;
        const offsetY = (dropzoneHeight - drawHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
        ctx.filter = filter;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Position the canvas within the dropzone
        canvas.style.position = 'absolute';
        canvas.style.left = `${offsetX}px`;
        canvas.style.top = `${offsetY}px`;
    }

    function applyFilter(event) {
        filter = event.target.value;
        if (image) {
            drawImageOnCanvas();
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>    
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label id="dropzone-container" for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative">
        <div class="flex flex-col items-center justify-center pt-5 pb-6 absolute inset-0 z-10" style="pointer-events: none;">
            {#if !files}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <canvas id="canvas" class="absolute inset-0"></canvas>
        <input bind:files={files} id="dropzone" name="image" type="file" accept="image/png, image/jpeg" class="hidden" on:change={previewImage} />
    </label>
    <div class="filter-options">
        <label for="filters" class="block mb-2 text-sm font-medium text-gray-900">Filters</label>
        <select id="filters" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" on:change={applyFilter}>
            <option value="none">None</option>
            <option value="grayscale(100%)">Grayscale</option>
            <option value="sepia(100%)">Sepia</option>
            <option value="blur(5px)">Blur</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
    .hidden {
        display: none;
    }
    .filter-options {
        margin-top: 10px;
    }
    label {
        position: relative;
    }
    canvas {
        position: absolute;
    }
</style>
