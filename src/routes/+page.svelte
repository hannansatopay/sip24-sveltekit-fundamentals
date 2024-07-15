<script>
  export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Apna PostHub</h1>
    <a
      href="/add-post"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >Add post</a
    >
  </div>
</header>

<div class="container mx-auto md:my-5">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:my-5">
    {#each data.posts as post}
      <div>
        <!-- component -->
        <div
          class=" rounded overflow-hidden border w-full lg:w-12/24 md:w-12/24 bg-white mx-3 md:mx-0 lg:mx-0"
        >
          <div class="w-full flex justify-between p-3">
            <div class="flex">
              <div
                class="rounded-full h-8 w-8 bg-gray-600 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/83996926?v=4"
                  alt="profilepic"
                />
              </div>
              <span class="font-bold"> {post.username}</span>
            </div>
            <span class="px-2 hover:bg-gray-300 cursor-pointer rounded"
              ><i class="fas fa-ellipsis-h pt-2 text-lg"></i></span
            >
          </div>
          <img
            class="w-full bg-cover"
            src={`data:image;base64,${post.image}`}
            alt="Post"
          />
          <div class="px-3 pb-2">
            <div class="pt-2">
              <i class="far fa-heart cursor-pointer"></i>
              <span class="text-sm text-gray-400 font-medium">12k likes</span>
            </div>
            <div class="pt-1">
              <div class="mb-2 text-sm">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
              </div>
            </div>
            <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
              View all 1k comments
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
