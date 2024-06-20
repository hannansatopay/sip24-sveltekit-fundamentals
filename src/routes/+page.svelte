<script>
    export let data;
  </script>
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
      <a
        href="/add-post"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Add post</a
      >
    </div>
  </header>
  <div class="container mx-auto my-5 ">
    <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.posts as post}
      <div class="max-w-sm rounded overflow-hidden shadow-lg p-5 bg-gradient-to-b from-purple-300 via-yellow-100 to-pink-300">
        <div class="flex items-center justify-center h-64">
            <img
              class="w-64 h-64 rounded-2xl"
              src="data:image;base64,{post.image}"
              alt="Post"
            />
          </div>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Name: {post.username}</div>
            <p class="text-gray-700 text-base">
            Content:  {post.content}
            </p>
          </div>
       
        </div>
      {/each}
    </div>
  
  </div>
  