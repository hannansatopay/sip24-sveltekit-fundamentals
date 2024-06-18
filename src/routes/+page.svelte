<script>
export let data;
</script>
<header class="shadow-md shadow-gray-600 sticky z-100 top-0 bg-white">
  <div class="flex flex-row justify-between items-center py-2 px-3 font-mono">
    <p class="text-2xl font-bold">Craftlab</p>
    <a
      href="/addPost"
      class="bg-blue-500 px-2 py-1 rounded-lg text-white font-bold">Post</a
    >
  </div>
</header>

<div class="container mx-auto md:my-5">
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
{#each data.posts as post}
<div>
<img class="w-full" src="data:image;base64,{post.image}" alt="post">
<div class="text-sm py-2">
<span class="font-bold">{post.username}</span>
<span class="text-gray-700">{post.content}</span>
</div>
</div>
{/each}
</div>
</div>

