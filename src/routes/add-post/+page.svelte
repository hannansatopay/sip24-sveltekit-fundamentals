<script>
    let files=null;
    $:console.log(files);
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 roundex">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
   
   <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 cursor-pointer">
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18M13 7h8m-8 4h6m-6 4h4m-4 4h2"/>
            </svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
    </div>
    <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
</label>

    <div class="mb-3">
        <lable for ="useername" class="block mb-2 text-sm font-medium text-gray-900">Username</lable>
        <input  name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>

    <div class="mb-3">
        <lable for ="content" class="block mb-2 text-sm font-medium text-gray-900">Content</lable>
        <textarea  name="content" id="content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
 <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 "></button>

</form>