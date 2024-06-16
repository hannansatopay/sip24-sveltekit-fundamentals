<script>
    import { browser } from '$app/environment';
   import { onMount } from 'svelte';
   let files = null;
   let imageCanvas;
   let ctx;
   let originalImage;
   onMount(() => {
       ctx = imageCanvas.getContext('2d');
       if (browser) {
           originalImage = new Image();
       }
   });
   function handleFileChange(event) {
       if (!browser) return;
       files = event.target.files;
       if (files && files[0]) {
           const reader = new FileReader();
           reader.onload = function(e) {
               originalImage.onload = function() {
                   imageCanvas.width = originalImage.width;
                   imageCanvas.height = originalImage.height;
                   ctx.drawImage(originalImage, 0, 0);
               };
               originalImage.src = e.target.result;
           };
           reader.readAsDataURL(files[0]);
       }
   }
   function resetImage() {
       if (browser && originalImage && originalImage.src) {
           ctx.drawImage(originalImage, 0, 0);
       }
   }
   function applyFilter(filter) {
       if (!browser || !ctx) return;
       const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
       const data = imageData.data;
       for (let i = 0; i < data.length; i += 4) {
           const red = data[i];
           const green = data[i + 1];
           const blue = data[i + 2];
           if (filter === 'grayscale') {
               const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
               data[i] = gray;
               data[i + 1] = gray;
               data[i + 2] = gray;
           } else if (filter === 'sepia') {
               data[i] = (red * 0.393) + (green * 0.769) + (blue * 0.189);
               data[i + 1] = (red * 0.349) + (green * 0.686) + (blue * 0.168);
               data[i + 2] = (red * 0.272) + (green * 0.534) + (blue * 0.131);
           }
       }
       ctx.putImageData(imageData, 0, 0);
   }
   async function canvasToFile(canvas, filename) {
       if (!browser) return null;
       return new Promise((resolve) => {
           canvas.toBlob((blob) => {
               resolve(new File([blob], filename, { type: 'image/jpeg' }));
           }, 'image/jpeg');
       });
   }
   async function handleSubmit(event) {
       if (!browser) return;
       event.preventDefault();
       const formData = new FormData(event.target);
       
       // Convert canvas to File
       const imageFile = await canvasToFile(imageCanvas, 'image.jpg');
       if (imageFile) {
           formData.set('image', imageFile);
       }
       const response = await fetch('/add-post', {
           method: 'POST',
           body: formData
       });
       if (response.ok) {
           window.location.href = '/';
       } else {
           console.error('Post submission failed');
     
       }
   }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
   <div class="container mx-auto px-4 flex items-center justify-between">
       <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
       <a href="/"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Home</a>
   </div>
</header>

<div class="container mx-auto p-5">
   <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full cursor-pointer">
       <div class="flex flex-col items-center justify-center pt-5 pb-6">
           {#if files && files.length}
               <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
           {:else}
               <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"></svg>
               <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
           {/if}
       </div>
       <input id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={handleFileChange} required/>
   </label>

   <canvas bind:this={imageCanvas} class="mx-auto mb-4" style="max-width: 100%;"></canvas>

   <div class="mb-4 flex justify-center">
       <button type="button" on:click={() => applyFilter('grayscale')} class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-2">Grayscale</button>
       <button type="button" on:click={() => applyFilter('sepia')} class="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded">Sepia</button>
   </div>

   <form on:submit={handleSubmit}>
       <div class="mb-3">
           <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
           <input name="username" id="username" type="text" class="bg-500 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
       </div>

       <div class="mb-3">
           <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
           <textarea name="content" id="content" class="bg-500 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea>
       </div>
       <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
   </form>
</div>