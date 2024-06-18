<script>
  let files = null;
</script>

<header class="bg-white py-4 shadow-md">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Cosmic_Sans_MS']">CraftLab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form
  action=""
  method="POST"
  enctype="multipart/form-data"
  class="container mx-auto p-5"
>
  <div>
    <input type="file" />
  </div>
  <label
    for="dropzone"
    class="cursor-pointer mb-3 flex flex-col justify-center items-center w-full h-64 border-2 border-gray-300 border-dotted rounded-md my-3"
  >
    <div class="flex flex-col items-center pt-5 pb-6">
      {#if files && files.length}
        <p class="text-sm text-gray-500 font-semibold">
          {files[0].name}
        </p>
      {:else}
        <svg
          height="32px"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title /><desc /><defs /><g
            fill="none"
            fill-rule="evenodd"
            id="Page-1"
            stroke="none"
            stroke-width="1"
          >
            <g fill="#929292" id="icon-130-cloud-upload">
              <path
                d="M17,22 L25.0005601,22 C27.7616745,22 30,19.7558048 30,17 C30,14.9035809 28.7132907,13.1085075 26.8828633,12.3655101 L26.8828633,12.3655101 C26.3600217,9.87224935 24.1486546,8 21.5,8 C20.6371017,8 19.8206159,8.19871575 19.0938083,8.55288165 C17.8911816,6.43144875 15.6127573,5 13,5 C9.13400656,5 6,8.13400656 6,12 C6,12.1381509 6.00400207,12.275367 6.01189661,12.4115388 L6.01189661,12.4115388 C4.23965876,13.1816085 3,14.9491311 3,17 C3,19.7614237 5.23249418,22 7.99943992,22 L16,22 L16,16 L12.75,19.25 L12,18.5 L16.5,14 L21,18.5 L20.25,19.25 L17,16 L17,22 L17,22 Z M16,22 L16,27 L17,27 L17,22 L16,22 L16,22 Z"
                id="cloud-upload"
              />
            </g>
          </g>
        </svg>
        <p class="text-sm text-gray-500 font-semibold">Click to Upload</p>
      {/if}
      <input
        bind:files
        name="image"
        id="dropzone"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        required
      />
    </div>
  </label>
  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
      >Username</label
    >
    <input
      name="username"
      id="username"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  </div>
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
      >Content</label
    >
    <textarea
      name="content"
      id="content"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    ></textarea>
  </div>
  <button
    type="submit"
    class="bg-blue-700 hover:bg-blue-400 font-medium rounded-lg text-sm text-white px-5 py-2.5 my-3"
    >Share</button
  >
</form>
