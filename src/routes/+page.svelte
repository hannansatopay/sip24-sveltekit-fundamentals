<script>
  export let data;
</script>

<header class="bg-white py-4 shadow-md">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Cosmic_Sans_MS']">CraftLab</h1>
    <a
      href="add-post"
      class="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
      >Add Post</a
    >
  </div>
</header>

<div class="container mx-auto my-5">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post}
      <div>
        <img src="data:image;base64,{post.image}" alt="Post" class="w-full" />
        <div class="text-sm py-1">
          <span class="font-bold">{post.username}</span>
          <span class="text-gray-700">{post.content}</span>
        </div>
      </div>
    {/each}

    <div>
      <img src="https://picsum.photos/600" alt="Post" class="w-full" />
      <div class="text-sm py-1">
        <span class="font-bold">Username:</span>
        <span class="text-gray-700"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
          tempora iure sit reprehenderit expedita pariatur quasi, voluptatem
          beatae eligendi cumque ducimus adipisci repellendus? Perferendis non
          veritatis optio, placeat ex nulla?</span
        >
      </div>
    </div>

    <div>
      <img src="https://picsum.photos/900" alt="Post" class="w-full" />
      <div class="text-sm py-1">
        <span class="font-bold">Username:</span>
        <span class="text-gray-700"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
          tempora iure sit reprehenderit expedita pariatur quasi, voluptatem
          beatae eligendi cumque ducimus adipisci repellendus? Perferendis non
          veritatis optio, placeat ex nulla?</span
        >
      </div>
    </div>

    <div>
      <img src="https://picsum.photos/400" alt="Post" class="w-full" />
      <div class="text-sm py-1">
        <span class="font-bold">Username:</span>
        <span class="text-gray-700"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
          tempora iure sit reprehenderit expedita pariatur quasi, voluptatem
          beatae eligendi cumque ducimus adipisci repellendus? Perferendis non
          veritatis optio, placeat ex nulla?</span
        >
      </div>
    </div>
  </div>
</div>
