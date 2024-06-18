<script>
  export let data;
</script>

<style>
  @media (min-width: 640px) {
      .container {
          max-width: 640px;
      }
  }

  @media (min-width: 768px) {
      .container {
          max-width: 768px;
      }
  }

  @media (min-width: 1024px) {
      .container {
          max-width: 1024px;
      }
  }
</style>

<header class="shadow-gray-600 bg-white py-4 shadow-md sticky top-0 z-100">
  <div class="flex-row container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
      <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
  </div>
</header>

<div class="container mx-auto md:my-5 w-full items-center bg-gray-200 grid grid-cols-1 gap-2 divide-y border border-black rounded-lg">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y divide-blue-500">
      {#each data.posts as post, id}
          <div class="p-2">
              <img class="w-full" src="data:image;base64,{post.image}" alt="Post" id="{id}">
              <div class="text-sm py-2">
                  <span class="font-bold py-1">{post.username}</span>
                  <span class="text-gray-700">{post.content}</span>
              </div>
          </div>
      {/each}
  </div>
</div>
