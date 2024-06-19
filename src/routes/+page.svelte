<script>
    export let data;
</script>

<header class="py-4 bg-gradient-to-r from-purple-800 to-orange-600 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="font-bold text-2xl font-['Lucida_Handwriting']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-700 rounded-3xl text-white hover:bg-blue-800 py-2 px-4 font-bold">Add Post</a>
    </div>
</header>
    
<div class="container mx-auto ">
    <div class=" p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full border rounded-lg" src="data:image;base64,{post.image}" alt="post">
                <div class="py-2 px-2">
                    <span class="font-bold" >{post.username}</span>
                    <span class="text-sm">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>