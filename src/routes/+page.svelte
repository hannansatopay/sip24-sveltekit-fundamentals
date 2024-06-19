<script>
  export let data;

  async function deletePost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <button on:click={() => { window.location.href = '/new-post'; }} class="custom-button">
      <div class="svg-wrapper-1">
        <div class="svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
          </svg>
        </div>
      </div>
      <span>Add Post</span>
    </button>
  </div>
</header>

<div class="container mx-auto md:my-5">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post (post.id)}
      <div class="border border-gray-300 rounded-lg p-3 relative bg-gray-100">
        <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
        <div class="text-sm py-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-lg">{post.username}</span> 
            <div class="flex items-center space-x-2">
              <button class="delete-button" on:click={() => deletePost(post.id)}>Delete</button>
              <ul>
                <li style="--i:#FF9966;--j:#FF5E62;">
                  <span class="icon">❤️</span>
                  <span class="title">Favourite</span>
                </li>
              </ul>
            </div>
          </div>
          <span class="text-gray-700 text-base">{post.content}</span> 
        </div>
        <div class="absolute bottom-2 right-2">
          <span class="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  button.custom-button {
    font-family: inherit;
    font-size: 15px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  button.custom-button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button.custom-button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button.custom-button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button.custom-button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button.custom-button:hover span {
    transform: translateX(5em);
  }

  button.custom-button:active {
    transform: scale(0.95);
  }

  button.delete-button, ul li {
    background-color: royalblue;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 14px; 
  }

  button.delete-button:hover, ul li:hover {
    background-color: #c53030;
  }

  .grid-cols-1 > * {
    position: relative;
  }

  ul {
    position: relative;
    display: flex;
    gap: 25px;
  }

  ul li {
    position: relative;
    list-style: none;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 60px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
  }

  ul li:hover {
    width: 180px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0);
  }

  ul li::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 60px;
    background: linear-gradient(45deg, var(--i), var(--j));
    opacity: 0;
    transition: 0.5s;
  }

  ul li:hover::before {
    opacity: 1;
  }

  ul li::after {
    content: "";
    position: absolute;
    top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 60px;
    background: linear-gradient(45deg, var(--i), var(--j));
    transition: 0.5s;
    filter: blur(15px);
    z-index: -1;
    opacity: 0;
  }

  ul li:hover::after {
    opacity: 0.5;
  }

  ul li .icon {
    color: #777;
    font-size: 1.75em;
    transition: 0.5s;
    transition-delay: 0.25s;
  }

  ul li:hover .icon {
    transform: scale(0);
    color: #fff;
    transition-delay: 0s;
  }

  ul li span {
    position: absolute;
  }

  ul li .title {
    color: #fff;
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transform: scale(0);
    transition: 0.5s;
    transition-delay: 0s;
  }

  ul li:hover .title {
    transform: scale(1);
    transition-delay: 0.25s;
  }
</style>
