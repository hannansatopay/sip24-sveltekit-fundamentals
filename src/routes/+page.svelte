
<script>
    export let data;
    let files=null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
            <img src="/instagram-logo.webp" alt="Instagram Logo" class="w-15 h-11">
            <h1 class="text-2xl ml-2 font-bold font-['Freight Sans']">Instagram</h1>
        </div>
        <div class="flex items-center">
            <a href="/add-post" class="text-sm bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg">Add post</a>
        </div>
    </div>
</header>


<form class="container mx-auto py-5">
    <h1 class="text-2xl ml-3 font-medium text-sm font-['Freight Sans']">Latest Trends</h1>
    <div class="container mx-auto py-5 md:my-10 ml-2">
        <div class="grid grid-cols-1 mx-auto md:grid-cols-3 gap-4 ml-3 mr-3">
            {#each data.posts as post}
                <div>
                    <img class="w-full rounded-lg" src="{post.imageData}" alt="Post">
                    <div class="text-sm py-1">
                        <span class="text-purple-800 font-bold">{post.username}</span>
                        <span class="text-black-800 font-medium">{post.content}</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</form>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

</style>
