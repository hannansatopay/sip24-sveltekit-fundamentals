<script>
    import { onMount } from 'svelte';

    let files = null;
    let canvas;
    let ctx;

    onMount(() => {
        if (canvas) {
            ctx = canvas.getContext('2d');
        }
    });

    //Function used to display image
    function handleFileChange(event) {
        files = event.target.files;
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    drawImage(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function drawImage(img) {
        if (canvas && ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }

    //Function to Apply Filter: - GrayScale and Sepia
    function applyFilter(filter) {
        if (ctx && canvas) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                if (filter === 'grayscale') {
                    const avg = (r + g + b) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                } else if (filter === 'sepia') {
                    data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                    data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                    data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
                }
            }

            ctx.putImageData(imageData, 0, 0);
        }
    }

    //Function used to submit the file after being filtered.
    function handleSubmit(event) {
        event.preventDefault();

        if (canvas && ctx) {
            canvas.toBlob((blob) => {
                const newFile = new File([blob], files[0].name, { type: 'image/png' });
                const formData = new FormData(event.target);

                formData.set('image', newFile);

                fetch(event.target.action, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }, 'image/png');
        }
    }
</script>

<style>
    .canvas-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    canvas {
        max-width: 100%;
        max-height: 100%;
    }
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }
    .filter-buttons button {
        background-color: #4a5568;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .filter-buttons button:hover {
        background-color: #2d3748;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="canvas-container">
            <canvas bind:this={canvas}></canvas>
            {#if !files}
                <div class="flex flex-col items-center justify-center pt-5 pb-6 absolute inset-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>  
                    <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
                </div>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
    </label>
    <div class="filter-buttons">
        <button type="button" on:click={() => applyFilter('grayscale')} class="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5">Grayscale</button>
        <button type="button" on:click={() => applyFilter('sepia')} class="bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded-lg text-sm px-5 py-2.5">Sepia</button>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg block w-full p-2.5" required/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg block w-full p-2.5" required></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
