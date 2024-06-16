<script>
  import { onMount } from 'svelte';
  import ImageEditor from '../components/ImageEditor.svelte';
  export let data;
  let selectedPost = null;

  function handlePostClick(post) {
    selectedPost = post;
  }
</script>

<main>
  {#if selectedPost}
    <ImageEditor {selectedPost} />
  {/if}
</main>

<header class="bg-white py-4 shadow-md sticky top-0 z-10 flex justify-between items-center px-4">
  <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
  <a href="add-post" class="ml-auto">
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Add post
    </button>
  </a>
</header>

<div class="container mx-auto mt-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each data.posts as post (post.id)}
      <button class="bg-white rounded shadow-md p-4 cursor-pointer" on:click={() => handlePostClick(post)}>
        <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
        <div class="text-sm py-2">
            <span class="font-bold">{post.username}</span>
            <span class="text-gray-700">{post.content}</span>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .font-comic-sans {
    font-family: 'Comic Sans MS', cursive;
  }
</style>
