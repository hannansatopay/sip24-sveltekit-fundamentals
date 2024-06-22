<script>
    export let data;
</script>

<style>
    .bg-custom-blue {
        background-color: #bbd4de8f;
    }
    .text-custom-white {
        color: #FFFFFF;
    }
    .bg-custom-blue-darker {
        background-color: #094869;
    }
    .text-custom-blue-darker{
        text-color: #094869;
    }
</style>

<header class="bg-opacity-75 bg-custom-blue py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-custom-blue-darker font-['Comic-Sans-MS']">Craftlab</h1>
        <a href="/add-post" class="bg-custom-blue-darker hover:bg-blue-700 text-custom-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.posts as post}
            <div class="bg-custom-blue bg-opacity-75 shadow-md rounded-lg overflow-hidden">
                <img class="mx-auto w-80 h-80 object-cover py-4 px-4" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4 h-25 bg-white">
                    <span class="font-bold text-custom-blue-darker"><strong>{post.username}</strong><br></span>
                    <span class="text-custom-blue-darker"><small>{post.content}</small></span>
                </div>
            </div>
        {/each}
    </div>
</div>
