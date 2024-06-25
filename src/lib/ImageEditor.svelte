<!-- src/lib/ImageEditor.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let image: HTMLImageElement;
  export let initialImage: string | null = null;

  const dispatch = createEventDispatcher();

  $: if (initialImage && canvas) {
    loadImage(initialImage);
  }

  function loadImage(src: string) {
    image = new Image();
    image.onload = () => {
      fitImageToCanvas();
    };
    image.src = src;
  }

  function fitImageToCanvas() {
    const canvasWidth = 500;
    const canvasHeight = 500;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext('2d')!;
    const scale = Math.min(canvasWidth / image.width, canvasHeight / image.height);
    const x = (canvasWidth - image.width * scale) / 2;
    const y = (canvasHeight - image.height * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    updateFilteredImage();
  }

  function applyFilter(filter: string) {
    if (!image) return;

    fitImageToCanvas();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (filter === 'grayscale') {
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        data[i] = data[i + 1] = data[i + 2] = gray;
      } else if (filter === 'sepia') {
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    updateFilteredImage();
  }

  function updateFilteredImage() {
    const filteredImage = canvas.toDataURL('image/png');
    dispatch('update', { filteredImage });
  }

  function resetImage() {
    if (image) {
      fitImageToCanvas();
    }
  }
</script>

<div class="image-editor">
  <canvas bind:this={canvas} class="border border-gray-300 mx-auto"></canvas>
  
  <div class="flex justify-center space-x-2 mt-4">
    <button on:click={() => applyFilter('grayscale')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Grayscale</button>
    <button on:click={() => applyFilter('sepia')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sepia</button>
    <button on:click={resetImage} class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Reset</button>
  </div>
</div>

<style>
  .image-editor {
    max-width: 500px;
    margin: 0 auto;
  }
</style>