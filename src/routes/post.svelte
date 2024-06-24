<script>
    import { onMount } from 'svelte';

    let data = { posts: [] };
    let username = '';
    let content = '';
    let image = null;

    // Fetch initial data from the server
    async function fetchData() {
        const res = await fetch('/api/posts');
        data = await res.json();
    }

    // Function to handle form submission
    async function addPost() {
        const newPost = {
            username,
            content,
            image: image ? await toBase64(image) : null
        };

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        const result = await res.json();
        if (result.success) {
            // Update the local data with the new posts list
            data.posts = result.posts;
        }

        // Clear the form fields
        username = '';
        content = '';
        image = null;
    }

    // Convert image file to base64
    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    // Delete a post
    function deletePost(index) {
        data.posts.splice(index, 1);
        data = { ...data };
    }

    // Fetch data on component mount
    onMount(fetchData);
</script>

<header class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-4 shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-comic-sans">CraftLab</h1>
    </div>
</header>

<div class="container mx-auto my-8">
    <!-- Form to add new posts -->
    <div class="mb-8">
        <form on:submit|preventDefault={addPost} class="space-y-4">
            <div>
                <label class="block text-gray-700">Username</label>
                <input type="text" bind:value={username} class="w-full px-4 py-2 border rounded" required />
            </div>
            <div>
                <label class="block text-gray-700">Content</label>
                <textarea bind:value={content} class="w-full px-4 py-2 border rounded" required></textarea>
            </div>
            <div>
                <label class="block text-gray-700">Image</label>
                <input type="file" accept="image/*" on:change={(e) => image = e.target.files[0]} class="w-full px-4 py-2 border rounded" />
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-2 px-4">Add Post</button>
        </form>
    </div>

    <!-- Display posts -->
    {#if data && data.posts.length}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each data.posts as post, index}
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="aspect-w-16 aspect-h-9">
                        <img class="object-cover w-full h-full" src={post.image ? `data:image;base64,${post.image}` : 'https://via.placeholder.com/200x300'} alt="post">
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-center pb-2">
                            <span class="font-bold text-lg text-gray-800">{post.username}</span>
                            <button class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700" on:click={() => deletePost(index)}>Delete</button>
                        </div>
                        <p class="text-gray-700">{post.content}</p>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-gray-700">No posts available.</p>
    {/if}
</div>

<style>
    .font-comic-sans {
        font-family: 'Comic Sans MS', cursive;
    }
</style>
