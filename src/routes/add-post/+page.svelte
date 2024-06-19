<script>
    import { onMount } from 'svelte';
    
    let files = null;
    let canvas;
    let ctx;
    let originalImage=null;
    let currentFilter = '';
    let username = '';
    let errorMessage = '';
    let filter=null;

    function loadImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function handleReset() {
        username = '';
        content = '';
        imageData = '';
        filter = '';
    }


    let originalImageData = null; // Store the original image data

    function applyFilter(filter) {
        if (!originalImage) return;

        if (!originalImageData) {
            // Save the original image data the first time the function is called
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }

        // Restore the original image before applying any filter
        ctx.putImageData(originalImageData, 0, 0);

        if (filter === 'none') {
            // If the filter is 'none', we are done after restoring the original image
            return;
        }

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i];
                    let g = data[i + 1];
                    let b = data[i + 2];
                    data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                    data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                    data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
                }
                break;
        }

        ctx.putImageData(imageData, 0, 0);
        currentFilter=filter;
    }



    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const content = formData.get('content');
        const imageData = canvas.toDataURL('image/png');
        

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, content, imageData, filter: currentFilter }),
            });

            if (response.ok) {
                // Handle success (e.g., redirect)
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || 'Error submitting the form.';
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            errorMessage = 'Error submitting the form.';
        }
    }

    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
    });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
            <img src="/instagram-logo.webp" alt="Instagram Logo" class="w-15 h-11">
            <h1 class="text-2xl ml-2 font-bold font-['Freight Sans']">Instagram</h1>
        </div>
        <div class="flex items-center">
            <a href="/"><img src="/home-button.webp" alt="Home button" class="w-7 h-7 ml-14"></a>
        </div>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload image</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={loadImage} />
    </label>
    <div class="container mx-auto md:my-5">
        <h1 class="text-sm font-medium mb-4">View & Edit</h1>
        <canvas id="canvas" class="border border-gray-500 rounded-lg w-full"></canvas>
        <div class="mt-4">
            <button type="button" on:click={() => applyFilter('grayscale')} class="text-sm bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded-lg mr-2">Grayscale</button>
            <button type="button" on:click={() => applyFilter('sepia')} class="text-sm bg-brown-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-lg mb-3 mr-2">Sepia</button>
            <button type="button" on:click={() => applyFilter('none')} class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-3">None</button>
        </div>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input bind:value={username} name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Type here..." required />
        {#if errorMessage}
            <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
        {/if}
    </div>
    <div class="mb-5">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Type here..."></textarea>
    </div>
    <button type="submit" class="text-white bg-purple-600 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
    <button type="reset" on:click={handleReset} class="text-white bg-purple-600 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5">Reset</button>
</form>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    button {
        transition: background-color 0.3s ease;
    }

    button.bg-brown-500 {
        background-color: #A52A2A;
    }

    button.bg-gray-500:hover {
        background-color: #4B5563;
    }

    button.bg-brown-500:hover {
        background-color: #8B4513;
    }
</style>
