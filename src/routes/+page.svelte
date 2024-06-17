<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
<div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaClone</h1>
    <a href="/add-post" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Add Post</a>
</div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cools-3 gap-4">
        {#each data.posts as post}
        <div>
            <!-- <img class="w-full" src="https://picsum.photos/600" alt="Post"> -->
            <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
            <div class="text-sm py-2">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
            </div>
         </div>
        {/each}   
    </div>
</div>
