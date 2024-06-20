<script>
  let files = null;
  let imageUrl = null;
  let selectedFilter = "none";

  function handleFileChange(event) {
    files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function applyFilter(filter) {
    selectedFilter = filter;
  }

  function getFilterStyle(filter) {
    switch (filter) {
      case "none":
        return "none";
      case "clarendon":
        return "contrast(1.5) saturate(1.5)";
      case "gingham":
        return "brightness(1.1) hue-rotate(-10deg)";
      case "moon":
        return "grayscale(1) contrast(1.1)";
      case "lark":
        return "brightness(1.2) saturate(1.2)";
      case "reyes":
        return "brightness(1.2) sepia(0.22)";
      default:
        return "none";
    }
  }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
    <a
      href="/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Home</a
    >
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
  <label
    for="dropzone"
    class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      {#if imageUrl}
        <img
          class="image-preview"
          src={imageUrl}
          alt="Preview"
          style="filter: {getFilterStyle(selectedFilter)};"
        />
      {:else}
        <svg
          class="w-8 h-8 mb-4 text-gray-500"
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
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
      {/if}
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
    </div>
  </label>

  <!-- Filter Buttons -->
  <div class="filter-buttons">
    <button
      type="button"
      class="filter-button {selectedFilter === 'none' ? 'selected' : ''}"
      on:click={() => applyFilter("none")}>None</button
    >
    <button
      type="button"
      class="filter-button {selectedFilter === 'clarendon' ? 'selected' : ''}"
      on:click={() => applyFilter("clarendon")}>Clarendon</button
    >
    <button
      type="button"
      class="filter-button {selectedFilter === 'gingham' ? 'selected' : ''}"
      on:click={() => applyFilter("gingham")}>Gingham</button
    >
    <button
      type="button"
      class="filter-button {selectedFilter === 'moon' ? 'selected' : ''}"
      on:click={() => applyFilter("moon")}>Moon</button
    >
    <button
      type="button"
      class="filter-button {selectedFilter === 'lark' ? 'selected' : ''}"
      on:click={() => applyFilter("lark")}>Lark</button
    >
    <button
      type="button"
      class="filter-button {selectedFilter === 'reyes' ? 'selected' : ''}"
      on:click={() => applyFilter("reyes")}>Reyes</button
    >
  </div>

  <!-- Hidden field to store the selected filter -->
  <input type="hidden" name="filter" value={selectedFilter} />

  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
      >Username</label
    >
    <input
      name="username"
      id="username"
      type="text"
      class="bg-gray-200 border-gray-700 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    />
  </div>
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900"
      >Content</label
    >
    <textarea
      name="content"
      id="content"
      class="bg-gray-200 border-gray-700 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required
    ></textarea>
  </div>

  <button
    type="submit"
    class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-3"
    >Share</button
  >
</form>

<style>
  .filter-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .filter-button {
    background-color: #cbd5e0; /* Default background color */
    color: #1a202c; /* Default text color */
    padding: 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .filter-button:hover {
    background-color: #4a90e2; /* Hovered background color */
    color: white; /* Hovered text color */
  }
  .filter-button.selected {
    background-color: #2b6cb0; /* Selected background color */
    color: white; /* Selected text color */
  }
  .image-preview {
    width: 500px;
    height: 225px;
    object-fit: contain;
    margin-bottom: 0px;
  }
</style>
