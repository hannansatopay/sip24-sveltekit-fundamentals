<script>
    let files = null;
    let previewSrc = '';
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
            previewSrc = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']" >Instagram</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>
<form action="" class="container mx-auto p-5 " method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-6 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out">
        <div class="flex flex-col items-center justify-center">
            <!-- svelte-ignore missing-declaration -->
            {#if previewSrc}
                <img src={previewSrc} alt="Preview" class="w-full max-h-64 object-cover rounded-lg mb-4" />
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-12 h-12 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M7 8l3-3m0 0l3 3m-3-3v12"/>
                </svg>
                <p class="text-lg text-gray-500 font-semibold">Click to upload an image</p>
            {/if}
        </div>
        
        <!-- svelte-ignore missing-declaration -->
        <input bind:files on:change={handleFileChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden"/>
    </label>
    <div class="mb-6">
        <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <input type="text" id="username" name="username" class="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"/>
    </div>
    <div class="mb-6">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Caption</label>
        <textarea id="content" name="content" rows="4" class="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"></textarea>
    </div>
    <button type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold rounded-lg text-lg px-5 py-3 transition duration-300 ease-in-out transform hover:scale-105">Submit Post</button>
</form>

