<script>
  export let data;
</script>

<header class="bg-blue-700 py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
   <h1 class="text-3xl bg-blue-700 text-white font-bold font-['Comic_Sans_Ms']">SnapHub</h1>
   <a href="/add-post" type="submit" class="text-white text-blue hover:bg-blue-500 font-bold rounded-lg text-m px-4 py-2">+ Add Post</a>
 
  </div>
 </header>
 
 <div class = "container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-4">
   {#each data.posts as post}
   <div>
    <img class="w-full" src = "data:image;base64,{post.image}" alt="Post">
    <div class="text-sm py-2">
     <span class="font-bold">{post.username}</span>
     <span class="text-gray-700 text-sm">{post.content}</span>
    </div>
   </div>
   {/each}
  </div>
 </div>
 
