<script>
    export let data;
    data.posts.forEach(post => {
    post.liked = false;
});
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Instagram</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts.slice().reverse() as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="flex py-2">
                    <button 
                        class="cursor-pointer focus:outline-none"
                        on:click={() => post.liked = !post.liked}
                        on:keydown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                post.liked = !post.liked;
                            }
                        }}
                        aria-label="{post.liked ? 'Unlike' : 'Like'}"
                    >
                        {#if post.liked}
                            <i class="fas fa-heart text-red-500"></i>
                        {:else}
                            <i class="far fa-heart"></i>
                        {/if}
                    </button>
                    <span style="margin-left: 8px;"><i class="far fa-comment"></i></span>
                    <span style="margin-left: 8px;"><i class="far fa-paper-plane"></i></span>
                    <span style="margin-left: 250px;"><i class="far fa-bookmark"></i></span>
                </div>
                <div class="text-sm py-1">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            
            </div>
        {/each}
    </div>
</div>


