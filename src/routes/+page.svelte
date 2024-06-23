<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['comic_sans_MS']">instagram</h1>
        <a href="/add-post" class="bg-violet-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Post</a>
    </div>
</header>
<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap 4">
        {#each data.posts as post}
        <div>
            <img class="w-full" src="data:image;base64,{post.image}" alt="post">
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Filter Preview</title>
</head>
<body>
    <input type="file" id="upload" accept="image/*">
    <canvas id="canvas"></canvas>
    <br>
    <button onclick="applyFilter('grayscale')">Grayscale</button>
    <button onclick="applyFilter('sepia')">Sepia</button>
    <button onclick="resetFilter()">Reset</button>

    <script src="script.js"></script>
</body>
</html>

            <div class="text-sm py-2 px-4">
                <span class="font-bold">{post.username}</span>
                <span class="text-blue-700">{post.content}</span>
            </div>
        </div>
        {/each}
    </div>
</div>



