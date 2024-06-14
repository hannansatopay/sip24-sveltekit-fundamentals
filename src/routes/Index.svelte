<!-- routes/Index.svelte -->
<script>
    import { onMount } from 'svelte';
    import { getAllPosts, addPost, deletePost } from '../lib/db.js';
    import Post from '../components/Post.svelte';
    import NewPost from '../components/NewPost.svelte';
  
    let posts = [];
  
    onMount(async () => {
      try {
        posts = await getAllPosts();
        posts.reverse(); // Reverse the order to display newest first
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    });
  
    // Function to handle adding a new post
    async function handleAddPost(newPost) {
      posts = [newPost, ...posts]; // Add new post to the beginning of the array
      await addPost(newPost); // Add new post to IndexedDB
    }
  
    // Function to handle deleting a post
    async function handleDeletePost(id) {
      posts = posts.filter(post => post.id !== id); // Update local posts array
      await deletePost(id); // Delete post from IndexedDB
    }
  </script>
  
  <div class="max-w-2xl p-4 mx-auto">
    <NewPost on:addpost={handleAddPost} />
    {#each posts as post (post.id)}
      <Post {post} on:deletepost={handleDeletePost} />
    {/each}
  </div>
  