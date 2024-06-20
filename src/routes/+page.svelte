<script>
  export let data;
</script>

<header class="bg-gray-200 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-3xl font-['Comic_sans_MS'] text-black">INSTACLONE</h1>
    <a
      href="/addpost"
      class="bg-blue-500 active:bg-blue-700 hover:bg-white hover:text-blue-500 active:text-white text-white font-mono py-2 px-4 rounded-lg transition duration-200"
      >New Post</a
    >
  </div>
</header>
<div class="container mx-auto my-5 px-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Post Template -->
    {#each [...data.posts].reverse() as post}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img class="w-full h-64 object-contain" src="data:image;base64,{post.image}" alt="post" />
        <div class="p-4">
          <div class="flex items-center mb-2">
            <span class="font-bold text-black mr-2">{post.username}</span>
            {#if post.timestamp}
              <span class="text-gray-600 text-sm">{new Date(post.timestamp).toLocaleString()}</span>
            {/if}
          </div>
          <p class="text-gray-700">{post.content}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  
</style>
