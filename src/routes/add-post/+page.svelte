<script>
    import { onMount } from 'svelte';
  
    let image;
    let canvas;
    let ctx;
    let filter = 'none';
  
    function handleImageChange(event) {
      image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          applyFilter();
        };
        img.src = imageData;
      };
      reader.readAsDataURL(image);
    }
  
    function applyFilter() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
  
      switch (filter) {
        case 'grayscale':
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const gray = (r + g + b) / 3;
            pixels[i] = gray;
            pixels[i + 1] = gray;
            pixels[i + 2] = gray;
          }
          break;
        case 'sepia':
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
            pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
            pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
          }
          break;
        default:
          break;
      }
  
      ctx.putImageData(imageData, 0, 0);
    }
  
    function handleFilterChange(event) {
      filter = event.target.value;
      applyFilter();
    }
  
    onMount(() => {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
    });
  </script>
  
  <style>
    .font-comic-sans {
      font-family: 'Comic Sans MS', sans-serif;
    }
  
    .container {
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    .header {
      background-color: #333;
      color: #fff;
      padding: 10px;
      text-align: center;
    }
  
    .header a {
      color: #fff;
      text-decoration: none;
    }
  
    .header a:hover {
      color: #ccc;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    .form-group label {
      display: block;
      margin-bottom: 10px;
    }
  
    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-top: 5px;
    }
  
    .canvas-container {
      margin-top: 20px;
      position: relative;
    }
  
    .canvas {
      border: 1px solid #ccc;
      width: 100%;
      height: 300px;
    }
  
    .frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 10px solid #e15555;
      box-sizing: border-box;
    }
  
    .submit-button {
      background-color: #4bde77;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      display: inline-block;
    }
  
    .submit-button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <header class="header">
    <div class="container flex justify-between items-center">
      <h1 class="text-2xl font-bold font-comic-sans" style="color: blue;">Craftlab</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container" method="POST" enctype="multipart/form-data">
    <div class="form-group">
      <label for="dropzone">Upload Image</label>
      <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleImageChange} />
      <div class="canvas-container">
        <canvas id="canvas" class="canvas" width="400" height="300"></canvas>
        <div class="frame"></div>
      </div>
    </div>
  
    <div class="form-group">
      <label for="username">Username</label>
      <input name="username" id="username" type="text" />
    </div>
  
    <div class="form-group">
      <label for="content">Content</label>
      <textarea name="content" id="content" type="text"></textarea>
    </div>
  
    <div class="form-group">
      <label for="filter">Filter</label>
      <select id="filter" on:change={handleFilterChange}>
        <option value="none">None</option>
        <option value="grayscale">Grayscale</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>
  
    <button type="submit" class="submit-button">Share</button>
  </form>
  
  {#if image}
    <p>Image uploaded successfully!</p>
  {/if}