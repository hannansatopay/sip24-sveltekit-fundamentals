<script>
    let files= null;
    $:console.log(files);
</script>

<header class ="bg-[#FFD700] py-4 px-1 shadow-md sticky top-0  z-10">
    <div class="container mx-auto px-4 flex justify-between items-centre ">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a href="/" class="bg-[#8B4513] text-white py-2 px-3 rounded-lg hover:bg-[#A0522D]">Home</a>
    </div>
    </header>

    <form class="container mx-auto p-5 " method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex col items-center justify-center border-2 border-dashed border-red-700 rounded-lg p-4 cursor-pointer bg-orange-200 hover:bg-orange-100 transition duration-300 ease-in-out">
        <div class="flex flex-col items-centre justify-centre text-center ">
           {#if files &&  files.length}
           <p class="text-black">{files[0].name}</p>
           {:else}
           <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xlmns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          
      <p class="text-black">Upload your file by dragging it here or clicking to select </p>
           {/if}
            
        </div>
          <input bind:files name="image" id="dropzone" type="file" accept="image/png,image/jpeg" class="hidden" required />
      </label>
      
    <div class="mb-3">
        <label for="Username" class="block mb-2 text-md font-medium text-black ">Username</label>
        <input name="Username" id="Username" type="text" class="bg-[#D2B48C] border border-yellow-900 text-block text-md rounded-lg block w-full  p-3"/>
    </div>
    <div class="mb-3">
        <label for="Content" class="block mb-2 text-md font-medium text-black ">Content</label>
        <textarea name="Content" id="Content"  class="bg-[#D2B48C] border border-yellow-900 text-block text-md rounded-lg block w-full p-3">
            </textarea>
    </div>
    <button type="submit" class="bg-yellow-600 text-gray-100 py-2 px-3 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out">Share </button>
</form>