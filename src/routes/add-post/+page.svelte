<script>
  let files = null;
  let imageURL = "";

  function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageURL = e.target.result;
      const canvas = document.getElementById("imageCanvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
      image.src = imageURL;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function applyFilter(filter) {
    const canvas = document.getElementById("imageCanvas");
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (filter === "grayscale") {
        const avg = 0.299 * r + 0.587 * g + 0.114 * b;
        data[i] = data[i + 1] = data[i + 2] = avg;
      } else if (filter === "sepia") {
        data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
        data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
        data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
      }
    }

    context.putImageData(imageData, 0, 0);
  }
</script>

<header
  class="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-md py-4 sticky top-0 z-10 text-white"
>
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a
      href="/"
      class="px-3 py-2 rounded-md text-sm font-bold border-2 border-white"
      >Home</a
    >
  </div>
</header>
<form
  class="container mx-auto p-5 space-y-5"
  method="POST"
  enctype="multipart/form-data"
>
  <label
    for="image"
    class="block relative bg-gray-50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-6 py-8 text-center"
  >
    {#if files && files.length}
      <p class="text-sm text-gray-600 dark:text-gray-400">{files[0].name}</p>
    {:else}
      <svg
        class="mx-auto h-8 w-8 text-gray-600 dark:text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 17l-4 4m0 0l-4-4m4 4V3"
        ></path>
      </svg>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Click to upload image
      </p>
    {/if}
    <input
      bind:files
      name="image"
      type="file"
      class="hidden"
      id="image"
      accept="image/png, image/jpeg, image/jpg"
      required
      on:change={loadImage}
    />
  </label>

  <div class="text-center">
    <canvas id="imageCanvas" class="border border-gray-300 w-96 h-auto"></canvas>
    <div class="mt-4 space-x-4">
      <button
        type="button"
        class="bg-gray-200 px-4 py-2 rounded-md"
        on:click={() => applyFilter("grayscale")}>Grayscale</button
      >
      <button
        type="button"
        class="bg-gray-200 px-4 py-2 rounded-md"
        on:click={() => applyFilter("sepia")}>Sepia</button
      >
    </div>
  </div>

  <div>
    <label for="username" class="font-medium block mb-2 text-sm text-gray-800"
      >Username</label
    >
    <input
      id="username"
      type="text"
      name="username"
      class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    />
  </div>

  <div>
    <label for="content" class="font-medium block mb-2 text-sm text-gray-800"
      >Content</label
    >
    <textarea
      id="content"
      name="content"
      class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    ></textarea>
  </div>

  <button
    class="bg-gradient-to-r from-[#fd1d1d] to-[#fcb045] px-6 py-2 rounded-md text-sm text-white font-bold"
    >Post</button
  >
</form>
