<!-- FilterControls.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let selectedImage;

  const dispatch = createEventDispatcher();

  function applyFilter(filterType) {
    dispatch('applyFilter', { filterType });
  }
</script>

<div>
  <h3>Selected Image: {selectedImage.name}</h3>
  <button on:click={() => applyFilter('grayscale')}>Grayscale</button>
  <button on:click={() => applyFilter('sepia')}>Sepia</button>
</div>
