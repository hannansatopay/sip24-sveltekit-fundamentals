<script>
  let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_sans_MS']">Craftlab</h1>
    <a
      href="/add-post"
      class="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold px-4 py-2"
      >Home</a
    >
  </div>
</header>

<form class="container mx-auto p-5">
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
        />
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
  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
      >Username</label
    >
    <input
      for="username"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg p-2.5 block w-full"
    />
  </div>
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
      >Content</label
    >
    <textarea
      for="content"
      class="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg p-2.5 block w-full"
    />
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold px-4 py-2"
    >Share</button
  >
</form>
