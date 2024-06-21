<script>
    let files = null;

    let imageInput, imageCanvas;
    const fixedHeight = 300; // Set the desired height for the canvas
    let originalImage = null; // To store the original image

    // Filter values
    let brightness = 100;
    let contrast = 100;
    let blur = 0;
    let grayscale = 0;
    let sepia = 0;
    let saturate = 100;
    let hueRotate = 0;
    let rotate = 0;
    let flipH = false;
    let flipV = false;

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Store the original image
                    originalImage = img;
                    drawImage(img);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    }

    function drawImage(img) {
        const aspectRatio = img.width / img.height;
        imageCanvas.width = fixedHeight * aspectRatio;
        imageCanvas.height = fixedHeight;
        const ctx = imageCanvas.getContext('2d');
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

        // Apply transformations
        ctx.save();
        ctx.translate(imageCanvas.width / 2, imageCanvas.height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.translate(-imageCanvas.width / 2, -imageCanvas.height / 2);

        // Apply filters
        ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        blur(${blur}px)
        grayscale(${grayscale}%)
        sepia(${sepia}%)
        saturate(${saturate}%)
        hue-rotate(${hueRotate}deg)
        `;
        ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        ctx.restore();
    }

    function updateFilter() {
        if (originalImage) {
            drawImage(originalImage);
        }
    }

    function resetFilters() {
        brightness = 100;
        contrast = 100;
        blur = 0;
        grayscale = 0;
        sepia = 0;
        saturate = 100;
        hueRotate = 0;
        rotate = 0;
        flipH = false;
        flipV = false;
        updateFilter();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Convert canvas to Blob and append it to the form data
        const blob = await new Promise(resolve => imageCanvas.toBlob(resolve, 'image/jpeg'));
        formData.set('image', new File([blob], files[0].name, { type: 'image/jpeg' }));

        // Create a fetch request to submit the form data
        const response = await fetch(event.target.action, {
            method: event.target.method,
            body: formData,
        });

        if (response.ok) {
            window.location.href = '/';
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">Click to Change Image</p>
            {:else}
                <p class="text-sm text-gray-500 font-semibold">Click to Upload Image</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" bind:this={imageInput} on:change={handleImageChange} required/>
    </label>

    {#if files && files.length}
        <div class="mb-3 flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg bg-gray-50">
            <div class="pt-5">
                <h1 class="text-center font-bold pb-3">Edit Image</h1>
                <canvas bind:this={imageCanvas}></canvas>
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            </div>
            <div class="py-5">
                <label class="block">Brightness: <input type="range" min="0" max="200" bind:value={brightness} on:input={updateFilter}/> {brightness}%</label>
                <label class="block">Contrast: <input type="range" min="0" max="200" bind:value={contrast} on:input={updateFilter}/> {contrast}%</label>
                <label class="block">Blur: <input type="range" min="0" max="20" bind:value={blur} on:input={updateFilter}/> {blur}px</label>
                <label class="block">Grayscale: <input type="range" min="0" max="100" bind:value={grayscale} on:input={updateFilter}/> {grayscale}%</label>
                <label class="block">Sepia: <input type="range" min="0" max="100" bind:value={sepia} on:input={updateFilter}/> {sepia}%</label>
                <label class="block">Saturate: <input type="range" min="0" max="200" bind:value={saturate} on:input={updateFilter}/> {saturate}%</label>
                <label class="block">Hue Rotate: <input type="range" min="0" max="360" bind:value={hueRotate} on:input={updateFilter}/> {hueRotate}deg</label>
                <label class="block">Rotate: <input type="range" min="0" max="360" bind:value={rotate} on:input={updateFilter}/> {rotate}deg</label>
                <label class="block"><input type="checkbox" bind:checked={flipH} on:change={updateFilter}/> Flip Horizontal</label>
                <label class="block"><input type="checkbox" bind:checked={flipV} on:change={updateFilter}/> Flip Vertical</label>
                <button type="button" class=" w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" on:click={resetFilters}>Reset Filters</button>
            </div>
        </div>
    {/if}

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="conten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>
