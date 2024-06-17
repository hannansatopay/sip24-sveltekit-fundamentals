<script>
    import { onMount } from 'svelte';

    export let data;
    let theme = 'light';
    let sort = 'desc'; // default sort order

    onMount(() => {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme = savedTheme;
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }

    async function likePost(postId) {
        const response = await fetch('/like-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
        });

        if (response.ok) {
            const post = data.posts.find(post => post.id === postId);
            if (post) {
                post.likes += 1;
            }
        } else {
            console.error('Failed to like post');
        }
    }

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

    function changeSort(order) {
    sort = order;
    // Reload the page with new sort order as a query parameter
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('sort', sort);
    window.location.search = searchParams.toString();
    }

</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10 dark:bg-dark">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-5xl font-semibold font-['Billabong'] dark:text-white">Craftlab</h1>
        <div class="flex items-center">
            <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Add post</a>
            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={theme === 'dark'} on:change={toggleTheme}/>
                <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer dark:bg-gray-700"></label>
            </div>
            <!--<select value={sort} on:change={(e) => changeSort(e.target.value)}>
                <option value="desc">Latest First</option>
                <option value="asc">Oldest First</option>
            </select>  -->                      
            <span class="ml-2 text-gray-700 dark:text-gray-300">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post}
            <div class="border rounded-lg shadow-md overflow-hidden dark:border-gray-200 dark:bg-dark">
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="p-4 dark:bg-dark">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-bold dark:text-white">{post.username}</span>
                        <div>
                            <button on:click={() => likePost(post.id)} class="text-red-500 hover:text-red-700">
                                <svg class="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.172 2.172a4 4 0 015.656 0L10 3.344l1.172-1.172a4 4 0 115.656 5.656L10 16.828 3.172 8.828a4 4 0 010-5.656z" />
                                </svg>
                                {post.likes}
                            </button>
                            <button on:click={() => deletePost(post.id)} class="text-red-500 hover:text-red-700 ml-2">
                                <svg class="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2a1 1 0 00-1 1v1H2v2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1V4h-3V3a1 1 0 00-1-1H6zm1 3v9h6V5H7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300">{post.content}</p>
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
