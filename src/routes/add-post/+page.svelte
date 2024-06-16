<script> 
    let files = null;
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_sans_MS']">CraftLab</h1>
        <a  href="/" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Home</a>
    </div>
</header>
<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center rounded-lg w-full h-64 border-2 border-gray-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6 ">
        {#if files && files.length}
        <p class="text-sm text-gray-500">{files[0].name}</p>
        {:else}
        <p class="text-sm text-gray-500">click to upload</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
          </svg>
        {/if}
           
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" hidden required />
    </label>
    
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-5" type="text" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 px-5 py-2.5 rounded-lg font-medium text-sm">Share</button>
    
</form>
