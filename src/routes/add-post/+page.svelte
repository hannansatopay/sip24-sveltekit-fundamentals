<script>
  let files = null;
  let canvas, ctx, originalImage, modifiedImage
  function handleFileChange(e) {
      files = e.target.files;
      if (files && files.length) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const image = new Image();
              originalImage = image
              image.onload = function() {
                  ctx = canvas.getContext("2d");
                  canvas.width = image.width;
                  canvas.height = image.height;
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
              };
              image.src = e.target.result;
          };
          reader.readAsDataURL(files[0]);
      }
  }

  function applyInvert() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }

  function applyNeon() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * 1.5;
      data[i + 1] = data[i + 1] * 1.5; 
      data[i + 2] = data[i + 2] * 1.5;
    }
    
    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }
  
  function applyLunar() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= 0.5;
      data[i + 1] *= 0.5;
      data[i + 2] *= 1.5; 
    }
    
    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }

  function applySpot() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);
      const distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
      const factor = (1 - distance / maxDistance) * 0.5 + 0.5; 

      data[i] *= factor;
      data[i + 1] *= factor;
      data[i + 2] *= factor;
    }

    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }

  function applyAmber() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= 1.5;
      data[i + 1] *= 1.2;
      data[i + 2] *= 0.8; 
    }
    
    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }
  
  function applyFilm() {
    ctx.putImageData(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const contrastFactor = 1.2;
      data[i] = ((data[i] - 128) * contrastFactor + 128);
      data[i + 1] = ((data[i + 1] - 128) * contrastFactor + 128);
      data[i + 2] = ((data[i + 2] - 128) * contrastFactor + 128);

      const desaturateFactor = 0.2;
      const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      data[i] = gray + desaturateFactor * (data[i] - gray);
      data[i + 1] = gray + desaturateFactor * (data[i + 1] - gray);
      data[i + 2] = gray + desaturateFactor * (data[i + 2] - gray);

      data[i] *= 0.9;
      data[i + 1] *= 1.1;
      data[i + 2] *= 1.1; 
    }
    
    ctx.putImageData(imageData, 0, 0);
    saveCanvasImage();
  }
  
  function resetImage(){
      ctx.putImageData(originalImage, 0, 0);
      saveCanvasImage()
  }

  function saveCanvasImage() {
      canvas.toBlob(blob => {
          const file = new File([blob], "modified_image.png", { type: "image/png" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          document.getElementById('dropzone').files = dataTransfer.files;
      }, 'image/png');
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0">
  <div class="container mx-auto px-4 flex justify-between items-center">
     <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
     <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Home</a>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
      <div class="flex flex-col items-center justify-center pb-6">
          {#if files && files.length}
              <canvas id="myCanvas" bind:this={canvas} class="max-h-64 max-w-full"></canvas>
          {:else}
              <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
              <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
          {/if}                    
      </div>
      <input on:change={handleFileChange} bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
  </label>
  {#if files && files.length}
  <p class="text-sm text-gray-500 font-semibold mb-1">Add Filters</p>
  <button on:click={resetImage}  type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Original</button>
  <button on:click={applyInvert} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Invert</button>
  <button on:click={applyFilm} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Film</button>
  <button on:click={applyLunar} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Lunar</button>
  <button on:click={applySpot} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Spot</button>
  <button on:click={applyNeon} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Neon</button>
  <button on:click={applyAmber} type="button" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2">Amber</button>
  {/if}
  <div class="mt-3 mb-3">
      <label for="username" class="block mb-2 font-medium text-gray-900">Username</label>
      <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>   
  </div>
  <div class="mb-3">
      <label for="content" class="block mb-2 font-medium text-gray-900">Content</label>
      <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>   
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5">Share</button>
</form>