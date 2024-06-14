<script>
    export let data;

    // Sort posts by createdAt property in descending order
    data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
</script>

<header class="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-extrabold text-white">Craftlab</h1>
        <a href="/add-post" class="bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Add Post</a>
    </div>
</header>

<div class="container mx-auto my-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.posts as post}
            <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-6">
                    <div class="text-lg font-bold mb-2">{post.username}</div>
                    <div class="text-gray-700 text-base">{post.content}</div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    header {
        background: linear-gradient(to right, #667eea, #764ba2);
    }
    h1 {
        font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    a {
        text-decoration: none;
    }
</style>
