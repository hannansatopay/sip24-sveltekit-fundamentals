<script>
    import { onMount } from 'svelte';
    let files = null;
    let canvas;
    let ctx;
    let img;
    let modifiedImageBlob;

    function handleFileChange(event) {
        files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function applyFilter(filter) {
        if (!img) return;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (filter) {
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
                    data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                    data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                    data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
                }
                break;
            default:
                return;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (canvas) {
            canvas.toBlob((blob) => {
                modifiedImageBlob = blob;

                const formData = new FormData(event.target);
                formData.delete('image');
                formData.append('image', modifiedImageBlob, 'filtered-image.png');

                fetch(event.target.action, {
                    method: 'POST',
                    body: formData,
                }).then(response => {
                    if (response.ok) {
                        alert('Post submitted successfully');
                    } else {
                        alert('click submit');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    alert('Failed to submit post');
                });
            });
        }
    }

    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
    });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" action="/add-post" enctype="multipart/form-data" on:submit="{handleSubmit}">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change="{handleFileChange}"/>
    </label>

    <div class="mx-auto p-5 flex items-center">
        <h1 class=" font-bold flex text-3xl align-bottom mt-2 mr-4">Filters </h1>
        <div class="flex space-x-2 mt-3">
            <button on:click={() => applyFilter('grayscale')} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Grayscale</button>
            <button on:click={() => applyFilter('sepia')} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Sepia</button>
        </div>
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

<div class="container mx-auto p-5">
    <canvas id="canvas" class="border border-gray-300"></canvas>
</div>

<style>
    #canvas {
        max-width: 100%;
        height: auto;
    }
</style>
