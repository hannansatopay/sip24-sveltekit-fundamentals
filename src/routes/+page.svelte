<script>
    export let data;
</script>

<header class="bg-gradient-to-r from-blue-500 to-purple-600 py-6 shadow-lg sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-extrabold text-white tracking-wide">SocialIn</h1>
        <a href="/add-post" class="bg-white text-blue-600 hover:bg-blue-100 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            Add Post
        </a>
    </div>
</header>

<div class="container mx-auto my-8 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.posts as post}
        <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <img class="w-full h-64 object-cover" src="data:image;base64,{post.image}" alt="post">
            <div class="p-4">
                <p class="font-bold text-lg mb-2">{post.username}</p>
                <p class="text-gray-700 text-base">{post.content}</p>
            </div>
        </div>
        {/each}
    </div>
</div>