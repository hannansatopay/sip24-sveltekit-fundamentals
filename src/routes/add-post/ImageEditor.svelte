

<script>
    export let files = null;
  
    let canvas;
    let ctx;
    let image;
  
    $: if (files && files.length) {
      loadImage(files[0]);
    }
  
    function loadImage(file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        image = img;
        setupCanvas();
        applyFilter('none');
      };
    }
  
    function setupCanvas() {
      canvas = document.getElementById('image-canvas');
      ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
  
    function applyFilter(filter) {
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      switch (filter) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }
          break;
        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg + 100;
            data[i + 1] = avg + 50;
            data[i + 2] = avg;
          }
          break;
        case 'none':
          break;
        default:
          break;
      }
  
      ctx.putImageData(imageData, 0, 0);
    }
  </script>
  
  <div class="mb-3">
    <canvas id="image-canvas" class="max-w-full"></canvas>
  </div>
  <div class="mb-3">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      on:click={() => applyFilter('grayscale')}>
      Grayscale
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      on:click={() => applyFilter('sepia')}>
      Sepia
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={() => applyFilter('none')}>
      Reset
    </button>
  </div>

