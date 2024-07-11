<script>
    import { onMount } from 'svelte';
  
    let fileInput;
    let canvas;
    let ctx;
    let image = new Image();
    let filter = 'none';
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        image.src = e.target.result;
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    onMount(() => {
      ctx = canvas.getContext('2d');
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        applyFilter();
      };
    });
  
    const applyFilter = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = filter;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  </script>
  
  <style>
    .container {
      max-width: 600px;
      margin: auto;
      text-align: center;
    }
    .canvas-container {
      margin-top: 20px;
    }
  </style>
  
  <div class="container">
    <h1>Image Filter Application</h1>
    <input type="file" accept="image/*" bind:this={fileInput} on:change={handleFileChange} />
  
    <div class="canvas-container">
      <canvas bind:this={canvas}></canvas>
    </div>
  
    <div class="filters">
      <button on:click={() => { filter = 'none'; applyFilter(); }}>None</button>
      <button on:click={() => { filter = 'grayscale(100%)'; applyFilter(); }}>Grayscale</button>
      <button on:click={() => { filter = 'sepia(100%)'; applyFilter(); }}>Sepia</button>
    </div>
  </div>