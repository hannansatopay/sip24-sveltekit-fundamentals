<script>
    //create list of usernames and with content
    export let data
   

    


</script>


<style>
    .no-scrollbar {
      /* Hide scrollbars for WebKit browsers */
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */
  
      /* Hide scrollbars for WebKit browsers */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  </style>

<header class="bg-white py-5 shadow-md mb-6 sticky top-0">
    <div class="container mx-auto p-1 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-sans">
            INSTAHUB 
        </h1>
        <div>
            <a class="p-3 bg-green-300 rounded-lg text-sm font-semibold" href='/add'>ADD</a>
        </div>
    </div>
</header>


<div class="container mx-auto ">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center ">
        {#each data.posts as post}
        <div class="w-[300px] md:w-[300px] md:h-[400px] bg-blue-200 p-2 rounded-md overflow-x-auto no-scrollbar">
            <img src="data:image;base64,{post.image} "alt="photos" class="object-cover w-[300px] md:w-[300px] md:h-[300px]">
            <div >
                <span class="text-gray-700 font-bold">Username:</span>
                <span >{post.username}</span>
                <p class="text-gray-500 text-sm max-h-[130px] w-full word-wrap ">{post.content}</p>
            </div>
        </div>
            {/each}
    </div>

</div>
