<script>
    export let data;
</script>

<header class="bg-gradient-to-r from-blue-500 to-purple-500 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-white text-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg transition-colors">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each data.posts as post}
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <div class="text-lg font-bold mb-2">{post.username}</div>
                    <p class="text-gray-700 text-sm">{post.content}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

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
    .container {
        max-width: 1200px;
        margin: auto;
    }
</style>
