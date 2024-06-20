<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let data;
    const posts = writable(data.posts);

    async function deletePost(id) {
        const response = await fetch('/api/delete-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            // Remove the deleted post from the posts array
            posts.update(currentPosts => currentPosts.filter(post => post.id !== id));
        } else {
            console.error('Failed to delete post');
        }
    }
</script>

<style>
    .post-container {
        display: flex;
        flex-direction: column;
        height: 300px;
    }

    .post-image {
        flex: 1;
        width: 100%;
        object-fit: cover;
    }

    .post-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
    }

    .text-container {
        flex: 1;
    }

    .delete-button {
        margin-left: 16px;
    }
</style>

<header class="bg-white shadow sticky top-0 z-10">
    <div class="container mx-auto p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">CraftLab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Post</a>
    </div>
</header>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each $posts as post (post.id)}
        <div class="bg-white shadow rounded post-container">
            <img src="data:image;base64,{post.image}" alt="POST" class="post-image">
            <div class="post-content">
                <div class="text-container">
                    <span class="block text-lg font-semibold">{post.username}</span>
                    <span class="block text-gray-600 mt-2">{post.content}</span>
                </div>
                <button
                    type="button"
                    class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 delete-button"
                    on:click={() => deletePost(post.id)}>
                    Delete
                </button>
            </div>
        </div>
        {/each}
    </div>
</div>
