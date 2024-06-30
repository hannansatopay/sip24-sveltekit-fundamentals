<script>
    let files = null;
    let input;
    let container;
    let image;
    let showImage = false;

    function onChange() {
        const file = input.files[0];
            
        if (file) {
                showImage = true;
    
          const reader = new FileReader();
          reader.addEventListener("load", function () {
            image.setAttribute("src", reader.result);
          });
          reader.readAsDataURL(file);
                
                return;
        } 
            showImage = false; 
      }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">CloneHub</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Home</a>
    </div>
</header>

<form class="container mx-auto px-5" method="POST" enctype="multipart/form-data">
    <v bind:this={container}>
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center rounded=lg cursor-point">
            <div class="flex flex-col items center justify center pt-5 pb-6">
                {#if showImage}
                <img bind:this={image} src="" alt="Preview" />
                {:else}
                <svg class="h-8 w-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"></svg>
                <p class="text-sm text-gray-500 font-semibold">Click To Upload</p>
                {/if}
            </div>
            <input bind:this={input} on:change={onChange} name="image" id="dropzone" type="file" accept="image/png" class="hidden" required/>
        </label>
    </v>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
	v {
    max-width: auto;
    max-height: auto;
    border: 2px dashed #ddd;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #ccc;
  }
  img {
    width: 100%;
  }
</style>