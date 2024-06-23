<script>
    export let data;
</script>
<header class="text-white py-4 shadow-md sticky top-0 z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold  font-['Comic_Sans_MS']">CraftLab - Insta Clone</h1>
        <a href="/add-post" class="bg-indigo-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-3">
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold rounded-r py-1.5 px-1">{post.username}</span>  
                    <span class="text-pink-700"> - {post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>