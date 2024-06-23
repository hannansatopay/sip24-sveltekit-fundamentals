<script>
    import { onMount } from "svelte";
    export let data;
    let theme = 'light';

    onMount(() => {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme = savedTheme;
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    });


    async function deletePost(postId) {
        const response = await fetch('/delete-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
        });

        if (response.ok) {
            // Remove the post from the local state to update UI
            data.posts = data.posts.filter(post => post.id !== postId);
        } else {
            console.error('Failed to delete post');
        }
    }


    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }


</script>
<header class="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
    <div class = "container mx-auto px-4 flex justify-between items-center">
        <h1 class=" text-white text-2xl font-bold font-['Comic_Sans_MS']">Metagram</h1>
        <div class="flex items-center">
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Add Post</a>

        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={theme === 'dark'} on:change={toggleTheme}/>
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer dark:bg-gray-700"></label>
        </div>
            <span class="ml-2 text-gray-700 dark:text-gray-300">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
        
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div class="mx-3 bg-white rounded-lg shadow-md overflow-hidden">
                <img class="w-full h-48 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold text-lg mr-2 text-gray-900">{post.username}</span>
                        <div>
                            <button on:click={() => deletePost(post.id)} class="text-black hover:text-red-700 ml-2">
                                <svg class="w-6 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2a1 1 0 00-1 1v1H2v2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1V4h-3V3a1 1 0 00-1-1H6zm1 3v9h6V5H7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-900">{post.content}</p>
                </div>
            </div>
        {/each}
    </div>
</div>


<style>
  .toggle-checkbox:checked {
    @apply right-0 border-blue-500;
  }
  
  .toggle-checkbox:checked + .toggle-label {
    @apply bg-blue-500;
  }
</style>
