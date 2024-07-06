<script>
    export let data;
</script>
<header class="bg-white py-5 shadow-xl sticky top -0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-center text-2xl font-bold font-['courier']">Flexigram</h1>
        <a href= "/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class ="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="w-full h-64 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold ">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
         {/each}
    </div>
</div>