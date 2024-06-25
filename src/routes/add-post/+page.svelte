<script>
  let files = null;
  $: console.log(files);
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-100">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-mono">Instagram</h1>
    <!-- Hover -->

    <a
      class="group relative inline-block focus:outline-none focus:ring"
      href="/"
    >
      <span
        class="absolute rounded-xl inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"
      ></span>

      <span
        class="relative rounded-xl inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest"
      >
        Home
      </span>
    </a>
  </div>
</header>

<form
  class="p-3 grid grid-cols-1 justify-items-center"
  method="POST"
  enctype="multipart/form-data"

>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Post</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <span
                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                >Instagram.com/</span
              >
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Content</label
          >
          <div class="mt-2">
            <textarea
              id="content"
              name="content"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about your post.
          </p>
        </div>
        <div class="col-span-full">
          <label
            for="dropzone"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Upload Post</label
          >
          
          <label
            for="dropzone"
            class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
          >
          {#if files && files.length}
           <p class="z-10 text-xs font-light text-center text-gray-500">
              {files[0].name}
            </p>
          {:else}
          <p class="z-10 text-xs font-light text-center text-gray-500">
              Drag & Drop your files here
            </p>
            <svg
              class="z-10 w-8 h-8 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              ></path>
            </svg>
          {/if}
          <input
            bind:files
            type="file"
            id="dropzone"
            name="image"
            class="hidden"
            accept="image/png, image/jpg, image/gif"
          />
            
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <a href="/share" class="text-sm font-semibold leading-6 text-gray-900"
      >Reset</a
    >
    <button
      type="submit"
      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Share</button
    >
  </div>
</form>
