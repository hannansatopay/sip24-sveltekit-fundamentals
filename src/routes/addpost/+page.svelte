<script>
    // let files=null;
    // $: console.log(files);
    import { onMount } from 'svelte';
    let canvas;
    let ctx;
    let files = null;

    onMount(() => {
        ctx = canvas.getContext('2d');
    });

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    function applyGrayscale() {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function applySepia() {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            data[i] = (red * 0.393) + (green * 0.769) + (blue * 0.189); // red
            data[i + 1] = (red * 0.349) + (green * 0.686) + (blue * 0.168); // green
            data[i + 2] = (red * 0.272) + (green * 0.534) + (blue * 0.131); // blue
        }

        ctx.putImageData(imageData, 0, 0);
    }
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center ">
        <h1 class="text-2xl font-bold" style="font-family:Verdana, Geneva, Tahoma, sans-serif;">CraftLab</h1>
        <a href="/"><button type="button" class="text-white bg-gradient-to-r from-blue-200 via-blue-400 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-600 font-bold rounded-lg text-sm px-3 py-2 text-center ">Home</button></a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-5 h-5 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
            </div>
    <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileChange}/>
    <canvas bind:this={canvas} width="auto" height="auto" class="border"></canvas>
    </label>
    <div class=" flex gap-4 mt-4">
        <button type="button" class="py-2 px-2 bg-gray-300 rounded hover:bg-gray-400" on:click={applyGrayscale}>Grayscale</button>
        <button type="button" class="py-2 px-2 mb-auto bg-gray-300 rounded hover:bg-gray-400" on:click={applySepia}>Sepia</button>
    </div>
    <div class="mb-3">
     <label for="username" class="block mb-2 text-sm font-medium text-gray-900">UserName</label>
    <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>

    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="conten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Share</button>
</form>

         