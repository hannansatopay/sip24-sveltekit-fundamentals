<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-['Segoe_Print'] font-bold">Craftlab</h1>
        <a href="/add-post" class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full border-b border-b-gray-800 border-t border-t-gray-800" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold pl-1 my-1">@{post.username}</span>
                    <span><br></span>
                    <span class="text-gray-700 pl-1 my-1 ">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

