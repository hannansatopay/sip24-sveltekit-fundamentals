<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="Container mx-auto px-4 flex justify-between items-center">
        <h1 class="px-6 text-2xl font-bold font-['Comic_Sans_MS']">CraftLab </h1>
        <a href="/add-post" class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-900"> + Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image:base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold text-sm">{post.username}  </span>
                    <span class="text-gray-700 text-sm">{post.content}</span>
                </div>
            </div>
        {/each}
        
    </div>

</div>



