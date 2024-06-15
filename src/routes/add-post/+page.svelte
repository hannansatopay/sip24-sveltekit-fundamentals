<script>
    let files = null;
    let imageUrl = null;

    function handleFilesChange(event) {
        files = event.target.files;
        if (files && files.length) {
            imageUrl = URL.createObjectURL(files[0]);
        } else {
            imageUrl = null;
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300">
        <div class="flex flex-col items-center justify-cneter pt-5 pb-6">
            {#if files && files.length}
                {#if imageUrl}
                    <img src={imageUrl} alt={files[0].name} class="max-w-full h-48 object-cover mb-4" />
                {:else}
                    <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                {/if}
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"/>
                <p class="text-sm text-gray-500 font-semibold">click to upload</p>
            {/if}
            
        </div>
        <input bind:files on:input={handleFilesChange} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 trxxt-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 trxxt-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>