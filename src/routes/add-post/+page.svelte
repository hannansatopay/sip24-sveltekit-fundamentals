<script>
    let files = null;


</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <!-- <input type="file"> -->
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-grat-300">
        <div class="flex flex-col items-center pt-5 pb-6">
            {#if files && files.length}
            <!-- to show name if a file is selected -->
            <p class="text-gray-500 font-semibold">{files[0].name}</p>    
            <!-- by default, files is shown as an array in console therefore treating it like an array -->
            {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"></svg>
            <p class="text-gray-500 font-semibold">Click to upload</p>    
            {/if}
        </div>
        <input bind:files name="image" type="file" id="dropzone" accept="image/png image/jpeg" class="hidden" required>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <input name="content" id="content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 font-medium py-2 px-4 rounded">Share</button>
</form>