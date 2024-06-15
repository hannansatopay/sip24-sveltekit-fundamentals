<!-- src/routes/+page.svelte -->

<script>
    export let data;
</script>

<style>
    :global(body) {
        background: linear-gradient(135deg, #f3e7e9, #e3eeff); 
        font-family: 'Comic Sans MS', sans-serif; 
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    header {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px); 
    }
    .post-card {
        background: rgba(255, 255, 255, 0.8); 
        backdrop-filter: blur(5px); 
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
<<<<<<< Updated upstream
        <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
=======
        <h1 class="text-2xl font-bold text-grey-600">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Add post</a>
>>>>>>> Stashed changes
    </div>
</header>

<div class="container mx-auto md:my-5">
<<<<<<< Updated upstream
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#if data && data.posts && data.posts.length > 0}
            {#each data.posts as post (post.id)}
                <div class="bg-white rounded shadow-md p-4">
                    <img class="w-full" src={`data:image;base64,${post.image}`} alt="Post">
                    <div class="text-sm py-2">
                        <span class="font-bold">{post.username}</span>
                        <span class="text-gray-700">{post.content}</span>
                    </div>
=======
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.posts as post}
            <div class="post-card rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <div class="flex items-center mb-2">
                        <span class="font-bold text-grey-600">{post.username}</span>
                    </div>
                    <p class="text-gray-700 text-sm">{post.content}</p>
>>>>>>> Stashed changes
                </div>
            {/each}
        {:else}
            <p>No posts available.</p>
        {/if}
    </div>
</div>

<style>
    .font-comic-sans {
        font-family: 'Comic Sans MS', cursive;
    }
</style>
