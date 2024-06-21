<script>
  import { createEventDispatcher, onMount } from "svelte";

  let files;
  let canvas;
  let ctx;
  let originalImageData;
  const dispatch = createEventDispatcher();

  onMount(() => {
    if (files && files.length) {
      loadImage(files[0]);
    }
  });

  $: if (files && files.length) {
    loadImage(files[0]);
  }

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function applyGrayscale() {
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function applySepia() {
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      data[i] = r * 0.393 + g * 0.769 + b * 0.189;
      data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
      data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function resetFilters() {
    if (originalImageData && ctx) {
      ctx.putImageData(originalImageData, 0, 0);
    }
  }

  function getFilteredImage() {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  }

  export { getFilteredImage };
</script>

<canvas bind:this={canvas} class="border"></canvas>
<div class="flex justify-between mt-3">
  <button
    on:click={applyGrayscale}
    class="bg-gray-500 text-white px-4 py-2 rounded">Grayscale</button
  >
  <button
    on:click={applySepia}
    class="bg-yellow-500 text-white px-4 py-2 rounded">Sepia</button
  >
  <button
    on:click={resetFilters}
    class="bg-blue-500 text-white px-4 py-2 rounded">Reset</button
  >
</div>

<style>
  .border {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
  }
  .hidden {
    display: none;
  }
</style>
