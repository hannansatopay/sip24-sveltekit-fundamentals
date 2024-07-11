<script>
  import { getAllPosts } from 'C:/Github/sip24-sveltekit-fundamentals/src/routes/db';
  import { onMount } from 'svelte';

  let posts = [
      {
          id: 1,
          username: 'Yash Borkar',
          imageUrl: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2021/04/avengers-face-off.jpg?fit=990%2C557&ssl=1',
          caption: 'Avengers, assemble! 🚀🔥'
      },
      {
          id: 2,
          username: 'Prathamesh Kapadne',
          imageUrl: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/384000/384076.jpg',
          caption: 'From dreams to reality, India reigns supreme! 🇮🇳🏆✨'
      },
  ];

  onMount(async () => {
      const fetchedPosts = await getAllPosts();
      if (fetchedPosts.length > 0) {
          posts = fetchedPosts;
      }
      console.log('All posts:', posts);
  });
</script>

<main class="min-h-screen bg-blue-100 p-4">
  <header class="bg-blue-500 text-white p-4 shadow mb-4 rounded flex justify-between items-center">
    <h1 class="text-2xl font-bold">SocialGram By Yash Borkar</h1>
    <a href="/add-post" class="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300">Add Post</a>
  </header>

  {#each posts as post (post.id)}
  <div class="bg-white p-4 shadow mb-4 rounded">
    <h2 class="text-xl font-bold text-gray-800">{post.username}</h2>
    <img src={post.imageUrl} alt="Post Image" class="my-2 rounded-lg">
    <p class="text-gray-700">{post.caption}</p>
  </div>
{/each}
</main>

<style>
/* Custom styles */
</style>
