<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">BLab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-2">ADD POST</a>
    </div>
</header>
<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts.slice().reverse() as post, index}
        <div>
            <img id="myImage-{index}" src="data:image;base64,{post.image}" alt="Sample">
            <br>
            <button class="bg-gray-500 hover:bg-gray-700 text-white rounded font-bold py-1 px-2" onclick="applyFilter({index}, 'grayscale')">Grayscale</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-1 px-2" onclick="applyFilter({index}, 'sepia')">Sepia</button>
            <button class="bg-green-500 hover:bg-green-700 text-white rounded font-bold py-1 px-2" onclick="applyFilter({index}, 'invert')">Inverted</button>
            <button class="bg-purple-500 hover:bg-purple-700 text-white rounded font-bold py-1 px-2" onclick="applyFilter({index}, 'blur')">Blur</button>
            <button class="bg-red-500 hover:bg-red-700 text-white rounded font-bold py-1 px-2" onclick="applyFilter({index}, 'original')">Original</button>

            <script>
                function applyFilter(index, filterType) {
                    const image = document.getElementById('myImage-' + index);
                    if (filterType === 'grayscale') {
                        image.style.filter = 'grayscale(100%)';
                    } else if (filterType === 'sepia') {
                        image.style.filter = 'sepia(100%)';
                    } else if (filterType === 'invert') {
                        image.style.filter = 'invert(100%)';
                    } else if (filterType === 'blur') {
                        image.style.filter = 'blur(5px)';
                    } else if (filterType === 'original') {
                        image.style.filter = '';
                    }
                }
            </script>
           
        </div>
        {/each}
    </div>
</div>
