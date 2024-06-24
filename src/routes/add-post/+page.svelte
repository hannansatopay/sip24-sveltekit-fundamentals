<script>
    let files = null;
    let imageUrl = null;
    let canvas;
    let ctx;
    
    function handleFileChange(event) {
        files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
                displayImage();
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function displayImage() {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageUrl;
    }

    function applyFilter(filter) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            if (filter === 'grayscale') {
                const avg = (red + green + blue) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            } else if (filter === 'sepia') {
                data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    $: if (canvas) {
        ctx = canvas.getContext('2d');
    }
</script>

<style>
    .hidden { display: none; }
    h2{
        text-align: center;
        font-size: larger;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold" style="font-family: 'Comic Sans MS';">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required>
    </label>   
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2">Share</button>
</form>

<div class="flex flex-col items-center mt-5">
    <div class="canvas-container mb-4">
        <h2 class:hidden={!imageUrl}>APPLY FILTER</h2>
        <canvas bind:this={canvas} width="500" height="500" class:hidden={!imageUrl}></canvas>
    </div>
    <div class:hidden={!imageUrl} class="flex space-x-4">
        <button 
            class="btn bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            on:click={() => applyFilter('grayscale')}
        >
            Grayscale
        </button>
        <button 
            class="btn bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-semibold py-2 px-4 border border-yellow-400 rounded shadow"
            on:click={() => applyFilter('sepia')}
        >
            Sepia
        </button>
    </div>
</div>