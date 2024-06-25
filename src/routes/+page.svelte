<script>
  export let data;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-100">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-mono">Instagram</h1>
    <!-- Hover -->

    <a
      class="group relative inline-block focus:outline-none focus:ring"
      href="/add-post"
    >
      <span
        class="absolute rounded-xl inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"
      ></span>

      <span
        class="relative rounded-xl inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest"
      >
        Add Post
      </span>
    </a>
  </div>
</header>

<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-5 justify-items-center">
    <!-- Post Template -->
     {#each data.posts as post}
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img
          class="rounded-t-lg"
          src="data:image;base64,{post.image}"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
           {post.username}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
    {/each}

  </div>
</div>
