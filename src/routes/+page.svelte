<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-8 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container ms-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
        <div>
            <img src="data:image;base64,{post.image}" alt="Post" class="w-full">
            <div class="text-sm py ">
                <span Class="font-bold">{post.username}</span>
                <span Class="text-gray-700">{post.content}</span>

            </div>
        </div>
        {/each}  
    </div>
</div>












