<script>
    let files = null;
    let canvas;
    let ctx;
    let originalImage = null;
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    function applyFilter(filter) {
        if (!originalImage) return;
        const imageData = ctx.createImageData(originalImage);
        const data = imageData.data;
        const originalData = originalImage.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = originalData[i];
            const g = originalData[i + 1];
            const b = originalData[i + 2];
            if (filter === 'grayscale') {
                const gray = 0.3 * r + 0.59 * g + 0.11 * b;
                data[i] = data[i + 1] = data[i + 2] = gray;
            } else if (filter === 'sepia') {
                data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            }
            data[i + 3] = originalData[i + 3]; // copy alpha
        }
        ctx.putImageData(imageData, 0, 0);
        originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // update originalImage
    }
    function resetImage() {
        if (originalImage) {
            ctx.putImageData(originalImage, 0, 0);
        }
    }
    $: {
        if (canvas) {
            ctx = canvas.getContext('2d');
        }
    }
</script>

<style>
    canvas {
        border: 1px solid black;
        max-height: 256px; /* limit the canvas height to fit within the label */
        max-width: 100%;
        display: block;
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
                <canvas bind:this="{canvas}" class="max-h-64 max-w-full"></canvas>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change="{handleFileUpload}" required/>
    </label>
    <div class="flex justify-between mb-3">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" on:click="{() => applyFilter('grayscale')}">Grayscale</button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" on:click="{() => applyFilter('sepia')}">Sepia</button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" on:click="{resetImage}">Reset</button>
    </div>
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
