<script>
  let files = null;
  let image = null;
  let canvas;
  let ctx;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('/add-post', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = '/';
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
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function applyFilter(filter) {
    if (!image) return;
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
          data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
          data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];       // Red
          data[i + 1] = 255 - data[i + 1]; // Green
          data[i + 2] = 255 - data[i + 2]; // Blue
        }
        break;
      case 'brightness':
        for (let i = 0; i < data.length; i += 4) {
          data[i] += 40;       // Red
          data[i + 1] += 40; // Green
          data[i + 2] += 40; // Blue
        }
        break;
      case 'contrast':
        const contrast = 1.5;
        const intercept = 128 * (1 - contrast);
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] * contrast + intercept;
          data[i + 1] = data[i + 1] * contrast + intercept;
          data[i + 2] = data[i + 2] * contrast + intercept;
        }
        break;
    }
    ctx.putImageData(imageData, 0, 0);
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

<form class="container mx-auto p-5" on:submit={handleSubmit} enctype="multipart/form-data">
  <label
    for="dropzone"
    class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length}
        <img src={URL.createObjectURL(files[0])} alt="Preview" class="max-h-64" />
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
          /></svg>
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
      on:change={() => loadImage(files[0])}
    />
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
    class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
    >Share</button>
</form>

<div class="container mx-auto p-5">
  <div class="flex flex-col items-center justify-center">
    <canvas bind:this={canvas} class="border border-gray-300 mb-3"></canvas>
    <div class="flex space-x-4">
      <button
        on:click={() => applyFilter('grayscale')}
        class="bg-gray-700 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >Grayscale</button>
      <button
        on:click={() => applyFilter('sepia')}
        class="bg-yellow-700 hover:bg-yellow-900 text-white font-medium py-2 px-4 rounded"
      >Sepia</button>
      <button
        on:click={() => applyFilter('invert')}
        class="bg-red-700 hover:bg-red-900 text-white font-medium py-2 px-4 rounded"
      >Invert</button>
      <button
        on:click={() => applyFilter('brightness')}
        class="bg-blue-700 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded"
      >Brightness</button>
      <button
        on:click={() => applyFilter('contrast')}
        class="bg-green-700 hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >Contrast</button>
    </div>
  </div>
</div>
