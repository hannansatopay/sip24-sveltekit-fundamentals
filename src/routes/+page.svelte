<script>
  export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-20">
  <div class="conatiner mx-auto px-4 flex items-center justify-between">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaTon</h1>
    <a
      href="/add-post"
      class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500"
      >Add Post</a
    >
  </div>
</header>

<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post}
      <!-- Post Template -->
      <div class="bg-white shadow-md p-3">
        <div class="flex items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Post"
            class="w-10 h-10 rounded-full"
          />
          <div class="ml-4">
            <h2 class="text-lg font-bold">{post.username}</h2>
          </div>
        </div>
        <div class="mt-4">
          <img
            src="data:image;base64,{post.Image}"
            alt="Post"
            class="w-full aspect-square object-cover rounded-md"
          />
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            <span class="font-bold mr-2 text-gray-700">{post.username}</span>
            {post.caption}
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>
