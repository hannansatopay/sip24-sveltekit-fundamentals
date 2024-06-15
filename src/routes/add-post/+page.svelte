<script>
    let files = null;
    let imageSrc = null;
    let canvas = null;
    let ctx = null;
  
    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageSrc = e.target.result;
  
          // Create and initialize canvas and context
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d');
  
          drawImage();
        };
        reader.readAsDataURL(file);
        files = [file];
      }
    }
  
    function drawImage() {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageSrc;
    }
  
    function applyFilter(filterType) {
  if (!canvas || !ctx || !imageSrc) return;

  const img = new Image();
  img.onload = function () {
    console.log("Canvas width:", canvas.width, "height:", canvas.height); // Debug
    console.log("Image src:", imageSrc); // Debug
    console.log("Filter applied:", ctx.filter); // New debug line

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    ctx.filter = filterType;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = imageSrc;
}
  
    function resetCanvas() {
      canvas.width = 0;
      canvas.height = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      imageSrc = null;
    }
  </script>
  

<header class="bg-yellow-500 py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-sans">Craftlab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >Home</a
    >
  </div>
</header>

<form class="container mt-5 mx-auto p-8 bg-green-500 rounded" method="POST" enctype="multipart/form-data">
  <label
    for="dropzone"
    class="mb-6 flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-inner"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if files && files.length}
        <canvas bind:this={canvas} class="hidden"></canvas>
        <img
          src={imageSrc}
          alt="Uploaded Image"
          class="mb-4 max-h-48 max-w-full rounded-lg shadow-md"
        />
        <div class="flex space-x-4">
          <button
            type="button"
            class="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded transition-colors duration-300"
            on:click={() => applyFilter("grayscale")}>Grayscale</button
          >
          <button
            type="button"
            class="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded transition-colors duration-300"
            on:click={() => applyFilter("sepia")}>Sepia</button
          >
        </div>
      {:else}
        <svg
          class="w-10 h-10 mb-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
    </div>
    <input
      bind:files
      name="image"
      id="dropzone"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
      required
      on:change={handleFileChange}
    />
  </label>
  <div class="mb-6">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
      >Username</label
    >
    <input
      name="username"
      id="username"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
    />
  </div>
  <div class="mb-6">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
      >Content</label
    >
    <textarea
      name="content"
      id="content"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
    ></textarea>
  </div>
  <button
    type="submit"
    class="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded transition-colors duration-300"
    >Share</button
  >
</form>
