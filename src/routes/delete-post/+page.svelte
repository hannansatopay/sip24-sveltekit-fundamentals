<script>
    export let data;

    function deletePost(index) {
        data.posts.splice(index, 1);
        data = { ...data };
    }
</script>

<header class="py-4">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1>Craftlab</h1>
        <a href="/add-post" class="text-white font-bold py-2 px-4 rounded"
            >Add Post</a
        >
    </div>
</header>

<div class="container mx-auto my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each data.posts as post, index}
            <div class="post">
                <img src="data:image;base64,{post.image}" alt="Post" />
                <div class="post-content">
                    <span class="username">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
                <button
                    class="delete-button text-white font-bold py-1 px-2 rounded w-full"
                    on:click={() => deletePost(index)}
                >
                    Delete Post
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    header {
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 10;
    }

    header h1 {
        font-family: "Comic Sans MS", sans-serif;
        font-size: 1.5rem;
    }

    header a {
        background-color: #007bff;
        transition: background-color 0.3s ease;
    }

    header a:hover {
        background-color: #0056b3;
    }

    .post {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        width: 100%;
        max-width: 300px;
        margin: auto;
    }

    .post:hover {
        transform: translateY(-5px);
    }

    .post img {
        width: 100%;
        height: auto;
        display: block;
    }

    .post-content {
        padding: 10px;
    }

    .post-content span {
        display: block;
        margin-bottom: 5px;
    }

    .post-content .username {
        font-weight: bold;
    }

    .delete-button {
        background-color: #dc3545;
        transition: background-color 0.3s ease;
    }

    .delete-button:hover {
        background-color: #c82333;
    }
</style>
