<script>
    import { onMount } from 'svelte';

    let files = null;
    let preview = '';
    let imgSrc = '';
    let canvas, ctx;
    let img = new Image();

    onMount(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
    });

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            preview = event.target.result;
            img.src = event.target.result;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
        }
        reader.readAsDataURL(file);
    }

    function applyFilter(filter) {
        ctx.filter = filter;
        ctx.drawImage(img, 0, 0);
    }

    function deletePost() {
        // Implement delete post functionality here
        console.log('Deleting post...');
    }
</script>

<style>
    .container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        background-color: #f3f4f6; /* Light gray background */
    }

    .header {
        background-color: rgb(145, 59, 168); /* Purple header background */
        color: rgb(246, 238, 238);
        padding: 20px;
        text-align: left;
        font-family: 'Trebuchet MS';
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .form-container {
        background-color: #e6e2e2; /* White background for form */
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
        padding: 30px;
        border-radius: 12px;
    }

    .dropzone {
        border: 2px dashed #08376c; /* Blue dashed border for dropzone */
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        background-color: #edf2fb; /* Light blue background */
    }

    .dropzone:hover {
        background-color: #dbeafe; /* Darker blue on hover */
    }

    .preview-image {
        max-width: 100%;
        height: auto;
        margin-top: 20px;
        border: 2px solid #4a90e2; /* Blue border for image preview */
        border-radius: 8px;
    }

    .input-field {
        margin-top: 20px;
    }

    .filter-buttons {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .filter-button {
        background-color: #22c55e; /* Green filter button */
        color: white;
        border: none;
        padding: 12px 24px;
        margin: 0 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .filter-button:hover {
        background-color: #16a34a; /* Darker green on hover */
    }

    .form-button {
        background-color: #671369; /* Pink form button */
        color: white;
        border: none;
        padding: 14px 28px;
        margin-top: 30px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .form-button:hover {
        background-color: #d91a6b; /* Darker pink on hover */
    }

    .delete-button {
        background-color: #f44336; /* Red delete button */
        color: white;
        border: none;
        padding: 10px 20px;
        margin-top: 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .delete-button:hover {
        background-color: #d32f2f; /* Darker red on hover */
    }
</style>

<div class="container">
    <div class="header">
        <h1 class="text-3xl font-bold">CraftLab</h1>
    </div>

    <div class="form-container">
        <form method="POST" enctype="multipart/form-data" class="space-y-5">
            <label for="dropzone" class="dropzone">
                <svg class="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p class="text-blue-500 font-semibold">Click or drag to upload an image</p>
                <input bind:this={files} on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpg, image/jpeg" class="hidden" required />
            </label>
            {#if preview}
                <div class="text-center">
                    <img src={preview} alt="Image preview" class="preview-image" />
                </div>
            {/if}
            <div class="input-field">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900">USERNAME</label>
                <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3" required />
            </div>
            <div class="input-field">
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900">CONTENT</label>
                <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3" required></textarea>
            </div>
            <button type="submit" class="form-button w-full font-medium rounded-lg text-sm">Post</button>
        </form>

        {#if preview}
            <div class="mt-10">
                <canvas id="canvas" class="border border-gray-300 rounded-lg w-full"></canvas>
                <div class="filter-buttons">
                    <button on:click={() => applyFilter('grayscale(100%)')} class="filter-button">Grayscale</button>
                    <button on:click={() => applyFilter('sepia(100%)')} class="filter-button">Sepia</button>
                </div>
            </div>
        {/if}
    </div>

    {#if preview}
        <button class="delete-button mt-5" on:click={deletePost}>Delete Post</button>
    {/if}
</div>
