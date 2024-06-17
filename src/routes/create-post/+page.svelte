<script>
  import { default as Icon } from "@iconify/svelte";

  let files = null;
  let imageUrl = null;
  let imageElement = null;
  let filter = "none";

  $: if (files && files.length) {
    imageUrl = URL.createObjectURL(files[0]);
  }

  const handleApplyFilter = (selectedFilter, event) => {
    event.preventDefault();
    filter = selectedFilter;
    if (imageElement) {
      if (filter === "grayscale") {
        imageElement.style.filter = "grayscale(100%)";
      } else if (filter === "sepia") {
        imageElement.style.filter = "sepia(100%)";
      } else {
        imageElement.style.filter = "none";
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageElement) return;

    // Create a canvas and draw the image with the applied filter
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;

    // Apply the filter to the canvas context
    ctx.filter = imageElement.style.filter;
    ctx.drawImage(imageElement, 0, 0);

    // Convert the canvas content to a blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData(event.target);
      formData.set("image", blob, "filtered_image.png");

      const response = await fetch("/create-post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Image upload failed");
      }
    });
  };
</script>

<div class="w-full flex flex-col items-center justify-center">
  <h1 class="text-xl h-12 flex items-center">ADD POST</h1>
  <form
    method="POST"
    enctype="multipart/form-data"
    class="flex flex-col bg-white-500 gap-10 h-full w-1/3 border-2 border-white justify-between p-12"
    on:submit={handleSubmit}
  >
    <label for="dropzone" class="flex justify-center h-full cursor-pointer">
      <div
        class="border-2 border-slate-500 flex flex-col justify-center items-center h-full w-96 cursor-pointer"
      >
        {#if imageUrl}
          <img
            src={imageUrl}
            alt="Selected image"
            class="h-full w-full object-cover"
            aria-hidden="true"
            bind:this={imageElement}
            id="imageF"
          />
          <div>
            <button
              type="button"
              on:click={(event) => handleApplyFilter("grayscale", event)}
            >
              Grayscale
            </button>
            <button
              type="button"
              on:click={(event) => handleApplyFilter("sepia", event)}
            >
              Sepia
            </button>
            <button
              type="button"
              on:click={(event) => handleApplyFilter("none", event)}
            >
              Reset
            </button>
          </div>
        {:else}
          <div class="bg-white">
            <div class="flex justify-center">
              <Icon icon="bx:upload" />
            </div>
            <p>Click to Upload</p>
          </div>
        {/if}
      </div>
      <input
        name="image"
        bind:files
        id="dropzone"
        type="file"
        class="hidden"
        required
      />
    </label>
    <div>
      <div name="username">Guest</div>
      <textarea
        name="content"
        id="content"
        class="bg-slate-50 text-black p-2 w-full"
        placeholder="Add a caption..."
      ></textarea>
      <div class="flex justify-center">
        <button
          type="submit"
          class="hover:text-black bg-slate-500 hover:bg-slate-300 w-32 h-10 rounded-md"
        >
          POST
        </button>
      </div>
    </div>
  </form>
</div>
