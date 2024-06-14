<script>
  let files = null;
</script>

<header class="shadow-md shadow-gray-600 sticky z-10 bg-white top-0">
  <div class="flex flex-row justify-between items-center py-2 px-3 font-mono">
    <p class="text-2xl font-bold">Craftlab</p>
    <a href="/" class="bg-blue-500 px-2 py-1 rounded-lg text-white font-bold"
      >Home</a
    >
  </div>
</header>

<form class="p-5" method="POST" enctype="multipart/form-data">
  <label
    for="dropzone"
    class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length != 0}
        <p>{files[0].name}</p>
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
          /></svg
        >
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
    </div>
    <input
      name="image"
      id="dropzone"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
      bind:files
      required
    />
  </label>
  <div class="flex flex-col gap-1">
    <label for="username" class="font-mono text-lg">Username</label>
    <input
      type="text"
      class="bg-gray-100 border border-black rounded-lg w-full h-8 px-3 py-1 font-mono"
      id="username"
      name="username"
    />
  </div>
  <br />
  <div class="flex flex-col gap-1">
    <label for="content" class="font-mono text-lg px-3">Content</label>
    <textarea
      type="text"
      class="bg-gray-100 border border-black rounded-lg w-full h-12 py-1 px-3 font-mono"
      id="content"
      name="content"
    />
  </div>
  <br />
  <button
    class="bg-blue-500 px-3 py-2 rounded-lg text-white text-md font-mono font-bold hover:scale-105 hover:shadow-md hover:shadow-gray-400"
    >Post</button
  >
</form>
