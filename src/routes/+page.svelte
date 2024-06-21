<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10 background">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-4 mt-2  " >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {#each data.posts as post}
        <div class="overflow-hidden border rounded-lg  ">
            <div class="w-full h-64 overflow-hidden">
                <img class="w-full h-full object-cover " src="data:image;base64,{post.image}" alt="Post">
            </div>
            <div class="text-sm py-2 px-4 bg-white">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-900">{post.content}</span>
                <span class="text-gray-800 block font-bold">{post.createdAt}</span>
            </div>
        </div>
        {/each}
    </div>
</div>
