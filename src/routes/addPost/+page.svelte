<script>
  let files = null,
    filter = 0;
  async function showImg(val) {
    filter = val;
    const userInput = document.getElementById("dropzoneInp");
    let file = userInput.files[0];
    let dpi = window.devicePixelRatio;
    let canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    console.log("showImg");
    function fix_dpi() {
      let style_height = +getComputedStyle(canvas)
        .getPropertyValue("height")
        .slice(0, -2);
      let style_width = +getComputedStyle(canvas)
        .getPropertyValue("width")
        .slice(0, -2);
      canvas.setAttribute("height", style_height * dpi);
      canvas.setAttribute("width", style_width * dpi);
    }
    if (file) {
      let imgURL = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        fix_dpi();
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (val == 0) {
          ctx.filter = "none";
        } else if (val == 1) {
          ctx.filter = "grayscale()";
        } else if (val == 2) {
          ctx.filter = "sepia()";
        } else if (val == 3) {
          ctx.filter = "invert()";
        }
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
        canvas.toBlob((blob) => {
          const newFile = new File([blob], file.name, { type: file.type });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(newFile);
          document.getElementById("dropzone").files = dataTransfer.files;
        }, file.type);
      };
      img.src = imgURL;
    } else {
      alert("No file detected, please insert a file.");
    }
  }
</script>

<header class="shadow-md shadow-gray-600 sticky z-10 bg-white top-0 w-full">
  <div class="flex flex-row justify-between items-center py-2 px-3 font-mono">
    <p class="text-2xl font-bold">Craftlab</p>
    <a
      href="/"
      class="bg-blue-500 px-2 py-1 rounded-lg text-white font-bold hover:scale-105 hover:shadow-md hover:shadow-gray-300"
      >Home</a
    >
  </div>
</header>

<div
  class="p-5 max-w-[425px] container grid grid-cols-1 items-center mx-auto my-5 bg-gray-200 rounded-lg"
>
  <label
    for="dropzone"
    class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 p-5"
  >
    <div class="flex flex-col items-center justify-center">
      {#if files && files.length != 0}
        <canvas class="w-full h-[225px]" id="canvas"></canvas>
        <p>{files[0].name}</p>
      {:else}
        <svg
          class="w-8 h-8 mb-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
          ><path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          /></svg
        >
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
    </div>
    <input
      name="imageInp"
      id="dropzoneInp"
      type="file"
      accept="image/png, image/jpeg"
      class="opacity-0 w-full h-full"
      bind:files
      on:change={() => showImg()}
      required
    />
  </label>
</div>

<form
  class="p-5 max-w-[425px] container grid grid-cols-1 items-center mx-auto my-5 bg-gray-200 rounded-lg"
  method="POST"
  enctype="multipart/form-data"
  id="postForm"
  name="postForm"
>
  <input type="file" class="hidden" name="image" id="dropzone" />
  {#if files && files.length != 0}
    <div class="flex flex-row mb-5 justify-evenly w-full">
      <button
        class="{filter == 0
          ? 'bg-blue-700'
          : 'bg-blue-500'} py-2 rounded-lg text-white font-mono w-20 hover:scale-105 hover:shadow-md hover:shadow-gray-400 text-[13px]"
        on:click={() => showImg(0)}>Original</button
      >
      <button
        class="{filter == 1
          ? 'bg-blue-700'
          : 'bg-blue-500'} py-2 rounded-lg text-white font-mono w-20 hover:scale-105 hover:shadow-md hover:shadow-gray-400 text-[13px]"
        on:click={() => showImg(1)}>Grayscale</button
      >
      <button
        class="{filter == 2
          ? 'bg-blue-700'
          : 'bg-blue-500'} py-2 rounded-lg text-white font-mono w-20 hover:scale-105 hover:shadow-md hover:shadow-gray-400 text-[13px]"
        on:click={() => showImg(2)}>Sepia</button
      >
      <button
        class="{filter == 3
          ? 'bg-blue-700'
          : 'bg-blue-500'} py-2 rounded-lg text-white font-mono w-20 hover:scale-105 hover:shadow-md hover:shadow-gray-400 text-[13px]"
        on:click={() => showImg(3)}>Invert</button
      >
    </div>
  {/if}

  <div class="flex flex-col gap-1">
    <label for="username" class="font-mono text-lg">Username</label>
    <input
      type="text"
      class="bg-gray-100 border border-black rounded-lg w-full h-8 px-3 py-1 font-mono"
      id="username"
      name="username"
      required
    />
  </div>
  <br />
  <div class="flex flex-col gap-1">
    <label for="content" class="font-mono text-lg">Content</label>
    <textarea
      type="text"
      class="bg-gray-100 border border-black rounded-lg w-full h-12 py-1 px-3 font-mono"
      id="content"
      name="content"
      required
    />
  </div>
  <br />
  <button
    class="bg-blue-500 px-3 py-2 rounded-lg text-white text-md font-mono font-bold hover:scale-105 hover:shadow-md hover:shadow-gray-400 max-w-20"
    >Post</button
  >
</form>

<style>
</style>
