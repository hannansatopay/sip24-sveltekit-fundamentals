<script>
    let files=null;
    function handleFileChange(event) {
        files = event.target.files;
    }

   // console.log(files);
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Home</a>
    </div>
    </header>


 <form class="container mx-auto p-5" method="post" enctype="multipart/form-data">

    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"></svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
           
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
    </label>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-500 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-500 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>



 </form>