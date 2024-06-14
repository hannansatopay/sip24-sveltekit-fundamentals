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

<div
  class="container max-w-[425px] items-center mx-auto my-5 bg-gray-200 grid grid-cols-1 gap-2 divide-y divide-black"
>
  <div class="grid grid-cols-1 divide-y divide-blue-500">
    {#each data.posts as post}
      <div>
        <p class="px-2 text-sm font-mono">{post.username}</p>
        <img src="data:image;base64,{post.image}" alt="Post" class="w-full" />
        <span class="grid grid-cols-[60px_60px_auto] gap-2 px-2">
          <button
            class="bg-blue-500 px-2 py-1 my-1 text-sm font-mono rounded-lg hover:scale-105 hover:shadow-sm hover:shadow-black text-white font-bold max-w-16"
            >Up</button
          >
          <button
            class="bg-red-500 px-2 py-1 my-1 text-sm font-mono rounded-lg hover:scale-105 hover:shadow-sm hover:shadow-black text-white font-bold max-w-16"
            >Down</button
          >
          <span class="py-1 text-sm font-mono">{post.content}</span>
        </span>
      </div>
      <div class="divide-y divide-blue-500"></div>
    {/each}
  </div>
</div>
