<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-99">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <a href="/add-post" class="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 ">Add Post</a>
    </div>
    
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Post Template -->
        {#each data.post as post}
        <div>
            <img src="data:image;base64,{post.image}" alt="" class="w-full">
            <div class="text-sm py-2   ">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
            </div>
        </div>
       {/each}


    </div>
</div>