<script>
    export let data;
</script>

<style>
    .card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .card img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .card-content {
        padding: 16px;
    }
    .card-content .username {
        font-weight: bold;
    }
    .card-content .content {
        color: #4a4a4a;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div class="card">
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="card-content">
                    <div class="username">{post.username}</div>
                    <div class="content">{post.content}</div>
                </div>
            </div>
        {/each}
    </div>
</div>
