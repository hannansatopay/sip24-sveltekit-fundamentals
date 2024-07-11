<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let uploadedImage;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          uploadedImage = img;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = (filter) => {
    if (!uploadedImage) return;
    ctx.drawImage(uploadedImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (filter === 'grayscale') {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      } else if (filter === 'sepia') {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i] = r * 0.393 + g * 0.769 + b * 0.189;
        data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  onMount(() => {
    ctx = canvas.getContext('2d');
  });
</script>

<div class="container mx-auto md:my-5">
  <h2 class="text-xl font-bold mb-4">Photo Filter Editor</h2>
  <input type="file" accept="image/*" on:change={handleImageUpload} />
  <canvas bind:this={canvas} class="border mt-4"></canvas>
  <div class="mt-4">
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => applyFilter('grayscale')}>Grayscale</button>
    <button class="bg-brown-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded" on:click={() => applyFilter('sepia')}>Sepia</button>
  </div>
</div>

<style>
  .container {
    padding: 2rem;
  }
  canvas {
    max-width: 100%;
    height: auto;
  }
  .bg-brown-500 {
    background-color: #A52A2A;
  }
  .bg-brown-700 {
    background-color: #8B4513;
  }
</style>
