<script>
  let files = null;
  import { onMount } from "svelte";

  let fileInput;
  let canvas;
  let ctx;

  let originalImageData = null;

  onMount(() => {
    ctx = canvas.getContext("2d");
  });

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const aspectRatio = img.width / img.height;
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientWidth / aspectRatio;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function saveCanvasImage() {
    canvas.toBlob((blob) => {
      const file = new File([blob], "modified_image.png", {
        type: "image/png",
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      document.getElementById("dropzone").files = dataTransfer.files;
    }, "image/png");
  }

  let currentFilter = "none";

  function applyFilter(filter) {
    if (!canvas || !ctx) return;

    if (
      filter === "none" ||
      (filter !== "grayscale" &&
        filter !== "sepia" &&
        filter !== "invert" &&
        filter !== "contrast")
    ) {
      if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
        originalImageData = null;
        saveCanvasImage();
        return;
      }
    }
    const img = new Image();
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientWidth / aspectRatio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (filter === "none") {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveCanvasImage();
      } else {
        if (!originalImageData) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          originalImageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }

        if (filter === "grayscale") {
          ctx.filter = "grayscale(100%)";
        } else if (filter === "sepia") {
          ctx.filter = "sepia(100%)";
        } else if (filter === "invert") {
          ctx.filter = "invert(100%)";
        } else if (filter === "contrast") {
          ctx.filter = "contrast(150%)";
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveCanvasImage();
      }
      ctx.filter = "none";
    };
    img.src = canvas.toDataURL();
  }

  function handleFilterChange(filter) {
    currentFilter = filter;
    applyFilter(currentFilter);
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <div
    class="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6"
  >
    <label
      for="dropzone"
      class="flex flex-col items-center w-full lg:w-1/4 justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 p-6"
    >
      <div class="flex flex-col items-center justify-center space-y-4">
        {#if fileInput && fileInput.files && fileInput.files.length > 0}
          <p class="text-sm text-gray-500 font-semibold">
            {fileInput.files[0].name}
          </p>
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
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            /></svg
          >
          <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
      </div>
      <input
        bind:files
        on:change={handleFileChange}
        bind:this={fileInput}
        name="image"
        id="dropzone"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        required
      />
    </label>

    <div class="flex items-center md:flex-col md:space-y-3">
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mx-2"
        on:click={() => handleFilterChange("none")}>None</button
      >
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mx-2"
        on:click={() => handleFilterChange("grayscale")}>Grayscale</button
      >
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mx-2"
        on:click={() => handleFilterChange("sepia")}>Sepia</button
      >
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mx-2"
        on:click={() => handleFilterChange("invert")}>Invert</button
      >
      <button
        type="button"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mx-2"
        on:click={() => handleFilterChange("contrast")}>Contrast</button
      >
    </div>

    <div
      class="flex flex-col items-center lg:w-1/4 justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 p-6"
    >
      <canvas bind:this={canvas} class="w-full h-full"></canvas>
    </div>
  </div>

  <div class="mt-6 space-y-4">
    <div>
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
    <div>
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
        >Content</label
      >
      <textarea
        name="content"
        id="content"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      ></textarea>
    </div>
    <button
      type="submit"
      class="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
      >Share</button
    >
  </div>
</form>
