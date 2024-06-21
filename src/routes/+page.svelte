<script>
    export let data;
    
    
</script>
<header class="sticky top-0 z-10 py-4 bg-white shadow-md">
    <div class="container flex items-center justify-between px-4 mx-auto ">
        <h1 class="text-2xl font-bold" style="font-family:Verdana, Geneva, Tahoma, sans-serif;">CraftLab</h1>
        <a href="/addpost"><button type="button" class="px-3 py-2 text-sm font-bold text-center text-white rounded-lg bg-gradient-to-r from-blue-200 via-blue-400 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-600 ">Add Post</button></a>
    </div>
</header>

<div class="container mx-auto md:my-5 ">
    <div class="grid gap-4 gir-cols-1 md:grid-cols-3">
        {#each data.posts as post}
            <div>
                <img src="data:image;base64,{post.image}" alt="Post" class="w-full">
                <div class="py-2 text-sm">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each} 
      

    </div>
</div>
