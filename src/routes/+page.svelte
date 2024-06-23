<script>
    export let data;

    function deletePost(index) {
        data.posts.splice(index, 1); // Remove post from data.posts array
        data = { ...data }; // Trigger Svelte reactivity by assigning a new object
    }
</script>

<header class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-4 shadow-md">
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
                        <button class="text-red-500 hover:text-red-700" on:click={() => deletePost(index)}>
                            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 18.75c4.553 0 8.25-3.697 8.25-8.25s-3.697-8.25-8.25-8.25-8.25 3.697-8.25 8.25 3.697 8.25 8.25 8.25zm1.768-11.418l-1.768 1.768-3.182-3.182-1.768 1.768 3.182 3.182-3.182 3.182 1.768 1.768 3.182-3.182 3.182 3.182 1.768-1.768-3.182-3.182 3.182-3.182-1.768-1.768z"/>
                            </svg>
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
