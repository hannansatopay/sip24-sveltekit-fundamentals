<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between item-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <!-- svelte-ignore a11y-missing-content -->
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Post</a>
    </div>
</header>

<div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:my-5">
        <!-- Post Template -->
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
