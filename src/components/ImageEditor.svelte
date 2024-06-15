<script>
    import { onMount } from 'svelte';
    export let file = null;
  
    let canvas;
    let ctx;
    let image;
    let filters = {
      grayscale: false,
      sepia: false
    };
  
    const loadImage = () => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          image = new Image();
          image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  
    const applyFilters = () => {
      if (!image) return;
  
      ctx.drawImage(image, 0, 0);
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
  
        if (filters.grayscale) {
          const avg = (r + g + b) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
  
        if (filters.sepia) {
          data[i] = r * 0.393 + g * 0.769 + b * 0.189;
          data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
          data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
    };
  
    $: loadImage();
  
    onMount(() => {
      canvas = document.getElementById('imageCanvas');
      ctx = canvas.getContext('2d');
    });
  </script>
  
  <div>
    <canvas id="imageCanvas"></canvas>
    <div class="controls">
      <label>
        <input type="checkbox" bind:checked={filters.grayscale} on:change={applyFilters} />
        Grayscale
      </label>
      <label>
        <input type="checkbox" bind:checked={filters.sepia} on:change={applyFilters} />
        Sepia
      </label>
    </div>
  </div>
  