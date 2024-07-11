<!-- src/components/AddPost.svelte -->

<script>
    import { createEventDispatcher } from 'svelte';
    import { createPost } from 'C:/GitHub/sip24-sveltekit-fundamentals/src/routes/db';
  
    
  let username = '';
  let caption = '';
  let imageFile = null;
  let imageUrl = '';
  let showPreview = false;

  const dispatch = createEventDispatcher();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !caption || !imageFile) {
      alert('Please fill out all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('caption', caption);
    formData.append('imageFile', imageFile);

    try {
      const newPost = await createPost(formData);
      console.log('New post created:', newPost);
      dispatch('submitPost', newPost);
      alert('Post submitted successfully!');
      username = '';
      caption = '';
      imageUrl = '';
      imageFile = null;
      showPreview = false;
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to submit post. Please try again.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      imageFile = file;
      showPreview = false;
      console.log('Image file selected:', imageFile);
    } else {
      alert('Only PNG and JPG images are allowed');
      event.target.value = '';
    }
  };

  const handlePreview = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        imageUrl = reader.result;
        showPreview = true;
        console.log('Previewing image:', imageUrl);
      };
      reader.readAsDataURL(imageFile);
    } else {
      alert('Please select an image file first');
    }
  };

  const handleClosePreview = () => {
    showPreview = false;
    console.log('Closing preview');
  };
</script>

<main class="min-h-screen bg-gray-100 p-4">
  <header class="bg-white p-4 shadow mb-4 rounded flex justify-between items-center">
    <h1 class="text-xl font-bold text-gray-800">Add a New Post</h1>
    <a href="/" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Home</a>
  </header>

  <form on:submit={handleSubmit} class="bg-white p-6 rounded shadow-lg space-y-4">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
      <input type="text" id="username" bind:value={username} required class="mt-1 p-2 block w-full border border-gray-300 rounded"/>
    </div>
    <div class="mt-4">
      <label for="imageFile" class="block text-sm font-medium text-gray-700">Select Image (PNG or JPG)</label>
      <input type="file" id="imageFile" accept=".png, .jpg, .jpeg" on:change={handleFileChange} required class="mt-1 p-2 block w-full border border-gray-300 rounded"/>
    </div>
    <div class="mt-4">
      <button type="button" on:click={handlePreview} class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Preview Image</button>
      {#if imageUrl && showPreview}
        <button type="button" class="ml-4 text-gray-500 hover:text-gray-700" on:click={handleClosePreview}>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      {/if}
    </div>
    {#if showPreview}
      <div class="mt-4">
        <div class="flex justify-center">
          <div class="w-full h-96 border border-gray-300 rounded-lg overflow-hidden relative">
            <img src={imageUrl} alt="Selected Image" class="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    {/if}
    <div class="mt-4">
      <label for="caption" class="block text-sm font-medium text-gray-700">Caption</label>
      <textarea id="caption" bind:value={caption} required class="mt-1 p-2 block w-full border border-gray-300 rounded"></textarea>
    </div>
    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Post</button>
    </div>
  </form>
</main>

<style>
  /* Custom styles can be added here */
</style>
