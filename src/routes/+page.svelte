<script>
    export let data;
</script>
<header class="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
    <div class = "container mx-auto px-4 flex justify-between items-center">
        <h1 class=" text-white text-2xl font-bold font-['Comic_Sans_MS']">Metagram</h1>
        <a href="/add-post" class="bg-blue-500 py-2 px-4 font-bold rounded-lg text-white hover:bg-blue-700">Add Post</a>
    </div>
</header>
<div class="container mx-auto my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each data.posts as post }
        <div class="mx-3 bg-white rounded-lg shadow-md overflow-hidden">
            <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
            <div class="p-4">
                <div class="flex items-center mb-2">
                    <span class="font-semibold text-lg mr-2">{post.username}</span>
                </div>
                <p class="text-gray-800">{post.content}</p>
            </div>
        </div>
        {/each}
    </div>
</div>