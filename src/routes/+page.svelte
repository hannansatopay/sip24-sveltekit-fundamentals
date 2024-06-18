<!-- correct page -->

<script>
  export let data;
  let liked = {};
  let showFullScreen = false;
  let selectedImage = null;

  data.posts.forEach((post) => {
    liked[post.id] = false;
  });

  function toggleLike(postId) {
    liked[postId] = !liked[postId];
  }

  function openFullScreen(image) {
    selectedImage = image;
    showFullScreen = true;
  }

  function closeFullScreen() {
    showFullScreen = false;
    selectedImage = null;
  }
</script>

<header class="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-white text-2xl font-bold font-['Comic_Sans_MS']">
      Lonesta
    </h1>
    <a
      href="/add-post"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Add post</a
    >
  </div>
</header>

<div class="m-8">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10 gap-8"
  >
    {#each data.posts as post}
      <div
        class="post bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:border-2"
      >
        <div class="flex p-2">
          <img
            class="w-6 h-6 object-cover rounded-full"
            src="0.jpg"
            alt="Post"
          />
          <span class="font-bold text-lg pl-2">{post.username}</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          class="w-full h-48 object-cover cursor-pointer"
          src="data:image;base64,{post.image}"
          alt="Post"
          on:click={() => openFullScreen(post.image)}
        />
        <div class="p-2">
          <p class="text-gray-700 mb-2">{post.content}</p>
          <div class="flex">
            <button
              class="focus:outline-none"
              on:click={() => toggleLike(post.id)}
            >
              {#if liked[post.id]}
                <!-- Filled Heart SVG -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="14"
                  viewBox="0 0 512 512"
                  ><path
                    fill="#f01000"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  /></svg
                >
              {:else}
                <!-- Empty Heart SVG -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="14"
                  viewBox="0 0 512 512"
                  ><path
                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                  /></svg
                >
              {/if}
            </button>
            <span class="pl-2 text-sm text-gray-500"
              >{new Date(post.createdAt).toLocaleString()}</span
            >
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if showFullScreen}
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="relative">
      <button
        class="absolute top-2 right-2 text-white text-2xl"
        on:click={closeFullScreen}>&times;</button
      >
      <img
        src="data:image;base64,{selectedImage}"
        class="max-h-screen max-w-full object-contain"
        alt="Post"
      />
    </div>
  </div>
{/if}

<style>
  .post {
    transition: transform 0.3s;
  }

  .post:hover {
    transform: scale(1.1);
  }
</style>
