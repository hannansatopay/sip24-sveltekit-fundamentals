<script>
    import { onMount } from "svelte";
    let posts = [];

    onMount(async () => {
        const response = await fetch("/api/posts");
        posts = await response.json();
    });
</script>
<header class="bg-gray-800 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a
            href="/add-post"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Add Post</a
        >
    </div>
</header>
<div class="container mx-auto py-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each posts as post}
            <div class="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <img
                    class="w-full"
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Post"
                />
                <div class="p-4">
                    <div class="text-white text-lg font-bold">{post.username}</div>
                    <div class="text-gray-300">{post.content}</div>
                </div>
            </div>
        {/each}
    </div>
</div>
