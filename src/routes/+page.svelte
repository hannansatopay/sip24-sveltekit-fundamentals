<script>
  export let data;
</script>
<header class ="bg-[#FFD700] py-4 px-1 shadow-md sticky top-0 z-10">
<div class="container mx-auto px-4 flex justify-between items-centre ">
<h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
<a href="/add post" class="bg-[#8B4513] text-white py-2 px-3 rounded-lg hover:bg-[#A0522D]">Add post</a>
</div>
</header>

<div class="container mx-auto">
 <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {#each data.posts as post}
    <div>
        <img class ="w-full" src="data:image;base64,{post.image}" alt="post">
      <div class ="text-sm py-2">
        <span class="font-bold">{post.username}
        </span>
        <span class="text-blue-900">{post.content}</span>
    </div>

      </div>
        {/each}

      
 </div>


</div>