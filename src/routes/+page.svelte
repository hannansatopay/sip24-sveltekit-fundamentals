<script>
    export let data;
</script>

<header class="bg-white shadow-md py-4 sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">CRAFTLAB</h1>
        <a href="/add-post" class="bg-violet-600 hover:bg-violet-500 font-bold text-white px-4 py-2 rounded">+ Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full" src={`data:image;base64,${post.image}`} alt="post">
                <div class="text-sm py-2">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-800">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>
