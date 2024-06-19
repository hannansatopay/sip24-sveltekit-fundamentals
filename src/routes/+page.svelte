<script>
    export let data;
</script>

<header class="bg-white py-6 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center relative">
        <h1 class="text-3xl font-bold font-serif text-blue-500">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Add post</a>
    </div>
</header>

<div class="container mx-auto my-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.posts as post}
            <div class="border rounded-lg overflow-hidden shadow-lg bg-white">
                <img class="w-full h-64 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <span class="block font-bold text-sm">{post.username}</span>
                    <span class="block text-gray-700 text-sm mt-1">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    /* Global styles */
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #fafafa;
        color: #333;
        margin: 0;
        padding: 0;
    }

    /* Header styles */
    header {
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 960px;
        margin: 0 auto;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        font-family: 'Comic Sans MS', cursive;
    }

    .add-post-btn {
        background-color: #3897f0;
        color: #ffffff;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 999px;
        font-weight: bold;
        text-decoration: none;
        transition: background-color 0.3s;
    }

    .add-post-btn:hover {
        background-color: #2680c2;
    }

    /* Main content */
    .container {
        max-width: 960px;
        margin: 1rem auto;
        padding: 0 1rem;
    }

    .post-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .post-card {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
    }

    .post-image {
        width: 100%;
        height: 280px;
        object-fit: cover;
    }

    .post-content {
        padding: 1rem;
    }

    .post-username {
        font-weight: bold;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .post-text {
        font-size: 0.9rem;
        color: #555;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .post-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .post-image {
            height: 200px;
        }
    }
</style>
