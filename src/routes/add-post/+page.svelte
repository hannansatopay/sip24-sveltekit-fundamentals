<script>
    let files = null;
    let selectedFilter = 'original';

    const filters = {
        original: '',
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        ludwig: 'brightness(110%) contrast(90%) saturate(110%)',
        clarendon: 'contrast(120%) saturate(120%)'
    };

    $: console.log(files);
</script>

<style>
     body {
        background-color:#0C0908 ; /* Change this to the color you want */
    }
    html, body {
        height: 100%;
        margin: 0;
    }

    body {
        display: flex;
        flex-direction: column;
    }
</style>
<body class="h-page">
    <header class="bg-purple-500 py-4 sticky top-0 z-10"  style="box-shadow:  0 4px 8px rgba(211, 211, 211, 0.7);">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-5xl text-white font-bold font-['yourFont']" >Cozy Corner</h1>
            <a href="/" class="bg-black hover:bg-violet-800 text-white font-['yourFont'] py-2 px-4 rounded-lg border border-purple-900">Home</a>
        </div>
    </header>
    
    <form class="container my-2 mx-auto p-5 font-['yourFont']" method="POST" enctype="multipart/form-data" action="/add-post">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-black border-dashed rounded-lg cursor-pointer bg-purple-300">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                    <img class="w-full h-auto" src={URL.createObjectURL(files[0])} alt="Selected image" style="filter: {filters[selectedFilter]}; max-height: 200px;">
                    <p class="text-sm text-gray-900 font-semibold mt-2">{files[0].name}</p>
                {:else}
                    <svg class="w-8 h-8 mb-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="text-sm text-gray-800 font-semibold">Click to upload</p>
                    {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
    </label>
    
    {#if files && files.length}
        <div class="flex justify-center mb-4">
            <button type="button" class="mx-2 py-2 px-4 text-white bg-black hover:bg-gray-800 border border-gray-200 rounded" on:click={() => selectedFilter = 'original'}>Original</button>
            <button type="button" class="mx-2 py-2 px-4 text-white bg-black hover:bg-gray-800 border border-gray-200 rounded" on:click={() => selectedFilter = 'grayscale'}>Grayscale</button>
            <button type="button" class="mx-2 py-2 px-4 text-white bg-black hover:bg-gray-800 border border-gray-200 rounded" on:click={() => selectedFilter = 'sepia'}>Sepia</button>
            <button type="button" class="mx-2 py-2 px-4 text-white bg-black hover:bg-gray-800 border border-gray-200 rounded" on:click={() => selectedFilter = 'ludwig'}>Ludwig</button>
            <button type="button" class="mx-2 py-2 px-4 text-white bg-black hover:bg-gray-800 border border-gray-200 rounded" on:click={() => selectedFilter = 'clarendon'}>Clarendon</button>
        </div>
    {/if}

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
        <input name="username" id="username" type="text" class="bg-purple-300 border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-white">Content</label>
        <textarea name="content" id="content" class="bg-purple-300 border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
    </div>
    <input type="hidden" name="filter" value={selectedFilter} />
    <button type="submit" class="text-white text-2xl mt-5 bg-purple-500 hover:bg-purple-700 font-medium font-['yourFont'] rounded-lg px-5 py-2.5 border border-purple-900">Share</button>
</form>
</body>