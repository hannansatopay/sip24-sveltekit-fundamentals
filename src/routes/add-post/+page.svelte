<script>
    let files = null;
    let image;
    let canvas;
    let ctx;
    let filterCanvas;
    let filterCtx;
    const CANVAS_WIDTH = 500;
    const CANVAS_HEIGHT = 500;

    if (typeof window !== 'undefined') {
        image = new window.Image();
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                image.onload = () => {
                    drawImage();
                };
            };
            
            reader.readAsDataURL(file);
        }
    }

    function drawImage() {
        if (canvas && image) {
            ctx = canvas.getContext('2d');
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            const scale = Math.min(CANVAS_WIDTH / image.width, CANVAS_HEIGHT / image.height);
            const x = (CANVAS_WIDTH / 2) - (image.width / 2) * scale;
            const y = (CANVAS_HEIGHT / 2) - (image.height / 2) * scale;
            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

            // Initialize filter canvas
            filterCanvas = document.createElement('canvas');
            filterCanvas.width = CANVAS_WIDTH;
            filterCanvas.height = CANVAS_HEIGHT;
            filterCtx = filterCanvas.getContext('2d');
        }
    }

    function applyFilter(filter) {
        if (!filterCtx) return;

        filterCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        filterCtx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const imageData = filterCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const data = imageData.data;

        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];
                    const green = data[i + 1];
                    const blue = data[i + 2];
                    data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                    data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                    data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
                }
                break;
            case 'invert':
                for(let i = 0; i < data.length; i += 4){
                    data[i] = 255 - data[i];       //red
                    data[i+1] = 255 - data[i+1];   //green
                    data[i+2] = 255 - data[i+2];   //blue 
                }
                break;
            case 'normal':
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                break;
            default:
                break;
        }

        filterCtx.putImageData(imageData, 0, 0);

        // Draw filtered image onto main canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(filterCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
</script>


<header class="bg-white shadow sticky top-0 z-10">
    <div class="container mx-auto p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">CraftLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<div class="container mx-auto p-4">
    <form method="POST" enctype="multipart/form-data" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-300 h-300 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    {#if files && files.length}
                        <div class="mb-4">
                            <canvas bind:this={canvas} width="500" height="500" ></canvas>
                        </div>
                        <div class="flex space-x-4">
                            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => applyFilter('normal')}>
                                Normal
                            </button>
                            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => applyFilter('grayscale')}>
                                Grayscale
                            </button>
                            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => applyFilter('sepia')}>
                                Sepia
                            </button>
                            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => applyFilter('invert')}>
                                Invert
                            </button>
                        </div>
                    {:else}
                        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
                    {/if}
                </div>
                <input bind:files={files} on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
            </label>
        </div>
        
        <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50">
        </div>
        <div class="mb-4">
            <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea id="content" name="content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"></textarea>
        </div>
        <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Share
            </button>
        </div>
    </form>
</div>
