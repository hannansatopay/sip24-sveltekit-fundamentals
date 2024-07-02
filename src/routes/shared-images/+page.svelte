<script>
    import { sharedImages } from '$lib/stores';
    import { onMount } from 'svelte';
  
    let images = [];
  
    onMount(() => {
      sharedImages.subscribe(value => {
        images = value;
      });
    });
  </script>
  
  <style>
    .shared-images {
      margin-top: 20px;
    }
    .shared-image {
      margin: 10px;
      border: 1px solid #ccc;
    }
  </style>
  
  <div class="shared-images">
    <h2>Shared Images</h2>
    {#each images as imageUrl}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="Shared Image" class="shared-image" />
    {/each}
  </div>
  