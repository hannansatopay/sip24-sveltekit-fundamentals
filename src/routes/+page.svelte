<!-- <h1>Welcome to Summer Internship 2024</h1> -->
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
    class="container max-w-[425px] items-center mx-auto my-5 bg-gray-200 grid grid-cols-1 gap-2 divide-y border border-black rounded-lg"
  >
    <div class="grid grid-cols-1 divide-y divide-blue-500">
      {#each data.posts as post, id}
        <div class="p-2">
          <p class="text-sm font-mono">{post.username}</p>
          <img
            src="data:image;base64,{post.image}"
            alt="Post"
            class="w-full"
            id="{id}"
          />
          <span class="py-1 text-sm font-mono">{post.content}</span>
        </div>
        <div class="divide-y divide-blue-500"></div>
      {/each}
    </div>
  </div>