<script>
    let files=null;
    let imgPreview = "";

    function handleFileUpload(e) {
        files = e.target.files;
        if (files && files.length > 0) {
            const File = files[0];
            imgPreview = URL.createObjectURL(File);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const File = files[0];
            imgPreview = URL.createObjectURL(File);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

</script>

<header class="bh-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_Ms']">InstaLab</h1>
        <a href="/" class="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" 
           class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative overflow-hidden"
           on:dragover={handleDragOver}
           on:drop={handleDrop}>
        <div class="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
            {#if imgPreview}
            <div class="relative w-full h-full flex items-center justify-center">
                <img src={imgPreview} alt="post-pic" class="max-w-full max-h-full object-contain rounded-lg">
            </div>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold">Click/Drag to Upload</p>
            {/if}
        </div>
        <input bind:files on:change={handleFileUpload} type="file" name="image" accept="image/png, image/jpeg" id="dropzone" class="hidden" required>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button class="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800">Share</button>
</form>