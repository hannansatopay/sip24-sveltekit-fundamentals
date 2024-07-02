<script>
    import Post from './Post.svelte';
    import { onMount } from 'svelte';
    import { getAllPosts } from '../lib/db.js';
  
    let posts = [];
  
    onMount(async () => {
      try {
        posts = await getAllPosts();
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    });
  </script>
  
  <div class="max-w-2xl p-4 mx-auto">
    {#each posts as post}
      <Post {post} />
    {/each}
  </div>