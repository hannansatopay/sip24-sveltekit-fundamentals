<script>
    import { onMount } from 'svelte';
    let files = null;
    let canvas;
    let ctx;
    let img = new Image();
    let originalImageData;
    let filteredImageData = '';
    const defaultCanvasWidth = 600; // Set your default canvas width
    const defaultCanvasHeight = 200; // Set your default canvas height
    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = defaultCanvasWidth;
        canvas.height = defaultCanvasHeight;
    });
    
    function loadImage(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img.onload = function () {
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    const aspectRatio = imgWidth / imgHeight;
                    if (imgWidth > defaultCanvasWidth || imgHeight > defaultCanvasHeight) {
                        if (imgWidth > imgHeight) {
                            imgWidth = defaultCanvasWidth;
                            imgHeight = imgWidth / aspectRatio;
                        } else {
                            imgHeight = defaultCanvasHeight;
                            imgWidth = imgHeight * aspectRatio;
                        }
                    }
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
                    // Store the original image data
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    // Update the hidden input with the base64 data of the original image
                    updateFilteredImageData();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    function applyFilter(filter, event) {
        event.preventDefault(); // Prevent form submission
        if (!originalImageData) return;
        // Reset to the original image data
        ctx.putImageData(originalImageData, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        if (filter === 'grayscale') {
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
        } else if (filter === 'sepia') {
            for (let i = 0; i < data.length; i += 4) {
                let red = data[i];
                let green = data[i + 1];
                let blue = data[i + 2];
                data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        // Update the hidden input with the base64 data of the filtered image
        updateFilteredImageData();
    }
    function updateFilteredImageData() {
        filteredImageData = canvas.toDataURL('image/png');
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} on:change={loadImage} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>
        <!-- Canvas -->
        <canvas  id="canvas" class="border mb-3 w-half border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"></canvas>

        <!-- Filter Buttons -->
        <div class="mt-4">
            <button on:click={(event) => applyFilter('grayscale', event)} class="px-4 py-2 bg-gray-300 rounded-md">Grayscale</button>
            <button on:click={(event) => applyFilter('sepia', event)} class="px-4 py-2 text-white bg-sepia-300 rounded-md ml-2">Sepia</button>
        </div>
    <!-- Hidden Input for Base64 Image Data -->
    <input type="hidden" name="filteredImage" value={filteredImageData} />

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

<style>
    .border {
        border: 1px solid #ddd;
        max-width: 100%;
        margin-top: 10px;
    }
    button {
        cursor: pointer;
    }
    .bg-sepia-300{
        background-color : #704214;
    }
</style>