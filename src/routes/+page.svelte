<script>
    export let data;
  </script>
  
  <header class="bg-gray-600 py-6 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-4xl text-white font-bold font-['Perpetua']">Connectory</h1>
      <a href="/add-post" class="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Add Post</a>
    </div>
  </header>
  
  <div class="container mx-auto md:my-5 bg-gray-100">
    <div class="bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
      {#if data.posts}
        {#each data.posts as post}
          <div>
            <img class="w-full" src="data:image;base64,{post.image}" alt="Post" />
            <div class="text-sm py-2">
              <span class="font-bold text-sm">{post.username}</span>
              <span class="text-gray-700 text-sm">{post.caption}</span>
            </div>
          </div>
        {/each}
      {:else}
        <p class="text-gray-700 text-center">No posts available</p>
      {/if}
    </div>
  </div>

