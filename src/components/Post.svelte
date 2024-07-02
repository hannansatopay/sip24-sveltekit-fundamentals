<!-- components/Post.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { deletePost } from '../lib/db.js';
  
    export let post;
    const dispatch = createEventDispatcher();
  
    async function handleDelete() {
      try {
        await deletePost(post.id);
        dispatch('deletepost', post.id); // Emit delete event to parent component
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  </script>
  
  <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg">
    <h2 class="text-lg font-semibold">{post.user}</h2>
    <p class="text-gray-700">{post.content}</p>
    {#if post.image}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={post.image} alt="Post Image" class="mt-2 rounded-lg" />
    {:else if post.video}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video controls class="mt-2 rounded-lg">
        <source src={post.video} type={post.videoType} />
        Your browser does not support the video tag.
      </video>
    {/if}
    <div class="flex justify-end mt-2">
      <button class="px-3 py-1 text-white bg-red-500 rounded-md" on:click={handleDelete}>Delete</button>
    </div>
  </div>