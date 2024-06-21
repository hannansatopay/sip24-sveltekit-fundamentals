<script>
    export let data
</script>
<header class="py-4 bg-white shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between ">
        <h1 class="font-bold text-2xl  font-['Comic_Sans_MS']">
           Craftlab
        </h1>
        <a href="\add-post" class=" bg-blue-500 text-white font-bold px-4 py-2 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>