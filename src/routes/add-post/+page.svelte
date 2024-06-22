<script>
    let file = null;
    let username = '';
    let content = '';
    let originalImageData = null;
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('username', username);
      formData.append('content', content);
  
      const response = await fetch('/add-post', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        window.location.href = '/'; // Redirect to main page
      } else {
        console.error('Failed to upload post');
      }
    }
  
    function handleFileUpload(event) {
      file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
            // Update image preview
            const imagePreview = document.getElementById('image-preview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            document.getElementById('placeholder').style.display = 'none';
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    function applyFilter(filter) {
      if (!originalImageData) return;
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = originalImageData.width;
      canvas.height = originalImageData.height;
      ctx.putImageData(originalImageData, 0, 0);
  
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
  
        if (filter === 'grayscale') {
          const avg = (red + green + blue) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        } else if (filter === 'sepia') {
          data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
          data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
          data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
  
      // Update image preview with filtered image
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = canvas.toDataURL();
    }
  
    function resetImage() {
      if (originalImageData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = originalImageData.width;
        canvas.height = originalImageData.height;
        ctx.putImageData(originalImageData, 0, 0);
  
        const imagePreview = document.getElementById('image-preview');
        imagePreview.src = canvas.toDataURL();
      }
    }
  </script>
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">craftlab.</h1>
      <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
  </header>
  
  <form class="container mx-auto p-5" on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative">
      <div class="flex flex-col items-center justify-center pt-5 pb-6 absolute inset-0" id="placeholder">
        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      </div>
      <img id="image-preview" class="absolute inset-0 object-cover w-full h-full" />
      <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required on:change={handleFileUpload} />
    </label>
    <div class="mb-3">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
      <input id="username" type="text" bind:value={username} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
      <textarea id="content" bind:value={content} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
  </form>
  
  <div class="container mx-auto p-5">
    <div class="flex space-x-2 mt-3">
      <button on:click={() => applyFilter('grayscale')} class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Grayscale</button>
      <button on:click={() => applyFilter('sepia')} class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Sepia</button>
      <button on:click={resetImage} class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Reset</button>
    </div>
  </div>