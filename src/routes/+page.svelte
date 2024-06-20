<script>
   
    export let data
   
    
</script>


<style>
    .no-scrollbar {
      
      -ms-overflow-style: none;  
      scrollbar-width: none;  
  
     
      &::-webkit-scrollbar {
        display: none;
      }
    }
  </style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Sansinsta</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>


<div class="container mx-auto ">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center ">
        {#each data.posts as post}
        <div class="w-[300px] md:w-[300px] md:h-[400px] bg-blue-300 p-2 rounded-md overflow-x-auto no-scrollbar">
            <img src="data:image;base64,{post.image} "alt="Post" class="object-cover w-[300px] md:w-[300px] md:h-[300px]">
            <div >
                <span class="text-gray-700 font-bold">Username:</span>
                <span >{post.username}</span>
                <p class="text-gray-500 text-sm max-h-[130px] w-full word-wrap ">{post.content}</p>
            </div>
        </div>
            {/each}
    </div>

</div>