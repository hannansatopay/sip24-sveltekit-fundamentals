<script>
    let files = null;

    let canvas, ctx, originalImage, modifiedImage;
    function handleFileChange(e) {
        files = e.target.files;
        if (files && files.length) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = new Image();
                originalImage = image;
                image.onload = function () {
                    ctx = canvas.getContext("2d");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    originalImage = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                    );
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        }
    }
    function applyGreyscale() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        saveCanvasImage();
    }
    function applySepia() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            data[i] = Math.min(255, 0.393 * red + 0.769 * green + 0.189 * blue); // Red channel
            data[i + 1] = Math.min(
                255,
                0.349 * red + 0.686 * green + 0.168 * blue,
            ); // Green channel
            data[i + 2] = Math.min(
                255,
                0.272 * red + 0.534 * green + 0.131 * blue,
            ); // Blue channel
        }
        ctx.putImageData(imageData, 0, 0);
        saveCanvasImage();
    }
    function resetImage() {
        ctx.putImageData(originalImage, 0, 0);
        saveCanvasImage();
    }
    function saveCanvasImage() {
        canvas.toBlob((blob) => {
            const file = new File([blob], "modified_image.png", {
                type: "image/png",
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById("dropzone").files = dataTransfer.files;
        }, "image/png");
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaClone</h1>
        <a
            href="/"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >Home</a
        >
    </div>
</header>
<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <!--   <div>
        <input type="file" />
    </div>
    <div> -->
    <label
        for="dropzone"
        class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
    >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <!-- <svg class="w-8 h-8 mb-4 text-gray-500 icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" width="1em" height="1em"><path stroke="black"/></svg> -->
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">
                    {files[0].name}
                </p>
                <canvas
                    id="myCanvas"
                    bind:this={canvas}
                    class="max-h-64 max-w-full"
                ></canvas>
            {:else}
                <svg
                    class="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                    ><path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    /> <image href={files} height="200" width="200" /></svg
                >
                <p class="text-sm text-gray-500 font-semibold">
                    Click to Upload
                </p>
            {/if}
        </div>
        <input
            on:change={handleFileChange}
            bind:files
            name="image"
            id="dropzone"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            required
        />
    </label>

    <div class="mb-3">
        {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold mb-1">Add Filters</p>
            <button
                on:click={resetImage}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2"
                >Reset</button
            >
            <button
                on:click={applyGreyscale}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2"
                >Greyscale</button
            >
            <button
                on:click={applySepia}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2"
                >Sepia</button
            >
        {/if}
        <div class="mb-3">
            <div>
                <label
                    for="username"
                    class="black mb-2 text-sm font-medium text-gray-900"
                    >Username</label
                >
                <input
                    name="username"
                    id="username"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 tesxt-sm rounded-lg block w-full p-2.5"
                />
            </div>
        </div>
        <div class="mb-3">
            <div>
                <label
                    for="content"
                    class="black mb-2 text-sm font-medium text-gray-900"
                    >Content</label
                >
                <textarea
                    name="content"
                    id="content"
                    class="bg-gray-50 border border-gray-300 text-gray-900 tesxt-sm rounded-lg block w-full p-2.5"
                ></textarea>
            </div>
        </div>
        <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >Share</button
        >
    </div>
</form>
