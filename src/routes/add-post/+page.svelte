<script>
    let files = null;
    let isGrayscale = false;

// Function to toggle grayscale effect
const toggleGrayscale = () => {
        isGrayscale = !isGrayscale;
        console.log('Grayscale toggled:', isGrayscale); // Debugging statement
    };


const resetGrayscale = () => {
        isGrayscale = false;
        console.log('Grayscale reset:', isGrayscale);
    };
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Home</a>
    </div>
</header>

<form method="POST" class="container mx-auto p-5" enctype="multipart/form-data"> 
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                <img 
                    class="w-full mt-3 {isGrayscale ? 'grayscale' : ''}" 
                     
                    alt="Preview"
                >
            
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>


    <div class="flex space-x-4 mb-3">
        <button type="button" on:click={toggleGrayscale} class="bg-gray-500 text-white hover:bg-gray-800 font-bold py-2 px-4 rounded-lg">
            {#if isGrayscale}Remove Grayscale{:else}Grayscale{/if}
        </button>
        <button type="button" on:click={resetGrayscale} class="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded-lg">
            Reset
        </button>
    </div>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
    .grayscale {
        filter: grayscale(100%);
    }


</style>