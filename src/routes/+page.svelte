<script>
  import { writable } from "svelte/store";

  export let data;

  // Store for keeping track of liked posts
  const likedPosts = writable({});

  // Function to toggle like status
  function toggleLike(postId) {
    likedPosts.update((currentLikes) => {
      return { ...currentLikes, [postId]: !currentLikes[postId] };
    });
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-20">
  <div class="container mx-auto px-4 flex items-center justify-between">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaTon</h1>
    <a
      href="/add-post"
      class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500"
      >Add Post</a
    >
  </div>
</header>

<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post}
      <!-- Post Template -->
      <div class="bg-white shadow-md p-3">
        <div class="flex items-center">
          <div
            class="profile-photo w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="gray"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-bold">{post.username}</h2>
          </div>
        </div>
        <div class="mt-4">
          <img
            src="data:image;base64,{post.Image}"
            alt="Post"
            class=" {post.filter} w-full aspect-square object-cover rounded-md"
          />
        </div>
        <div class="mt-2 flex gap-3">
          <div class="heart" on:click={() => toggleLike(post.id)}>
            {#if $likedPosts[post.id]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="red"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                />
              </svg>
            {/if}
          </div>
          <div class="message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              class="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
              />
            </svg>
          </div>
          <div class="share">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              class="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
              />
            </svg>
          </div>
        </div>
        <div class="mt-1">
          <p class="text-sm text-gray-600">
            <span class="font-bold mr-2 text-gray-700">{post.username}</span>
            {post.caption}
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>
