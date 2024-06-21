<script>
  export let data;

  // Function to format createdAt to Day and 00:00 format
  function formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const day = date.toLocaleDateString(undefined, { weekday: "long" });
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day} ${time}`;
  }
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

<div class="container mx-auto md:my-5">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post}
      <div class="border border-gray-300 p-4 rounded-md m-2">
        <img
          class="w-full h-48 object-cover border-1 border-gray-500"
          src="data:image;base64,{post.image}"
          alt="Post"
        />
        <div class="text-lg py-2 flex justify-between ">
          <span class="font-bold">{post.username}</span>
          <span class="text-xs text-gray-500 ml-1"
            >{formatCreatedAt(post.createdAt)}</span
          >
          <!-- Display timestamp -->
        </div>
        <div class="text-md py-2">
          <span class="text-gray-700 block">{post.content}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .border {
    border-width: 1px;
  }
  .rounded-md {
    border-radius: 0.375rem;
  }
</style>
