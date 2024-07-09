<script>
    export let data;
  </script>

  <header class="head py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center bg-transparent">
      <h1 class="title text-2xl font-bold font-['Helvetica'] bg-transparent">Jasmitha :)</h1>
      <a href="/add-post" class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
  </header>

  <div class="container mx-auto md:my-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      {#each data.posts as post}
        <div class="cube">
          <img class="w-fit" src="data:image;base64,{post.image}" alt="Post">
          <div class="text-sm py-2">
            <span class="text-violet-500 font-bold text-2xl ">{post.username}</span>
            <span class="text-white font-semibold text-2xl">{post.content}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>