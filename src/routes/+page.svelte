<script>
  import PostCard from "../lib/PostCard.svelte";
  export let data;
</script>

<div class="w-full flex flex-col items-center">
  <h1>POSTS</h1>
  <div class="flex flex-col gap-4 justify-center items-center w-1/2">
    {#each data.posts as post}
      <PostCard
        username={post.username}
        imageUrl={post.image}
        content={post.content}
      />
    {/each}
  </div>
</div>
