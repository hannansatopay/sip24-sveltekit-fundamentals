<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/add-post" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Add Post</a>
    </div>
</header>

<div class="container mx-auto my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
            <div class="p-4">
                <span class="text-sm font-bold block mb-1">{post.username}</span>
                <span class="text-gray-700 text-sm">{post.content}</span>
            </div>
        {/each}

        </div>
    </div>
