<script>
    let files = null;
</script>

<header class="bg-gradient-to-r from-blue-500 to-purple-500 py-4 shadow-lg sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-white text-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg transition-colors">Home</a>
    </div>
</header>

<form class="container mx-auto p-8 mt-6 bg-white shadow-md rounded-lg" method="POST" enctype="multipart/form-data">
    <div class="flex items-center justify-center w-full mb-6">
        <label for="dropzone" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                {#if files && files.length}
                    <p class="mb-2 text-sm text-gray-700">{files[0].name}</p>
                {:else}
                    <svg class="w-12 h-12 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-700"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                {/if}
            </div>
            <input bind:files name="image" id="dropzone" type="file" class="hidden" />
        </label>
    </div>     
    <div class="mb-4">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500" />
    </div>
    <div class="mb-4">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">Share</button>
</form>

<style>
    header {
        background-color: rgb(50, 4, 70);
    }
    .bg-light-gray {
        background-color: rgb(240, 240, 240);
    }
    .bg-dark-gray {
        background-color: rgb(219, 219, 219);
    }
</style>
