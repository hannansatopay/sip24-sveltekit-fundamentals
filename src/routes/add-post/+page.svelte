<script>
let files = null;
</script>

<header class=" py-2 bg-green-100 shadow-md sticky top-0 z-5">
    <div class="text-2xl font-bold font-[calibri] scontainer px-3 py-5">
        Craftlab
        <a href="/" class="py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">

        {#if files && files.length}
    <p class="text-sm text-gray-400 font-semibold">{files[0].name}</p>
        {:else}
    <p class="text-sm text-gray-400 font-semibold">click to upload</p>
        {/if} 
    </div>   
    <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
</label>
<div>
    <label for="Username" class="px-2 py-2 mb-2 mt-2 mx-2" >Username</label><br>
    <input name="Username" id="Username" type="text" class="bg-gray-200 rounded px-2 py-2 mb-2 mt-2 mx-2 w-full">
</div>
<div>
    <label for="content" class="px-2 py-2 mb-2 mt-2 mx-2">Content</label>
 <textarea name="content" id="content" class="bg-gray-200 rounded px-2 py-2 mb-2 mt-2 mx-2 w-full"></textarea> 
</div>
<button class="px-2 py-2 mb-2 mt-2 mx-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg">share</button>
</form>