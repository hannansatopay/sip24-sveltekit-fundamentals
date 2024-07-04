<script>
    import { onMount } from 'svelte';

    let files = null;
    let canvas;
    let ctx;
    let img = new Image();

    // Function to load the selected image onto the canvas
    function loadImage() {
        if (files && files.length) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    
    function drawImage() {
        if (canvas && img) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
    }

    
    function applyGrayscale() {
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }

            ctx.putImageData(imageData, 0, 0);
        }
    }

    
    function applySepia() {
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            }

            ctx.putImageData(imageData, 0, 0);
        }
    }

    $: if (img.src) {
        img.onload = drawImage;
    }

    onMount(() => {
        ctx = canvas.getContext('2d');
    });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change="{loadImage}" required />
    </label>
    
    <canvas bind:this="{canvas}" class="mt-5 border border-gray-300 rounded-lg"></canvas>

    <div class="mt-5 flex space-x-2">
        <button type="button" on:click="{applyGrayscale}" class="text-white bg-gray-500 hover:bg-gray-700 py-2.5 px-5 rounded-lg text-sm font-medium">Grayscale</button>
        <button type="button" on:click="{applySepia}" class="text-white bg-yellow-500 hover:bg-yellow-700 py-2.5 px-5 rounded-lg text-sm font-medium">Sepia</button>
    </div>

    <div class="mb-3 mt-5">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-500">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-500">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-700 py-2.5 px-5 rounded-lg text-sm font-medium">Share</button>
</form>

<style>
    canvas {
        max-width: 100%;
    }
</style>