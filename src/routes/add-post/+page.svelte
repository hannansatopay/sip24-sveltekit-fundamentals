<script>
    let files;
    let imgSrc = '';
    let canvas;
    let ctx;
    let image = new Image();
    function handleFileChange(event) {
        files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            imgSrc = URL.createObjectURL(file);
        }
    }
    function loadImage() {
        image.src = imgSrc;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        };
    }
    function applyFilter(filter) {
        if (ctx && image) {
            ctx.drawImage(image, 0, 0);
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
                        let red = data[i];
                        let green = data[i + 1];
                        let blue = data[i + 2];
                        data[i] = 0.393 * red + 0.769 * green + 0.189 * blue;
                        data[i + 1] = 0.349 * red + 0.686 * green + 0.168 * blue;
                        data[i + 2] = 0.272 * red + 0.534 * green + 0.131 * blue;
                    }
                    break;
            }
            ctx.putImageData(imageData, 0, 0);
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleSubmit}>

    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required>
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-3 py-1" required>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-3 py-1" required></textarea>
    </div>

    {#if imgSrc}
        <div class="mb-3 flex flex-col items-center">
            <canvas bind:this={canvas} class="border border-gray-300"></canvas>
            <div class="mt-3 flex space-x-3">
                <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md" on:click={() => applyFilter('grayscale')}>Grayscale</button>
                <button type="button" class="bg-brown-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded-md" on:click={() => applyFilter('sepia')}>Sepia</button>
            </div>
        </div>
    {/if}

    <button type="submit" class="text-white bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 mt-5">Share</button>
</form>

<script>
    function handleSubmit(event) {
        const formData = new FormData(event.target);
        
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle successful response
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
    $: {
        if (imgSrc) {
            loadImage();
        }
    }
</script>

<style>
    .bg-brown-500 { background-color: #8B4513; }
    .hover\:bg-brown-700:hover { background-color: #5A2D0C; }
</style>