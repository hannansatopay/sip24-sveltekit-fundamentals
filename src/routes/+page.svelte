<script>
    export let data; //now the data has become dynamic
</script>

<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between itens-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">SwiftKart</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700     rounded text-white p-2 font-bold">Add Post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Post Template -->
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-1">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
         {/each}

    </div>
</div>
