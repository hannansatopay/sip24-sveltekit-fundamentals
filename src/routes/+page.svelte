<script>
    export let data;
</script>
<header class="bg-white py-4 px-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">CraftLab</h1>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a href="/add-post" class="bg-red-500 hover:bg-red-800 px-4 py-2 font-bold rounded-lg">Add Post<a>
    </div>
</header>

<div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:my-5">
        {#each data.posts as post}
            <div>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post"> <!--this link generates random images-->
                <div class="text-sm py-2">
                    <span class="font-bold">{ post.username }</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
         {/each}
    </div>
</div>
