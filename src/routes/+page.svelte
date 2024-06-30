<script>
    let title="Finstagram"
    export let data;
</script>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>

</head>

<header class="py-4 bg-white shadow-md ">
    <div class="container flex items-center justify-between px-4 mx-auto">
        <h1 class=" text-2xl font-bold font-['Comic_Sans_MS'] ">MyGram</h1>
        <a href="/add-post" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Add post</a>
    </div>
</header>
<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each data.posts as post }
        <div>
            <img class="w-full " src="data:image;base64,{post.image}" alt="no-bro">
            <div class="py-2 text-sm ">
                <span class="font-bold ">{post.username}</span>
                <span class="text-green-700 "> {post.content}</span>

            </div>
        </div>
        {/each}
        
    </div>
</div>