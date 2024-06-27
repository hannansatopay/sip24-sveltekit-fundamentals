<script>
    export let data;

    const deletePost = async (postId) => {
        try {
            // Send delete request to the server
            const response = await fetch('/delete-post', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: postId })
            });

            if (!response.ok) {
                throw new Error('Failed to delete the post');
            }

            const result = await response.json();
            if (result.success) {
                // Remove the post from the local state
                data.posts = data.posts.filter(post => post.id !== postId);
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
</script>

<style>
    .border-wrapper {
        border: 5px solid lightblue;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #f0f4f8;
    }

    header {
        background-color: #e2e8f0;
    }

    h1 {
        color: #2b6cb0;
    }

    .add-post-btn {
        background-color: #63b3ed;
        transition: background-color 0.3s;
    }

    .add-post-btn:hover {
        background-color: #4299e1;
    }

    .post-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
        position: relative;
    }

    .post-card:hover {
        transform: translateY(-5px);
    }

    .post-username {
        color: #2d3748;
    }

    .post-content {
        color: #4a5568;
    }

    .delete-btn {
        background-color: #e53e3e;
        color: white;
        padding: 0.20rem 0.5rem;
        border-radius: 0.25rem;
        position: absolute;
        top: 0.80rem;
        right: 1.0rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .delete-btn:hover {
        background-color: #c53030;
    }
</style>

<div class="border-wrapper">
    <header class="shadow sticky top-0 py-3">
        <div class="container mx-auto flex px-4 justify-between items-center">
            <h1 class="font-serif text-3xl font-bold">InstaApp</h1>
            <a href="add-post" class="add-post-btn text-white rounded-lg px-4 py-2">Add Post</a>
        </div>
    </header>

    <div class="container mx-auto my-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {#each data.posts as post (post.id)}
                <div class="post-card p-4">
                    <span class="post-username text-xl font-bold">{post.username}</span>
                    <img class="mt-2 w-full rounded-md" src="data:image;base64,{post.image}" alt="{post.content}">
                    <div class="text-sm py-2">
                        <span class="post-username font-bold">{post.username}</span>
                        <span class="post-content text-gray-700">{post.content}</span>
                    </div>
                    <button class="delete-btn" on:click={() => deletePost(post.id)}>Delete</button>
                </div>
            {/each}
        </div>
    </div>
</div>
