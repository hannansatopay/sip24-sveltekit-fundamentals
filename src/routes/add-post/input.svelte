<script>
    import { onMount } from 'svelte';
    let data;
    let canvas;
    let ctx;
    let img = new Image();
    let originalImageData;

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    function applyFilter(filter) {
        ctx.putImageData(originalImageData, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        switch(filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    let r = data[i], g = data[i + 1], b = data[i + 2];
                    data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
                    data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
                    data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
                }
                break;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 400;
    });
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    canvas {
        border: 1px solid black;
    }

    .filters {
        margin-top: 20px;
    }

    .filters button {
        margin: 0 5px;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="container">
    <input type="file" accept="image/*" on:change={handleFileUpload} />
    <canvas id="canvas"></canvas>
    <div class="filters">
        <button on:click={() => applyFilter('grayscale')}>Grayscale</button>
        <button on:click={() => applyFilter('sepia')}>Sepia</button>
    </div>
</div>
