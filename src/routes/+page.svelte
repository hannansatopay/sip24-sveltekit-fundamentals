<script>
    export let data;

    async function likePost(postId) {
        const response = await fetch('/like-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
        });

        if (response.ok) {
            // Find the post in the data and update the likes count
            const post = data.posts.find(post => post.id === postId);
            if (post) {
                post.likes += 1;
            }
        } else {
            console.error('Failed to like post');
        }
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div class="border rounded-lg shadow-md overflow-hidden">
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-bold">{post.username}</span>
                        <button on:click={() => likePost(post.id)} class="text-red-500 hover:text-red-700">
                            <svg class="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.172 2.172a4 4 0 015.656 0L10 3.344l1.172-1.172a4 4 0 115.656 5.656L10 16.828 3.172 8.828a4 4 0 010-5.656z" />
                            </svg>
                            {post.likes}
                        </button>
                    </div>
                    <p class="text-gray-700">{post.content}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
