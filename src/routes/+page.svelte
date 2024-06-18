<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-700">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Add Post</a>
    </div>
</header>

<div class="container mx-auto my-5 ">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {#each data.posts as post}
        <div class="bg-white p-4 rounded-lg shadow-md border-blue-200 border-2 mx-4 md:mx-5">
            <div>
                <img class="w-full h-full object-cover rounded-md mb-4" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm">
                    <h3 class="font-bold text-blue-700 text-xl">{post.username}</h3>
                    <p class="text-gray-700">{post.content}</p>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>
