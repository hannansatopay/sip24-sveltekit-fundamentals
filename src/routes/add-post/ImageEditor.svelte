<script>
    let files = null;
    let originalImageData;
    let ctx;
  
    function handleImage(event) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.getElementById('imageCanvas');
          ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  
    function applyFilter(filterType) {
      if (!originalImageData) return;
      const imageData = ctx.createImageData(originalImageData);
      const data = originalImageData.data;
      const result = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
  
        if (filterType === 'grayscale') {
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          result[i] = result[i + 1] = result[i + 2] = gray;
        } else if (filterType === 'sepia') {
          result[i] = 0.393 * r + 0.769 * g + 0.189 * b;
          result[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
          result[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
        }
  
        result[i + 3] = a;
      }
  
      ctx.putImageData(imageData, 0, 0);
    }
  
    function resetImage() {
      if (!originalImageData) return;
      ctx.putImageData(originalImageData, 0, 0);
    }
  </script>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      padding: 20px;
    }
    canvas {
      margin-top: 20px;
      border: 1px solid black;
    }
    .controls {
      margin-top: 10px;
    }
  </style>
  
  <h1>Image Viewer and Photo Filter Editor</h1>
  <input type="file" accept="image/*" on:change="{handleImage}">
  <canvas id="imageCanvas"></canvas>
  <div class="controls">
    <button on:click="{() => applyFilter('grayscale')}">Grayscale</button>
    <button on:click="{() => applyFilter('sepia')}">Sepia</button>
    <button on:click="{resetImage}">Reset</button>
  </div>
  