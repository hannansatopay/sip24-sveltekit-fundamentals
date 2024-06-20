<script>
    export let data;
</script>

<header class="px-4 m-auto container shadow-lg">
    <div class="container flex justify-between items-center align-middle">
        <div class="font-bold text-4xl p-2">
            Instagram
        </div>
        <a href="/createPost" class="border-2 border-black h-10 px-6 font-bold rounded-lg grid place-items-center ">Create Post</a>
    </div>
</header>

<main class="container p-4 grid grid-cols-1 sm:grid-cols-3 ">
    {#each data.posts as post}
    <div class="w-9/12 m-auto">
        <div class="block ">
            <span class="font-bold text-md block ">{post.username}</span>
            <span class="text-sm block">{post.location}</span>
        </div>

        <div class="w-full h-72 ">
            <img  src="data:image;base64,{post.image}" alt="Post" class="w-full h-full">
        </div>

        <section>
            <span class="font-bold">{post.username}</span>
            <span class="text-sm text-gray-700">{post.content}</span>
        </section>

    </div>
    {/each}
</main>