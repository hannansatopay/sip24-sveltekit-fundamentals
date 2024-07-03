<script>
    let files = null;
    $: console.log(files)
</script>



<header class="bg-white py-4 shadow-md sticky top-0 z-99">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/" class="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 ">Home</a>
    </div>
    
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dotted">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            <img src={URL.createObjectURL(files[0])} alt="" class="w-32 h-32 rounded-lg"/>
            {:else}
            <svg class="w-8 h-8 mb-4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"/></svg>
            <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
            {/if}
            </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg " class="hidden" required/>
    </label>
    <div class="mb-3">
        <label class="block mb-2 text-sm font-medium text-gray-900" for="username">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
        
    </div>
    <div class="mb-3">
        <label class="block mb-2 text-sm font-medium text-gray-900" for="content">Content</label>
        <textarea name="content" id="content"  class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2">Share</button>
</form>