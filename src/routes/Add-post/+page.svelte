<script>
    let title="Finstagram"
    let files = null;
    $: console.log(files);
</script>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>

</head>

<header class="py-4 bg-white shadow-md ">
    <div class="container flex items-center justify-between px-4 mx-auto">
        <h1 class=" text-2xl font-bold font-['Comic_Sans_MS'] ">FinstaGram</h1>
        <a href="/" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Home</a>
    </div>
</header> 
<form class="container p-5 mx-auto" method="POST" enctype="multipart/form-data">
    
    <label for="dropzone" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">{files[0].name}</p>

            {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            {/if}
                
            
            <!-- <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
        </div>
        <input bind:files id="dropzone" type="file" name="image" class="hidden" accept="png/jpg" />
    </label>

    
    <div class="mb-3 ">
        <label for="username" class="block mb-2 text-sm font-medium text-green-500 ">Username</label>
        <input type="text" name="username" id="username" class="block w-full p-2.5 text-sm text-gray-800 rounded-lg bg-gray-50 border border-grey-700">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-green-500 ">Content</label>
        <textarea name="content" id="content" class="block w-full p-2.5 text-sm text-gray-800 rounded-lg bg-gray-50 border border-grey-700"></textarea>
    </div>
    <button type="submit " class="px-5 py-2 font-medium text-white bg-blue-300 rounded-lg hover:bg-blue-950"> Share</button>
</form>