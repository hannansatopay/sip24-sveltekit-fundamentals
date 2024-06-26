<script>
    let files = null;
    let imagePreviewSrc = null;
    let canvas = null;
    let ctx = null;
    let img = null;
    let filter = 'original'; // default filter
    function handleFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = new Image();
            imgElement.onload = function() {
                // Display the image in the preview
                imagePreviewSrc = e.target.result;
                // Draw the image on the canvas
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                img = imgElement;
            };
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    function applyFilter(type) {
        filter = type;
        drawImageWithFilter();
    }
    function drawImageWithFilter() {
        if (!img) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        switch (filter) {
            case 'original':
                ctx.putImageData(imageData, 0, 0);
                break;
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;     // red
                    data[i + 1] = avg; // green
                    data[i + 2] = avg; // blue
                }
                ctx.putImageData(imageData, 0, 0);
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];
                    data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b); // red
                    data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b); // green
                    data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b); // blue
                }
                ctx.putImageData(imageData, 0, 0);
                break;
            default:
                break;
        }
    }
    // Initialize canvas and context after component mounts
    import { onMount } from 'svelte';
    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
    });
</script>

<style>
    /* Add your custom styles here */
    .preview-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20px;
    }
    #canvas {
        border: 1px solid #ccc;
        border-radius: 8px;
        max-width: 100%;
        margin-top: 20px;
    }
    .filter-buttons {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .filter-buttons button {
        margin: 0 5px;
        padding: 8px 16px;
        cursor: pointer;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
    }
    .filter-buttons button:hover {
        background-color: #45a049;
    }
</style>

<header class="bg-white py-5 shadow-md">
    <div class="container mx-auto px-5 flex justify-between items-center">
        <h1 class="text-2xl font-bold">CraftLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-2">Home</a>
    </div>
</header>

<div class="container mx-auto p-5">
    <form method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="rb-3 flex flex-col items-center justify-center w-full h-68 border-2 border-gray-300">
            <div class="preview-container">
                {#if imagePreviewSrc}
                    <img src={imagePreviewSrc} alt="Uploaded Image" class="mb-4" style="max-width: 100%; border-radius: 8px;">
                {:else}
                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"></svg>
                    <p class="text-sm text-gray-500 font-semibold">Click to upload an image</p>
                {/if}
            </div>
            <input on:change={handleFileInputChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
        </label>
        <div class="mb-3">
            <label for="username" class="block mb-2 text-sm font-redius text-gray-900">Username</label>
            <input name="username" type="text" id="username" class="bg-gray-50 border borfer-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        </div>
        <div class="mb-3">
            <label for="content" class="block mb-2 text-sm font-redius text-gray-900">Content</label>
            <textarea name="content" id="content" class="bg-gray-50 border borfer-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <div class="filter-buttons">
            <button type="button" on:click={() => applyFilter('original')}>Original</button>
            <button type="button" on:click={() => applyFilter('grayscale')}>Grayscale</button>
            <button type="button" on:click={() => applyFilter('sepia')}>Sepia</button>
        </div>
        <button type="submit" class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
    </form>
    <canvas id="canvas"></canvas>
</div>