<script>
  let files = null;
  let previewUrl = null;
  let selectedFilter = "none";

  // Function to create an image URL from the selected file
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 250;
          const MAX_HEIGHT = 250;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height *= MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width *= MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          previewUrl = canvas.toDataURL("image/png");
        };
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-20">
  <div class="container mx-auto px-4 flex items-center justify-between">
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
        {#if previewUrl}
          <img
            src={previewUrl}
            alt="Preview"
            class="max-w-full max-h-full object-contain {selectedFilter}"
          />
        {:else}
          <svg
            class="w-8 h-8 mb-4 text-gray-500"
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
          <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
      </div>
      <input
        bind:files
        on:change={handleFileChange}
        name="image"
        id="dropzone"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        required
      />
    </label>
  </div>
  <!-- Dropdown for filters for the image -->
  <div class="mb-3">
    <label for="filter" class="block mb-2 text-sm font-semibold text-gray-900"
      >Filter</label
    >
    <select
      id="filter"
      name="filter"
      bind:value={selectedFilter}
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-blue-500"
    >
      <option value="none">None</option>
      <option value="grayscale">Grayscale</option>
      <option value="sepia">Sepia</option>
      <option value="invert">Invert</option>
      <option value="hue-rotate">Hue Rotate</option>
      <option value="blur">Blur</option>
      <option value="brightness">Brightness</option>
      <option value="contrast">Contrast</option>
      <option value="saturate">Saturate</option>
      <option value="opacity">Opacity</option>
    </select>
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

<style>
  .grayscale {
    filter: grayscale(100%);
  }
  .sepia {
    filter: sepia(100%);
  }
  .invert {
    filter: invert(100%);
  }
  .hue-rotate {
    filter: hue-rotate(90deg);
  }
  .blur {
    filter: blur(5px);
  }
  .brightness {
    filter: brightness(1.5);
  }
  .contrast {
    filter: contrast(200%);
  }
  .saturate {
    filter: saturate(200%);
  }
  .opacity {
    filter: opacity(50%);
  }
</style>
