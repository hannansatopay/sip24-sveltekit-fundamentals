
<script>
  import { onMount, afterUpdate } from 'svelte';

  export let imageSrc;

  let canvas;
  let ctx;

  onMount(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  });

  afterUpdate(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = 'none'; 
        ctx.drawImage(img, 0, 0);
      };
      img.src = imageSrc;
    }
  });
</script>

<canvas />
