<script>
  import { onMount } from "svelte";

  let files = null;
  let image = null;
  let canvas;
  let ctx;
  let originalImageData = null;

  onMount(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Convert canvas to Blob and append to formData
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        formData.append("filteredImage", blob, "filteredImage.png");
        resolve();
      });
    });

    const response = await fetch("/add-post", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      const result = await response.json();
      console.error(result.message);
    }
  };

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image = new Image();
      image.onload = () => {
        const aspectRatio = image.width / image.height;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientWidth / aspectRatio;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function applyFilter(filter) {
    if (!originalImageData) return;

    ctx.putImageData(originalImageData, 0, 0);

    switch (filter) {
      case "grayscale":
        ctx.filter = "grayscale(100%)";
        break;
      case "sepia":
        ctx.filter = "sepia(100%)";
        break;
      case "invert":
        ctx.filter = "invert(100%)";
        break;
      case "brightness":
        ctx.filter = "brightness(150%)";
        break;
      case "contrast":
        ctx.filter = "contrast(150%)";
        break;
      case "none":
        ctx.filter = "none";
        break;
      default:
        ctx.filter = "none";
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none"; // Reset the filter for future operations
  }
</script>

<header class="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-white text-2xl font-bold font-['Comic_Sans_MS']">
      Lonesta
    </h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form
  class="mx-auto p-5"
  on:submit={handleSubmit}
  enctype="multipart/form-data"
>
  <div class="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
    <canvas id="canvas" class="h-4/6 w-2/6 m-2"></canvas>

    <label
      for="dropzone"
      class="p-2"
    >
      {#if files && files.length}
        <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
      {:else}
        <svg
          class="w-8 h-8 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
          ><path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          /></svg
        >
      {/if}

      <input
        bind:files
        name="image"
        id="dropzone"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        required
        on:change={() => loadImage(files[0])}
      />
    </label>
  </div>

  <div
    class="flex items-center flex-col md:flex-row justify-center text-white font-medium"
  >
    <button
      type="button"
      on:click={() => applyFilter("none")}
      class="bg-gray-700 hover:bg-gray-900 py-2 px-4 m-2 rounded"
      >None</button
    >
    <button
      type="button"
      on:click={() => applyFilter("grayscale")}
      class="bg-gray-700 hover:bg-gray-900 py-2 px-4 m-2 rounded"
      >Grayscale</button
    >
    <button
      type="button"
      on:click={() => applyFilter("sepia")}
      class="bg-yellow-700 hover:bg-yellow-900 py-2 px-4 m-2 rounded"
      >Sepia</button
    >
    <button
      type="button"
      on:click={() => applyFilter("invert")}
      class="bg-blue-700 hover:bg-blue-900 py-2 px-4 m-2 rounded"
      >Invert</button
    >
    <button
      type="button"
      on:click={() => applyFilter("brightness")}
      class="bg-lime-700 hover:bg-lime-900 py-2 px-4 m-2 rounded"
      >Brightness</button
    >
    <button
      type="button"
      on:click={() => applyFilter("contrast")}
      class="bg-red-700 hover:bg-red-900 py-2 px-4 m-2 rounded"
      >Contrast</button
    >
  </div>

  <div class="my-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
      >Username</label
    >
    <input
      name="username"
      id="username"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    />
  </div>
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
      >Content</label
    >
    <textarea
      name="content"
      id="content"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    ></textarea>
  </div>
  <button
    type="submit"
    class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
    >Share</button
  >
</form>
