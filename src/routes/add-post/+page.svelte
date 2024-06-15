<script>
    let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container1 mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-black font-color--black font-['Comic_Sans_MS'] ">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>



<form class="container1 mx-auto p-5" method="POST" enctype="multipart/form-data">
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" >Share</button>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-white-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-white-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

    <label for="image" class="sr-only">Upload an image</label>
    <input  type="file" accept="image/png, image/jpg, image/jpeg" name="image" id="image">
</form>
    <div class="container">
        <canvas></canvas>
        </div>
     
    <h1>
        Apply filters to your images
    </h1>
    <div class="buttons">
        <div class="filters">
            <button id="grayscale" onclick="applyFilter('grayscale')">Grayscale</button>
            <button id="monotone" onclick="applyFilter('monotone')">Blue Monotone</button>
            <button id="duotone" onclick="applyFilter('duotone')">Orange Blue</button>
        </div>
        <div class="actions">
            <button id="reset" onclick="resetFilter()">Reset</button>
          
            <a id="download" download>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download</span>
            </a>
           
        </div>
    </div>
   


<main>
    <link rel="stylesheet" href="./src/index.css">
    <script src="./src/index.js"></script>
</main>







  