<script>
    import { onMount } from 'svelte';

    let files = null;
    let canvas;
    let ctx;
    let image = new Image();
    let originalImageData;

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
                image.onload = function() {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                };
            };
            reader.readAsDataURL(file);
        }
    }

    function applyFilter(filter) {
        ctx.putImageData(originalImageData, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            if (filter === 'grayscale') {
                const gray = red * 0.3 + green * 0.59 + blue * 0.11;
                data[i] = data[i + 1] = data[i + 2] = gray;
            } else if (filter === 'sepia') {
                data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function resetImage() {
        ctx.putImageData(originalImageData, 0, 0);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        canvas.toBlob(async (blob) => {
            formData.append('image', blob, files[0].name);
            
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Error submitting form');
            }
        }, 'image/png');
    }

    onMount(() => {
        ctx = canvas.getContext('2d');
    });
</script>

<style>
    .container {
        max-width: 600px;
        margin: auto;
        text-align: center;
    }
    .hidden {
        display: none;
    }
    .mt-4 {
        margin-top: 1rem;
    }
    .border {
        border: 1px solid #ccc;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>
<div class="container">
    <canvas bind:this={canvas} width="600" height="400" class="border mt-4"></canvas>

    <div class="mt-4">
        <button on:click={() => applyFilter('grayscale')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Grayscale</button>
        <button on:click={() => applyFilter('sepia')} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Sepia</button>
        <button on:click={resetImage} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset</button>
    </div>
</div>
<form class="container mx-auto p-5" on:submit={handleSubmit} method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
    </label>
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


