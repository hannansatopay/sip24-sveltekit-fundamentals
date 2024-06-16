<script>
  export let data;

  data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
</script>

<header
  class="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-md py-4 sticky top-0 z-10 text-white"
>
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a
      href="/add-post"
      class="px-3 py-2 rounded-md text-sm font-bold border-2 border-white"
      >Add Post</a
    >
  </div>
</header>

<div class="container mx-auto md:my-5">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post}
      <div>
        <img class="w-full" src="data:image;base64,{post.image}" alt="Posts" />
        <div class="text-sm ml-1 my-2">
          <span class="font-bold"> {post.username} - </span>
          <span class="text-gray-600"> {post.content} </span>
        </div>
      </div>
    {/each}
  </div>
</div>
