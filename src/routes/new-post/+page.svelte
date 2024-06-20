<script>
  let fileName = '';
  let data = new FormData();

  function handleFileChange(event) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      fileName = file.name;
      data.set('image', file);
    } else {
      fileName = '';
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    data.set(name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(event.target.action, {
      method: event.target.method,
      body: data
    });
  }
</script>

<style>
  .hidden-input {
    display: none;
  }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold font-comic_sans_ms">
      <a href="/">Craftlab</a>
    </h1>
    <a href="/" class="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Home</a>
  </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit} action="/path/to/your/endpoint">
  <div class="mb-4">
    <input type="file" id="image" class="hidden-input" accept="image/jpeg, image/png" on:change={handleFileChange} required/>
    <label for="image" class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-5 text-center">
      {#if fileName}
        <span>{fileName}</span>
      {:else}
        <span>Click to upload image (JPG or PNG)</span>
      {/if}
    </label>
  </div>
  <div class="mb-3">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
    <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 on:change={handleInputChange} required"/>
  </div>
  <div class="mb-3">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
    <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 on:change={handleInputChange} required"></textarea>
  </div>
  <button type="submit" class="bg-blue-700 hover:bg-blue-900 rounded-lg px-5 text-white font-medium text-sm py-2.5">Post</button>
</form>