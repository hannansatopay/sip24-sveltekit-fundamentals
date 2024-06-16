<script>
    let files = null;
</script>

<style>
    body {
        background-color: #121212; /* Dark background color */
        color: #e0e0e0; /* Light text color for good contrast */
        font-family: sans-serif; /* Set a default font */
        margin: 0; /* Remove default margin */
    }

    .container {
        padding-top: 20px; /* Add padding to the top to avoid touching the header */
        
    }

    .form-container {
        padding: 20px; /* Padding inside the form container */
        background-color: #1f2937; /* Darker background for the form container */
        border-radius: 10px; /* Rounded corners */
    }

    .dropzone {
        background-color: #374151; /* Darker background for the dropzone */
        color: #d1d5db; /* Light text color */
    }

    .dropzone p {
        color: #9ca3af; /* Lighter text color */
    }

    .input-field {
        background-color: #374151; /* Darker background for input fields */
        border-color: #4b5563; /* Dark border color */
        color: #d1d5db; /* Light text color */
    }

    .input-label {
        color: #d1d5db; /* Light text color */
    }
</style>

<header class="bg-gray-900 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<div class="container mx-auto">
    <form class="form-container" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="dropzone mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"> 
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                    <p class="text-sm font-semibold">{files[0].name}</p>
                {:else}
                    <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p class="text-sm font-semibold">Click to upload</p>
                {/if}
            </div>
            <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
        </label>
        <div class="mb-3">
            <label for="username" class="input-label block mb-2 text-sm font-medium">Username</label>
            <input name="username" id="username" type="text" class="input-field border text-sm rounded-lg block w-full p-2.5" />
        </div>
        <div class="mb-3">
            <label for="content" class="input-label block mb-2 text-sm font-medium">Content</label>
            <textarea name="content" id="content" class="input-field border text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
    </form>
</div>
