<script>
    export let data;
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
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <div class="text-sm py-2">
                        <span class="font-bold block">{post.username}</span>
                        <span class="text-gray-700 block">{post.content}</span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .bg-white {
        background-color: white;
    }

    .shadow-md {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .sticky {
        position: sticky;
    }

    .top-0 {
        top: 0;
    }

    .z-10 {
        z-index: 10;
    }

    .py-4 {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .px-4 {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .container {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .font-bold {
        font-weight: bold;
    }

    .hover\:bg-blue-700:hover {
        background-color: #2b6cb0;
    }

    .bg-blue-500 {
        background-color: #4299e1;
    }

    .text-white {
        color: white;
    }

    .rounded {
        border-radius: 0.25rem;
    }

    .rounded-lg {
        border-radius: 0.5rem;
    }

    .overflow-hidden {
        overflow: hidden;
    }

    .w-full {
        width: 100%;
    }

    .text-gray-700 {
        color: #4a5568;
    }

    .md\:my-5 {
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
    }

    .grid {
        display: grid;
    }

    .grid-cols-1 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .md\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .gap-4 {
        gap: 1rem;
    }

    .p-4 {
        padding: 1rem;
    }
</style>
