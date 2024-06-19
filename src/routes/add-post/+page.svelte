<script>
    import { onMount } from 'svelte';
    let files = null;
    let canvas;
    let ctx;
    let image = new Image();
    let filters = '';

    function handleFileUpload(event) {
        const reader = new FileReader();
        reader.onload = function(event) {
            image.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    function applyFilter(filter) {
        filters = filter;
        drawImage();
    }

    function drawImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filters;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            drawImage();
        };
    });
</script>

<style>
    .container {
        text-align: center;
        margin-top: 20px;
    }

    canvas {
        border: 1px solid #ddd;
        margin-top: 20px;
    }

    .filters {
        margin-top: 20px;
    }

    .filters button {
        margin: 0 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    .bg-white{
        background-color: #FF96AD;
    }

    a{
        background-color: #005A8D;
    }
   
    .custom-bg-color {
        background-color: #005A8D;
    }
    .custom-bg-color:hover {
        background-color: #00406C;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-white text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change="{handleFileUpload}"/>
    </label>

    <div class="container">
        <canvas id="canvas"></canvas>
        <div class="filters">
            <button type="button" on:click="{() => applyFilter('none')}" class="bg-green-500 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">Original</button>
            <button type="button" on:click="{() => applyFilter('grayscale(100%)')}" class="bg-gray-500 hover:bg-gray-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">Grayscale</button>
            <button type="button" on:click="{() => applyFilter('sepia(100%)')}" class="bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">Sepia</button>
        </div>
    </div>
    
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 text-left">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 text-left">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="custom-bg-color text-white font-medium rounded-lg text-sm px-5 py-2.5">Post</button>

</form>
