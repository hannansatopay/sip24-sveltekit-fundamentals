<script>
    export let data;
</script>

<header class=" p-4 shadow-md sticky top-0 z-10" style="background-color: #FFFAF0;">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']" style="background-color: #f9f9f9;">MyInsta</h1>
        <a href="/add-post" class="bg-pink-500 text-white font-bold py-2 px-4 hover:bg-pink-700 rounded">Add Post</a>
    </div>
</header>

<div class="container mx-auto p-5" style="background-color: #F0FFF0;">
    <div class="grid grid-cols-1 gap-8 justify-center">
        {#each data.posts as post}
            <div class="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                <span class="block text-xl font-bold text-indigo-600 p-5" style="color: #2F4F4F">{post.username}</span>
                <img class="w-11/12 mx-auto mt-4 rounded" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    
                    <span class="block text-gray-700 mt-2" style="color: #2F4F4F">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>


