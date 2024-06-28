<script>
  import { onMount } from "svelte";
  let files = null;
  let imageUrl = null;
  let canvas;
  let ctx;
  let originalImageData;

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl = e.target.result;
        loadImage();
      };
      reader.readAsDataURL(file);
    }
  }

  function loadImage() {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
  }

  function applyFilter(filter) {
    if (!originalImageData) return;

    const imageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );

    for (let i = 0; i < imageData.data.length; i += 4) {
      const [r, g, b] = [
        imageData.data[i],
        imageData.data[i + 1],
        imageData.data[i + 2],
      ];

      if (filter === "grayscale") {
        const avg = (r + g + b) / 3;
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
      } else if (filter === "sepia") {
        imageData.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
        imageData.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        imageData.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
      } else if (filter === "invert") {
        imageData.data[i] = 255 - r;
        imageData.data[i + 1] = 255 - g;
        imageData.data[i + 2] = 255 - b;
      } else if (filter === "brightness") {
        imageData.data[i] = r * 1.2;
        imageData.data[i + 1] = g * 1.2;
        imageData.data[i + 2] = b * 1.2;
      } else if (filter === "contrast") {
        const factor = (259 * (128 + 255)) / (255 * (259 - 128));
        imageData.data[i] = factor * (r - 128) + 128;
        imageData.data[i + 1] = factor * (g - 128) + 128;
        imageData.data[i + 2] = factor * (b - 128) + 128;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function resetImage() {
    if (originalImageData) {
      ctx.putImageData(originalImageData, 0, 0);
    }
  }

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d");
    }
  });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >Home</a
    >
  </div>
</header>

<form
  class="container mx-auto p-5 py-5 mb-5"
  method="POST"
  enctype="multipart/form-data"
>
  <div class="flex items-center justify-center w-full mb-5">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-300 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-250 dark:hover:bg-gray-200"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6 mb-5">
        {#if files && files.length}
          <p class="mb-2 text-sm text-gray-150 dark:text-gray-500">
            <span class="font-semibold">{files[0].name}</span> or drag and drop
          </p>
        {:else}
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-150 dark:text-gray-500">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
        {/if}
        <p class="text-xs text-gray-100 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        name="image"
        id="dropzone-file"
        type="file"
        class="hidden"
        on:change={handleFileChange}
        bind:files
      />
    </label>
  </div>

  <div class="mb-5">
    <label for="username" class="block mb-2 font-bold text-gray-800"
      >Username</label
    >
    <input
      type="text"
      name="username"
      id="username"
      class="bg-gray-200 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  </div>
  <div class="mb-5">
    <label for="content" class="block mb-2 font-bold text-gray-800"
      >Content</label
    >
    <textarea
      name="content"
      id="content"
      class="bg-gray-200 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    ></textarea>
  </div>

  <div class="mb-5">
    {#if imageUrl}
      <div class="flex flex-col items-center">
        <canvas bind:this={canvas} class="mb-4"></canvas>
        <div class="flex space-x-4">
          <button
            type="button"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
            on:click={() => applyFilter("grayscale")}>Grayscale</button
          >
          <button
            type="button"
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
            on:click={() => applyFilter("sepia")}>Sepia</button
          >
          <button
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            on:click={() => applyFilter("invert")}>Invert</button
          >
          <button
            type="button"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
            on:click={() => applyFilter("brightness")}>Brightness</button
          >
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            on:click={() => applyFilter("contrast")}>Contrast</button
          >
          <button
            type="button"
            class="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-md"
            on:click={resetImage}>Reset</button
          >
        </div>
      </div>
    {/if}
  </div>

  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
  >
    Submit
  </button>
</form>

<style>
  canvas {
    max-width: 100%;
    height: auto;
  }
</style>
