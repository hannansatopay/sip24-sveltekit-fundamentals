<script>
    export let data;
</script>

<header class=" py-2 bg-green-100 shadow-md sticky top-0 z-5">
    <div class="text-2xl font-bold font-[calibri] scontainer px-3 py-5">
        Craftlab
        <a href="/add-post" class="py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 rounded">Add post</a>
    </div>
</header>

<div class="mx-auto container my-4">
   <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    {#each data.posts as post}
    <div>
        <img class="w-full" src="data:image;base64,{post.image}" alt="Photo content">
        <div>
            <span class="font-bold">{post.username}</span>
            <span class=".font-serif text-lg font-bold text-orange-500">{post.content}</span> 
        </div>
    </div>
        {/each}
   </div> 
</div>
