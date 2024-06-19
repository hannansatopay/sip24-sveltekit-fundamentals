<script>
    export let data;
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    onMount(() => {
        const header = document.querySelector('header');
        const stickyClass = 'stuck';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add(stickyClass);
            } else {
                header.classList.remove(stickyClass);
            }
        });
    });
</script>

<style>
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    header {
        animation: fadeIn 1s ease-in-out;
    }

    /* Sticky header transition */
    .sticky {
        transition: background-color 0.3s ease;
    }

    .sticky.stuck {
        background-color: rgba(255, 255, 255, 0.9);
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each data.posts as post, index}
            <div in:fade={{ delay: index * 100 }}>
                <img class="w-full" src="data:image;base64,{post.image}" alt="Post">
                <div class="text-sm py-2">
                    <span class="font-bold">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
            </div>
        {/each}
    </div>
</div>
