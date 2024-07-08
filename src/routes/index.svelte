<script>
    import { goto } from '$app/navigation';
  
    async function postImage() {
      const canvas = document.querySelector('canvas'); // Assuming canvas is rendered in the component
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }
  
      const imageDataUrl = canvas.toDataURL(); // Convert canvas to base64 data URL
      const formData = new FormData();
      formData.append('image', imageDataUrl);
  
      try {
        const response = await fetch('/api/postImage', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          console.log('Image posted successfully');
          // Optionally, navigate to the homepage or perform other actions
          goto('/');
        } else {
          console.error('Failed to post image');
        }
      } catch (error) {
        console.error('Error posting image:', error);
      }
    }
  </script>
  
  <button on:click={postImage}>Post Image</button>
  