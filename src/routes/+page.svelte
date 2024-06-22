<script>
    export let data;
</script>

<header class="bg-gradient-to-r from-indigo-500 to-purple-500 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-white hover:bg-gray-200 text-indigo-600 font-bold py-2 px-4 rounded shadow-lg transition duration-300">Add Post</a>
    </div>
</header>

<div class="container mx-auto my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.posts as post}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-6">
                    <div class="flex items-center mb-2">
                        <span class="font-bold text-xl text-indigo-700">{post.username}</span>
                    </div>
                    <div class="text-gray-800">
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    header {
        font-family: 'Comic Sans MS', sans-serif;
    }
    .container {
        max-width: 1200px;
    }
    .text-indigo-600 {
        color: #4c51bf;
    }
    .hover\:bg-gray-200:hover {
        background-color: #edf2f7;
    }
    .hover\:shadow-xl:hover {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    .rounded-lg {
        border-radius: 0.75rem;
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .p-6 {
        padding: 1.5rem;
    }
    .mb-2 {
        margin-bottom: 0.5rem;
    }
    .h-48 {
        height: 12rem;
    }
    .object-cover {
        object-fit: cover;
    }
    .gap-8 {
        gap: 2rem;
    }
    @media (max-width: 768px) {
        .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media (max-width: 1024px) {
        .lg\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>