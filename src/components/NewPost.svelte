<!-- components/NewPost.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { addPost } from '../lib/db.js';
    import { navigate } from 'svelte-routing';
  
    const dispatch = createEventDispatcher();
    let content = '';
    let userImage = '';
    let selectedFile = null;
    let postPreview = null;
  
    function handleFileChange(event) {
      selectedFile = event.target.files[0];
      previewPost(selectedFile);
    }
  
    function previewPost(file) {
      const reader = new FileReader();
      reader.onload = () => {
        postPreview = reader.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  
    async function handleSubmit() {
      if (content && selectedFile) {
        const reader = new FileReader();
        reader.onload = async () => {
          const newPost = {
            content,
            userImage,
            image: selectedFile.type.startsWith('image/') ? reader.result : null,
            video: selectedFile.type.startsWith('video/') ? reader.result : null,
            videoType: selectedFile.type.startsWith('video/') ? selectedFile.type : null,
            user: 'new_user', // Replace with actual user data
          };
          try {
            await addPost(newPost);
            dispatch('addpost', newPost);
            content = '';
            userImage = '';
            selectedFile = null;
            postPreview = null;
            navigate('/');
          } catch (error) {
            console.error('Failed to add post', error);
          }
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  </script>
  
  <div class="max-w-2xl p-4 mx-auto">
    <form on:submit|preventDefault={handleSubmit} class="p-4 mb-4 bg-white border border-gray-200 rounded-lg">
      <textarea bind:value={content} placeholder="What's on your mind?" class="w-full p-2 mb-2 border border-gray-300 rounded" rows="3"></textarea>
      <input type="file" accept="image/*,video/*" on:change={handleFileChange} class="w-full p-2 mb-2 border border-gray-300 rounded" />
      {#if postPreview}
        {#if selectedFile.type.startsWith('image/')}
          <img src={postPreview} alt="Post Preview" class="h-auto max-w-full mb-2 rounded-lg" />
        {:else if selectedFile.type.startsWith('video/')}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video controls class="w-full">
            <source src={postPreview} type={selectedFile.type} />
            Your browser does not support the video tag.
          </video>
        {/if}
      {/if}
      <input type="text" bind:value={userImage} placeholder="User Image URL" class="w-full p-2 mb-2 border border-gray-300 rounded" />
      <button type="submit" disabled={!content || !selectedFile} class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">Post</button>
    </form>
  </div>
  
  <style>
    /* Add Tailwind CSS or custom styles as needed */
  </style>