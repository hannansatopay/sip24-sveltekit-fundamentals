
<script>
  import { onMount } from 'svelte';
  import upload from "../../assets/Upload.png";

  let files = null;

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.getElementById('previewCanvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 200; 
          const maxHeight = 200; 

          // Calculate dimensions to fit within maxWidth and maxHeight while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          // Resize canvas to fit the scaled image
          canvas.width = width;
          canvas.height = height;

          // Center the image on the canvas
          const x = (canvas.width - width) / 2;
          const y = (canvas.height - height) / 2;

          // Draw image on canvas with centered position
          ctx.drawImage(img, x, y, width, height);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  // Svelte lifecycle hook to add event listener after component mounts
  onMount(() => {
    document.getElementById('dropzone').addEventListener('change', handleFileChange);
  });
</script>


<header class="bg-white py-4 shadow-md sticky top-0">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
  <label
    for="dropzone"
    class="mb-3 flex flex-col items-center justify-center w-full h-64 border border-gray-300 rounded-lg"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length}
        <canvas id="previewCanvas" class="mb-4"></canvas>
        <p>{files[0].name}</p>
      {:else}
        <img
          src={upload}
          alt="upload"
          class="w-8 h-8 mb-4"
          aria-hidden="true"
        />
        <p>Click to upload</p>
      {/if}
    </div>
    <input
      bind:files
      name="image"
      type="file"
      id="dropzone"
      accept="image/png, image/jpeg"
      class="hidden"
      required
    />
  </label>

  <div class="mb-3">
    <label for="username">Username</label>
    <input
      name="username"
      id="username"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  </div>

  <div class="mb-3">
    <label for="content">Content</label>
    <textarea
      name="content"
      id="content"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  </div>

  <button
    type="submit"
    class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
    >Share</button
  >
</form>
