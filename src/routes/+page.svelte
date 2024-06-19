<script>
    export let data;
</script>

<style>

</style>

<header class="bg-gray-900 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                <img class="w-full rounded-lg" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold text-white">{post.username}</span>
                    <span class="text-gray-400">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>
