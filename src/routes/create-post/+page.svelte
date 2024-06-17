<script>
  import { default as Icon } from "@iconify/svelte";
  let files = null;
  let imageUrl = null;

  $: if (files && files.length) {
    imageUrl = URL.createObjectURL(files[0]);
  }
</script>

<div class="w-full flex flex-col items-center justify-center">
  <h1 class="text-xl h-12 flex items-center">ADD POST</h1>
  <form
    method="POST"
    enctype="multipart/form-data"
    class="flex flex-col bg-white-500 gap-10 h-full w-1/3 border-2 border-white justify-between p-12"
  >
    <label for="dropzone" class="flex justify-center h-full">
      <div
        class="border-2 border-slate-500 flex flex-col justify-center items-center h-full w-96 cursor-pointer"
      >
        {#if imageUrl}
          <img
            src={imageUrl}
            alt="Selected image"
            class="h-full w-full object-cover"
            aria-hidden="true"
          />
        {:else}
          <div class="bg-white">
            <div class="flex justify-center">
              <Icon icon="bx:upload" />
            </div>
            <p>"Click to Upload"</p>
          </div>
        {/if}
      </div>
      <input name="image" bind:files id="dropzone" type="file" class="hidden" />
    </label>
    <div>
      <div name="username">Guest</div>
      <textarea
        name="content"
        id="content"
        class="bg-slate-50 text-black p-2 w-full"
        placeholder="Add a caption..."
      ></textarea>
      <div class="flex justify-center">
        <button
          type="submit"
          class="hover:text-black bg-slate-500 hover:bg-slate-300 w-32 h-10 rounded-md"
          >POST</button
        >
      </div>
    </div>
  </form>
</div>
