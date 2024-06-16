<script>
  let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-20">
  <div class="conatiner mx-auto px-4 flex items-center justify-between">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaTon</h1>
    <a
      href="/"
      class="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-500"
      >Home</a
    >
  </div>
</header>

<!-- Upload Post -->
<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <div>
    <label
      for="dropzone"
      class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if files && files.length}
          <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
          <svg
            class="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
            ><path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
      </div>
      <input
        bind:files
        name="image"
        id="dropzone"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        required
      />
    </label>
  </div>
  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-semibold text-gray-900"
      >Username</label
    >
    <input
      type="text"
      id="username"
      name="username"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-blue-500"
    />
  </div>
  <div class="mb-3">
    <label for="caption" class="block mb-2 text-sm font-semibold text-gray-900"
      >Caption</label
    >
    <textarea
      type="text"
      id="caption"
      name="caption"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-blue-500"
    ></textarea>
  </div>
  <button
    type="submit"
    class="bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg hover:bg-blue-500"
    >Share</button
  >
</form>
