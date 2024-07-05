<script>
    export let data;
</script>
<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto">
        <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-gray-800 pr-4">InstaPost</a>
                <a href="/add-post" class="bg-blue-500 text-white p-1 rounded font-semibold text-sm mr-2 hover:bg-blue-600">Add Post</a>            
        </div>
    </div>
</header>
<div class="container mx-auto md:py-2">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Post Template -->
         {#each data.posts as post}
         <div>
            <img class="w-full"  src="data:image;base64,{post.image}" alt="Post">
            <div class="text-sm py-2">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
             </div>
         </div>
         {/each}
    </div>
</div>