<script>
    export let data;
</script>

<header class="bg-red-50 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS'] text-black-700">InstaX</h1>
        <a href="/add-post" class="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>


   <div class="bg-lime-100 min-h-screen"> 
    <!-- <div class="bg-gray-900 min-h-screen"> -->
    <div class="container ml-40">
        <div class="flex flex-col items-center gap-4">
            {#each [...data.posts].reverse() as post}
                <div class="mt-4 w-96 mr-72">
                    <div class="bg-white mr-40 w-96 h-auto pb-4">
                        <div class="flex items-center justify-between px-4 py-3 border-b">
                            <span class="font-semibold text-gray-800 text-lg">{post.username}</span>
                        </div>
                        <!-- <img class="px-3 w-full h-96 object-cover mb-2" src="data:image;base64,{post.image}" alt="Post"> -->
                        <img class="px-3 w-full h-96 object-cover mb-2" src="data:image;base64,{post.image}" alt="Post" style="filter: {post.imageFilter};">
                        <div class="flex items-center pl-4"> 
                            <span class="mr-3">❤️</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="20" viewBox="0 0 50 50" class="mr-2"> 
                                <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17" height="17" viewBox="0 0 30 30">
                                <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
                            </svg>
                        </div>
                        <div class="text-sm text-left px-2 py-2">
                            <span class="text-gray-700 leading-relaxed">{post.content}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
