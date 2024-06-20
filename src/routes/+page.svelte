
<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="font-bold text-2xl font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post"><button class="bg-blue-500 hover:bg-blue-700 border-none px-4 py-2 font-medium text-white rounded">Add post</button></a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Post Template -->
         {#each data.posts as post}
         <div>
            <img src="data:image;base64,{post.image}" alt="Post">
            <div class="text-sm py-2">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
            </div>
         </div>   
         {/each}
                
    </div>
</div>