<script>
    let files = null;
    let canvas;
    let ctx;
    let image = new Image();

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                };
            };
            reader.readAsDataURL(file);
        }
    }

    function applyFilter(filter) {
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (filter === 'grayscale') {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            } else if (filter === 'sepia') {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const canvasDataUrl = canvas.toDataURL();
        formData.append('image', canvasDataUrl);
        
        fetch(event.target.action, {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                window.location.href = '/';
            }
        });
    }
</script>

<header class="bg-white shadow-md py-4 sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">CRAFTLAB</h1>
        <a href="/" class="bg-violet-600 hover:bg-violet-500 font-bold text-white px-4 py-2 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed bg-gray-50 rounded-lg">
        <div class="flex flex-col border border-gray-50 items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileChange}/>
    </label>

    <canvas bind:this={canvas} class="mb-3 border rounded-lg"></canvas>
    <div class="mb-3">
        <button type="button" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" on:click={() => applyFilter('grayscale')}>Grayscale</button>
        <button type="button" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" on:click={() => applyFilter('sepia')}>Sepia</button>
    </div>
    
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full"/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-violet-600 hover:bg-violet-500 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
</form>
