<!-- src/routes/+page.svelte -->

<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#if data && data.posts && data.posts.length > 0}
            {#each data.posts as post (post.id)}
                <div class="bg-white rounded shadow-md p-4">
                    <img class="w-full" src={`data:image;base64,${post.image}`} alt="Post">
                    <div class="text-sm py-2">
                        <span class="font-bold">{post.username}</span>
                        <span class="text-gray-700">{post.content}</span>
                    </div>
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
