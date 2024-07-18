<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-100">
    <div class="container p-4 flex justify-between items-center">
        <h1 class="text-2xl font-['Arial'] font-bold">
            craftLab
        </h1>
        <a href="/add-post" class="bg-blue-500 rounded px-3 py-2"> + create post </a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 my-2 md:grid-cols-3 gap-4">
        {#each data.posts as post}
        <!-- post template -->
        <div>
            <img class="w-full" src="data:image;base64,{post.image}" alt='post'>
            <div class="text-sm py-2">
                <span class="font-bold">{post.username}</span>
                <span>{post.content}</span>
            </div>
        </div>
        {/each}
    </div>
</div>