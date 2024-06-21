<script>
	export let data;
  
	async function deletePost(postId) {
	
	  const confirmation = confirm("Are you sure you want to delete this post?");
	  if (confirmation) {
		const response = await fetch(`/api/posts/${postId}`, {
		  method: "DELETE"
		});
		if (response.ok) {
		  // Optionally handle success (e.g., show a message, update UI)
		  // You may need to refresh data or remove the deleted post from the UI.
		  // Example: You may need to reload the page or update state to reflect changes.
		  console.error("post deleted",postId);
		} else {
		  // Handle error, if needed
		  console.error("Failed to delete post");
		}
	  }
	}
  </script>
  
  <header class="bg-white py-4 shadow-md sticky top-0 z-10">
	<div class="container mx-auto px-4 flex justify-between items-center">
	  <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
	  <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
	</div>
  </header>
  
  <div class="container mx-auto md:my-5">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	  {#each data.posts as post (post.id)}
		<div>
		  <img class="w-full" src={`data:image;base64,${post.image}`} alt="Post" />
		  <div class="text-sm py-2">
			<span class="font-bold">{post.username}</span>
			<span class="text-gray-700">{post.content}</span>
		  </div>
		  <a href="/" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" on:click={() => deletePost(post.id)}>Delete</a>
		</div>
	  {/each}
	</div>
  </div>
  