<script>
    let files=null;
    
    let filter = '';
    $:console.log(files);
    $: if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    }
    $: console.log(files);
</script> -
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">Home</a>
    </div>
</header>

<form id="uploadForm" class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length > 0}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V8m0 0l4 4m-4-4l-4 4M5 8v10h6.5A5.5 5.5 0 0117 23v0a5.5 5.5 0 01-5.5-5.5V8h1.5"></path>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>

        <input bind:files id="dropzone" name="image" type="file" accept="image/png, image/jpeg" class="hidden" required>
    </label>
    <div class="mb-2">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input name="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your username">
    </div>
    <div class="mb-2">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please enter"></textarea>
    </div>
    <div class="mb-2">
        <label for="filter" class="block mb-2 text-sm font-medium text-gray-700">Image Filter</label>
        <select bind:value={filter} id="filter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">None</option>
            <option value="grayscale(100%)">Grayscale</option>
            <option value="sepia(100%)">Sepia</option>
            <option value="invert(100%)">Invert</option>
            <option value="blur(5px)">Blur</option>
        </select>
    </div>
    <button type="submit" class="text-green bg-black-700 hover:bg-gray-900 font-medium rounded-lg px-5 py-2.5">Share</button>
</form>