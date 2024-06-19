<script>
    let files = null;
    let canvas;
    let ctx;
    let originalImage;
    let filteredImage;

    function handleFileChange(event) {
        files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage = new Image();
            originalImage.onload = () => {
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;
                ctx.drawImage(originalImage, 0, 0);
                filteredImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
            };
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function applyFilter(filter) {
        if (filter === 'grayscale') {
            for (let i = 0; i < filteredImage.data.length; i += 4) {
                const r = filteredImage.data[i];
                const g = filteredImage.data[i + 1];
                const b = filteredImage.data[i + 2];
                const gray = (r + g + b) / 3;
                filteredImage.data[i] = gray;
                filteredImage.data[i + 1] = gray;
                filteredImage.data[i + 2] = gray;
            }
        } else if (filter === 'sepia') {
            for (let i = 0; i < filteredImage.data.length; i += 4) {
                const r = filteredImage.data[i];
                const g = filteredImage.data[i + 1];
                const b = filteredImage.data[i + 2];
                filteredImage.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                filteredImage.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                filteredImage.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            }
        } else if (filter === 'none') {
            ctx.drawImage(originalImage, 0, 0);
            filteredImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        ctx.putImageData(filteredImage, 0, 0);
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div clas="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab.</h1>
        <a href="/" class="bg-blue-500 hover:bg-green-300 text-White font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex felx-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg">
    <div class="flex flex-col items-center juistify-center pt-5 pb-6">
        {#if files && files.length}
        <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
        <svg class="w=8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="htts://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke=""></path></svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
     {/if}
    </div>
    <input bind:files id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
</label>
<div class="mb-3">
    <label for="Username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
<input name="Username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
</div>
<div class="mb-3">
    <label for="Content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
<textarea name="Content" id="Content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
</div>
<button type="submit" class="text-white bg-blue-700 hover:bg-green-300 font-medium rounded-lg text-sm px-5 py-2.5"></button>
</form>