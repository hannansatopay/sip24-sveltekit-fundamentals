<script>
    import { onMount } from 'svelte';

    let files = null;
    let canvas;
    let ctx;
    let img;
    let editedImageDataURL = "";
    let selectedFilter = null;

    const MAX_WIDTH = 600;
    const MAX_HEIGHT = 300;

    function handleFileUpload(event) {
        files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img = new Image();
                img.onload = function () {
                    const aspectRatio = img.width / img.height;
                    let newWidth = img.width;
                    let newHeight = img.height;

                    if (newWidth > MAX_WIDTH) {
                        newWidth = MAX_WIDTH;
                        newHeight = newWidth / aspectRatio;
                    }
                    
                    if (newHeight > MAX_HEIGHT) {
                        newHeight = MAX_HEIGHT;
                        newWidth = newHeight * aspectRatio;
                    }

                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    applyFilter(selectedFilter); // Apply selected filter on image load
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }

    function applyFilter(filter) {
        if (!img) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg; // red
                    data[i + 1] = avg; // green
                    data[i + 2] = avg; // blue
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];
                    const green = data[i + 1];
                    const blue = data[i + 2];
                    data[i] = red * 0.393 + green * 0.769 + blue * 0.189; // red
                    data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168; // green
                    data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131; // blue
                }
                break;
            default:
                // No filter (original image)
                break;
        }

        ctx.putImageData(imageData, 0, 0);
        updateEditedImageDataURL(); // Update editedImageDataURL after applying filter
    }

    function updateEditedImageDataURL() {
        editedImageDataURL = canvas.toDataURL("image/png");
    }

    function handleSubmit(event) {
    event.preventDefault();

    // Get other form data
    const formData = new FormData(event.target);

    // Create a Blob from the canvas image data
    canvas.toBlob((blob) => {
        formData.append('image', blob, 'filtered_image.png'); // Adjust the filename as needed

        try {
            fetch('/add-post', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert('Image uploaded successfully!');
                    window.location.href = '/'; // Redirect to home page after successful upload
                } else {
                    return response.text().then(error => {
                        throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${error}`);
                    });
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                alert('Error uploading image.');
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
    }, 'image/png');
}


    onMount(() => {
        canvas = document.getElementById('imageCanvas');
        ctx = canvas.getContext('2d');
    });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileUpload} />
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

    <div class="container mx-auto p-5">
        <h2 class="text-2xl font-bold mb-3">Image Preview & Filters</h2>
        <canvas id="imageCanvas" class="border rounded-lg"></canvas>
        <div class="mt-3">
            <button type="button" on:click={() => { selectedFilter = null; applyFilter(); }} class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Original</button>
            <button type="button" on:click={() => { selectedFilter = 'grayscale'; applyFilter('grayscale'); }} class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Grayscale</button>
            <button type="button" on:click={() => { selectedFilter = 'sepia'; applyFilter('sepia'); }} class="bg-gray-500 text-white px-4 py-2 rounded-lg">Sepia</button>
        </div>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>




