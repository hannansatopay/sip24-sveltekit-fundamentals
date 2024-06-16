<script>
    export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Instagram Clone</h1>
    <a href="/add-post" class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-5 ml-4 rounded">Add Post</a>
  </div>
</header>

<div class="container md:my-5 mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Post Template-->
    {#each data.posts as post}
      <div>
        {#if post.image}
          <img class="w-full mt-2" src={post.image} alt={post.content}  />
        {/if}
        <div class="text-sm py-4">
          <span class="font-bold text-sm">{post.username}</span>
          <span class="text-gray-700">{post.content}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
