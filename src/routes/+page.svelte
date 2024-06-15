<script>
    export let data;
</script>

<header class=" p-4 shadow-md sticky top-0 z-10" style="background-color: #FFFAF0;">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']" style="background-color: #f9f9f9;">MyInsta</h1>
        <a href="/add-post" class="bg-pink-500 text-white font-bold py-2 px-4 hover:bg-pink-700 rounded">Add Post</a>
    </div>
</header>

<div class="container mx-auto p-5" style="background-color: #F0FFF0;">
    <div class="grid grid-cols-1 gap-8 justify-center">
      {#each data.posts as post}
        <div class="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
          <span class="block text-xl font-bold text-indigo-600 p-5" style="color: #2F4F4F">{post.username}</span>
          <img class="w-11/12 mx-auto mt-4 rounded" src="data:image;base64,{post.image}" alt="Post">
          <div class="p-4">
            <button class="heart-button">
              <svg class="heart-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <span class="block text-gray-700 mt-2" style="color: #2F4F4F">{post.content}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

<style>
    .heart-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  
    .heart-svg {
      fill: #ff6666;
      width: 30px;
      height: 30px;
      transition: fill 0.3s ease;
    }
  
    .heart-button:hover .heart-svg {
      fill: #ff3333;
    }
  </style>


