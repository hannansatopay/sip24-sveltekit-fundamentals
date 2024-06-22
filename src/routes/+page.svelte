<script>
    export let data;
    
    
</script>
<style>
    @keyframes gradientBackground {
  0% {
    background-color: #85FFBD;
    background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
  }
  50% {
    background-color: #FFFB7D;
    background-image: linear-gradient(45deg, #FFFB7D 0%, #85FFBD 100%);
  }
  100% {
    background-color: #85FFBD;
    background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
  }
}

  body {
    animation: gradientBackground 10s ease infinite;
    background-size: 400% 400%;
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
  }
</style>
<body>
    <header class="sticky top-0 z-10 py-4 bg-white shadow-md">
    <div class="container flex items-center justify-between px-4 mx-auto ">
        <h1 class="text-2xl font-bold" style="font-family:Verdana, Geneva, Tahoma, sans-serif;">CraftLab</h1>
        <a href="/addpost"><button type="button" class="px-3 py-2 text-sm font-bold text-center text-white rounded-lg bg-gradient-to-r from-blue-200 via-blue-400 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-600 ">Add Post</button></a>
    </div>
</header>

<div class="container mx-auto md:my-5 ">
    <div class=" flex gap-8 flex-wrap  h-screen py-10">
        {#each data.posts as post}
            <div class="transform  rounded-xl h-40 w-40 sm:h-64 sm:w-64 bg-white shadow-xl transition duration-300 hover:scale-105">
                <img src="data:image;base64,{post.image}" alt="Post" class="w-full">
                <div class="py-2 text-sm">
                    <span class="font-bold ">{post.username}</span>
                    <br>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each} 
      

    </div>
</div>

</body>
