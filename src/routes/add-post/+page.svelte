<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'; // Import goto from SvelteKit

    let files = null;
    let canvas, ctx;
    let originalImageData = null;
    let imageName = '';
    let formSubmitted = false; // Track form submission status

    function handleUpload(event) {
        const file = event.target.files[0];
        if (file) {
            imageName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
            files = [file]; // Update the files array with the selected file
        }
    }

    function applyFilter(filter) {
        if (!originalImageData) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch(filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
                    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
                    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
                }
                break;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function resetImage() {
        if (originalImageData) {
            ctx.putImageData(originalImageData, 0, 0);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!files || !files.length) return;

        const formData = new FormData(event.target);

        // Convert the canvas to a blob and append it to the FormData
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
        formData.set('image', new File([blob], imageName, { type: 'image/jpeg' }));

        // Submit the form using fetch or any other method
        fetch(event.target.action, {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                formSubmitted = true; // Update formSubmitted status
                goto('/'); // Redirect to home page
            } else {
                // Handle errors
            }
        });
    }

    onMount(() => {
        canvas = document.createElement('canvas');
    });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
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
        <input bind:files on:change={handleUpload} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
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

{#if files && files.length}
    <div class="container mx-auto my-5">
        <div class="image-editor">
            <canvas bind:this={canvas}></canvas>
            <div class="filters">
                <button type="button" on:click={() => applyFilter('grayscale')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Grayscale</button>
                <button type="button" on:click={() => applyFilter('sepia')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sepia</button>
                <button type="button" on:click={resetImage} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .image-editor {
        text-align: center;
    }

    canvas {
        border: 1px solid #ccc;
        margin-top: 20px;
        display: block;
        max-width: 100%;
    }

    .filters {
        margin-top: 20px;
    }

    .filters button {
        margin: 0 5px;
        padding: 10px 20px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }

    .filters button:hover {
        background-color: #0056b3;
    }
</style>
