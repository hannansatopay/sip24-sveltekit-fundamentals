<script>
    let files = null;
    import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { sharedImages } from '$lib/stores'; // Importing the sharedImages store

  let canvas;
  let ctx;
  let image;
  let fileInput;

  // Function to handle file upload and display the image on canvas
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        image = new Image();
        image.onload = function () {
          drawImage();
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to draw the uploaded image on canvas
  function drawImage() {
    if (canvas && ctx && image) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }

  // Function to apply filters (grayscale or sepia) to the image
  function applyFilter(filter) {
    if (canvas && ctx) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        switch (filter) {
          case 'grayscale':
            const avg = (r + g + b) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
            break;
          case 'sepia':
            data[i] = r * 0.393 + g * 0.769 + b * 0.189;
            data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
            data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            break;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  }

  // Function to share the edited image
  function shareImage() {
    if (canvas) {
      const imageDataUrl = canvas.toDataURL();
      sharedImages.update(images => {
        const newImages = [...images, imageDataUrl]; // Adding new image URL to sharedImages store
        sessionStorage.setItem('sharedImages', JSON.stringify(newImages)); // Storing in sessionStorage for persistence
        return newImages;
      });
    }
  }

  // Function to handle form submission and post the image
  async function postImage() {
    if (canvas) {
      const imageDataUrl = canvas.toDataURL(); // Convert canvas to base64 data URL
      const formData = new FormData();
      formData.append('image', imageDataUrl);
      
      try {
        const response = await fetch('/api/postImage', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('Image posted successfully');
          // Optionally, navigate to the homepage or perform other actions
          goto('/');
        } else {
          console.error('Failed to post image');
        }
      } catch (error) {
        console.error('Error posting image:', error);
      }
    }
  }

  // Lifecycle hook to initialize canvas context and load previously shared images
  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    const storedImages = JSON.parse(sessionStorage.getItem('sharedImages') || '[]');
    if (storedImages.length > 0) {
      sharedImages.set(storedImages); // Setting sharedImages store with previously stored images
    }
  });
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="conten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
  /* CSS styles for canvas, buttons, and shared images */
  canvas {
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }

  button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #45a049;
  }

  .shared-images {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .shared-images img {
    max-width: 100px;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>

<input type="file" bind:this={fileInput} on:change={handleFileChange} />
<canvas bind:this={canvas}></canvas>
<div>
  <!-- Buttons to apply filters, share image, and post image -->
  <button on:click={() => applyFilter('grayscale')}>Grayscale</button>
  <button on:click={() => applyFilter('sepia')}>Sepia</button>
  <button on:click={shareImage}>Share Image</button>
  <button on:click={postImage}>Post Image</button>
</div>

<!-- Displaying shared images below the canvas -->
<h2>Shared Images</h2>
<div class="shared-images">
  {#each $sharedImages as imageUrl}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={imageUrl} alt="Shared Image" />
  {/each}
</div>