<script>
    export let data;
</script>

<header class="bg-pink-100 bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="font-bold text-5xl text-pink-500 font-['yourFont']"><i>Picslab</i></h1>
        <a href="/add-post"  class="mt-3 bg-pink-500 border border-pink-900 hover:bg-purple-400 text-white font-bold py-3 px-5 rounded-lg">Add post</a>
    </div>
</header>

<main >
<div class="container mx-auto md:my-5">
    <div class=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div>
                <img class="ml-10 border border-pink-500 rounded-lg w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="mb-5 text-sm py-2">
                    <span class="ml-11 font-bold text-2xl font-['yourFont'] text-pink-500 ">{post.username}</span>
                    <span class="ml-16 text-2xl font-['yourFont'] text-pink-500 " >{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>
</main>
