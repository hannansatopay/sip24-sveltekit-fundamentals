<script>
    export let data;
</script>
<!-- Header -->
<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold font-comic-sans">Craftlab</h1>
      <a href="/add-post" class="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
  </header>
  
  <!-- Main Content -->
  <div class="container mx-auto my-5 px-5 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
     { #each data.posts as post}
      <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
        <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
        <div class="text-sm py-2">
          <span class="font-bold">{post.username}</span>
          <span class="text-gray-700">{post.content}</span>
        </div>
      </div>
     {/each}
      <!-- Post 2 -->
      <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
        <img class="w-full" src="https://picsum.photos/600" alt="Post">
        <div class="text-sm py-2">
          <span class="font-bold">Username:</span>
          <span class="text-gray-700">Lorem Ipsum Dolor Sit Amet</span>
        </div>
      </div>
  
      <!-- Post 3 -->
      <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
        <img class="w-full" src="https://picsum.photos/600" alt="Post">
        <div class="text-sm py-2">
          <span class="font-bold">Username:</span>
          <span class="text-gray-700">Lorem Ipsum Dolor Sit Amet</span>
        </div>
      </div>
    </div>
  </div>
  