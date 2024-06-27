<h1>Welcome to Summer Internship 2024</h1>
<script>
    export let data;
</script>

<header class="bg-red-600 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-red">Craftlab</h1>
        <a href="/add-post" class="bg-white hover:bg-green-800 text-red-600 font-bold py-2 px-4 rounded">+ Add post</a>
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