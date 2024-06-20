<script>
    let files = null;
    let grayscale = false;
    let imageElement = null;
    let imageURL = null;
    let processedImageURL;
    let processedImageBlob = null;

    $: if (files && files.length) {
        imageURL = URL.createObjectURL(files[0]);
        processImage();
    }

    const handleApplyFilter = (event) => {
        event.preventDefault();
        grayscale = !grayscale;
        processImage();
    };

    const processImage = () => {
        if (!files || !files.length) return;

        const file = files[0];
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            if (grayscale) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }

                ctx.putImageData(imageData, 0, 0);
            }

            canvas.toBlob((blob) => {
                processedImageBlob = blob;
                processedImageURL = URL.createObjectURL(blob);
            }, file.type);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        if (processedImageBlob) {
            formData.set('image', processedImageBlob, files[0].name);
        } else {
            formData.set('image', files[0], files[0].name);
        }

        // Example: Submitting the form via fetch
        fetch('/add-post', {
            method: 'POST',
            body: formData,
        })
    };
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="mx-auto container py-5 px-5 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="mb-3 flex flex-col items-center justify-center pt-6 pd-5">
            {#if processedImageURL}
                <img bind:this={imageElement} src={imageURL} alt={files[0].name} class="image-preview" style="filter: {grayscale ? 'grayscale(100%)' : 'none'};">
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
        </div>
    </label>
    <input name="image" bind:files id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
    
    <button on:click={handleApplyFilter} class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5">{grayscale? 'Remove GrayScale Filter' : 'Apply GrayScale Filter'}</button>

    <div>
        <label for="username" class="mt-5 block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
    </div>

    <div>
        <label for="content" class="mt-5 block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" type="text" class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5">Share</button>

</form>


<style>
    .image-preview {
        max-width: 200px;
        max-height: 200px; 
        width: auto;       
        height: auto;      
    }
</style>