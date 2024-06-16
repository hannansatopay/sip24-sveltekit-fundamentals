<!-- components/ImageEditor.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let selectedImage = null; // This will be passed from parent component

  const dispatch = createEventDispatcher();
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = selectedImage;
  });

  function applyFilter(filterType) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      if (filterType === 'grayscale') {
        let avg = (r + g + b) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      } else if (filterType === 'sepia') {
        let tr = r * 0.393 + g * 0.769 + b * 0.189;
        let tg = r * 0.349 + g * 0.686 + b * 0.168;
        let tb = r * 0.272 + g * 0.534 + b * 0.131;
        data[i] = tr < 255 ? tr : 255;
        data[i + 1] = tg < 255 ? tg : 255;
        data[i + 2] = tb < 255 ? tb : 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function onSave() {
    const dataURL = canvas.toDataURL(); // Convert canvas to data URL
    dispatch('saveImage', { imageData: dataURL });
  }
</script>

<div>
  <canvas bind:this={canvas}></canvas>

  <div class="filters">
    <button on:click={() => applyFilter('grayscale')}>Grayscale</button>
    <button on:click={() => applyFilter('sepia')}>Sepia</button>
  </div>

  <button on:click={onSave}>Save</button>
</div>

<style>
  canvas {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .filters {
    margin-top: 10px;
  }
</style>
