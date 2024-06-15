<script>
  export let data;

  function toggleLike(post) {
    post.liked = !post.liked; 
    post.clicked = !post.clicked; 
  }
</script>

<header class="p-4 shadow-md sticky top-0 z-10" style="background-color: #FFFAF0;">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold" style="font-family: 'Comic Sans MS', cursive;">Instagram</h1>
    <a href="/add-post" class="text-white font-bold py-2 px-4 hover:bg-pink-700 rounded" style="background-color: #cd486b;">Add Post</a>
  </div>
</header>

<div class="container mx-auto p-5" style="background-color: #FFFAF0;">
  <div class="grid grid-cols-1 gap-4 justify-center">
    {#each data.posts as post}
      <div class="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
        <span class="block text-xl font-bold text-indigo-600 p-5" style="color: #2F4F4F;">{post.username}</span>
        <img class="w-11/12 mx-auto mt-4 rounded" src="data:image;base64,{post.image}" alt="Post">
        <div class="p-2 flex items-center">

          <button class="heart-button {post.liked ? 'liked' : ''} {post.clicked ? 'clicked' : ''} p-2 mr-2 rounded" class:clicked={post.clicked} on:click={() => toggleLike(post)} aria-label="Like">
            <svg class="heart-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {#if post.clicked}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6666" stroke="#262626" stroke-width="2"/>
              {:else}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6666" stroke="#262626" stroke-width="2"/>
              {/if}
            </svg>
          </button>

          <button class="comment-button p-2 mr-2 rounded" aria-label="Comment">
            <svg class="comment-svg" fill="#262626" height="30" viewBox="0 0 48 48" width="30">
              <path d="M36.7 8H11.3C6.1 8 2 12.1 2 17.3v13.3c0 5.2 4.1 9.3 9.3 9.3h8.6l3.4 3.4c0.6 0.6 1.4 1 2.3 1s1.7-0.4 2.3-1l3.4-3.4h8.6c5.2 0 9.3-4.1 9.3-9.3V17.3c0-5.2-4.1-9.3-9.3-9.3zM40 30.6c0 3.7-3 6.7-6.7 6.7h-8.6l-2.7 2.7-2.7-2.7h-8.6c-3.7 0-6.7-3-6.7-6.7V17.3c0-3.7 3-6.7 6.7-6.7h25.3c3.7 0 6.7 3 6.7 6.7v13.3z"></path>
            </svg>
          </button>

          <button class="share-button p-2 mr-2 rounded" aria-label="Share Post">
            <svg class="share-svg" fill="#262626" height="24" viewBox="0 0 24 24" width="24">
              <path d="M17.5 15c-0.3 0-0.5 0.1-0.7 0.3l-5.5-2.8c0-0.1 0-0.2 0-0.4s0-0.2 0-0.4l5.5-2.8c0.2 0.2 0.5 0.3 0.7 0.3 0.6 0 1-0.4 1-1s-0.4-1-1-1c-0.2 0-0.5 0.1-0.7 0.3l-6 3c-0.5-0.4-1.1-0.6-1.8-0.6-1.7 0-3 1.3-3 3s1.3 3 3 3c0.7 0 1.3-0.3 1.8-0.6l6 3c0.2 0.2 0.5 0.3 0.7 0.3 0.6 0 1-0.4 1-1s-0.4-1-1-1z"/>
            </svg>
          </button>
          
        </div>
        <span class="block text-gray-700 mt-2 px-5 mb-5" style="color: #2F4F4F; font-family: 'Comic Sans MS', cursive; font-size: 20px;">{post.content}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .heart-button, .comment-button, .share-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: calc(30% / 3); 
  }

  .heart-svg, .comment-svg, .share-svg {
    width: 30px;
    height: 30px;
    transition: fill 0.3s ease;
  }

  .heart-button:hover .heart-svg {
    fill: #ff6666; 
  }

  .comment-button:hover .comment-svg {
    fill: #33cc33; 
  }

  .share-button:hover .share-svg {
    fill: #6666ff; 
  }

  .heart-button.clicked .heart-svg {
    fill: #ff6666; 
  }

  .grid-cols-1 .gap-4 {
    gap: 4px; 
  }
</style>
