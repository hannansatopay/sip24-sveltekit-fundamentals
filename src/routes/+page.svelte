<script>
    export let data;
</script>

<header class="bg-gradient-to-r from-purple-500 to-orange-500 py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-comic-sans text-white">Instagram Clone</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5 bg-gray-100 py-8 px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        {#each data.posts as post}

        <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
            <div class="p-4">
                <span class="block font-semibold text-gray-800">{post.username}</span>
                <p class="text-gray-700">{post.content}</p>
            </div>
        </div>

        {/each}

    </div>
</div>

<style>
    .font-comic-sans {
        font-family: 'Comic Sans MS', cursive;
    }

    .bg-gray-100 {
        background-color: #f0f4f8;
    }
</style>
