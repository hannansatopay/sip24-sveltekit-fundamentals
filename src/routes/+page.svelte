<script>
    export let data;
    function deletePost(index) {
        data.posts.splice(index, 1); // Remove post from data.posts array
        data = { ...data }; // Trigger Svelte reactivity by assigning a new object
    }
</script>

<header class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-4 shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-comic-sans">CraftLab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-2 px-4">ADD POST</a>
    </div>
</header>

<div class="container mx-auto my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.posts as post, index}
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="aspect-w-16 aspect-h-9">
                    <img class="object-cover w-full h-full" src="data:image;base64,{post.image}" alt="post">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-center pb-2">
                        <span class="font-bold text-lg text-gray-800">{post.username}</span>
                        <button class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 hover:text-white" on:click={() => deletePost(index)}>
                            Delete
                        </button>
                    </div>
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
</style>