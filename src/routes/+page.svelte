<script>
    let posts = [
        {
            username: "Shristi ",
            content: "Wondeful World",
            image: "https://images.unsplash.com/25/puppy-love.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YmxhY2slMjBwdXBweXxlbnwwfHx8fDE3MTk0NzgxMjV8MA&ixlib=rb-4.0.3"
        },
        {
            username: "kanak Smith",
            content: "Nature at its best",
            image: "https://picsum.photos/701"
        },
        {
            username: "Ayaan",
            content: "Wonderful world",
            image: "https://picsum.photos/702"
        },
        {
            username: "Max",
            content: "Wonderful world",
            image: "https://picsum.photos/703"
        },
        {
            username: "Jannet",
            content: "Beautiful world",
            image: "https://picsum.photos/704"
        },
        {
            username: "Judy",
            content: "Beautiful world",
            image: "https://picsum.photos/705"
        }
    ];

    
    function addPost(post) {
        posts = [...posts, post];
    }

    
    import { onMount } from 'svelte';

onMount(() => {
    window.addEventListener('message', (event) => {
        if (event.data.type === 'new-post') {
            addPost(event.data.post);
        }
    });
});


    
    function likePost(event) {
        const heartIcon = document.createElement('div');
        heartIcon.innerHTML = '❤️';
        heartIcon.style.position = 'absolute';
        heartIcon.style.fontSize = '3rem';
        heartIcon.style.opacity = 1;
        heartIcon.style.transition = 'opacity 1s';
        event.target.parentElement.appendChild(heartIcon);

        setTimeout(() => {
            heartIcon.style.opacity = 0;
        }, 100);

        setTimeout(() => {
            heartIcon.remove();
        }, 1000);
    }
</script>

<style>
    body {
        background: linear-gradient(120deg, #ff69b4 0%, #ffb6c1 100%);
        font-family: Arial, sans-serif;
    }

    header {
        background-color: #ff69b4;
    }

    header h1 {
        font-size: 3rem;
        color: white;
        transition: transform 0.2s, color 0.2s, text-shadow 0.2s;
    }

    header h1:hover {
        transform: scale(1.1);
        color: #fff0f5;
        text-shadow: 0 0 10px #fff0f5;
    }

    .polaroid {
        background: white;
        padding: 15px 15px 30px 15px;
        border: 1px solid #bfbfbf;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-bottom: 30px;
        position: relative;
        transition: box-shadow 0.2s;
    }

    .polaroid:hover {
        box-shadow: 0 0 15px #ff69b4;
    }

    .polaroid img {
        max-width: 100%;
        height: auto;
    }

    .polaroid .content {
        padding: 10px 0;
        font-size: 0.9rem;
    }

    .polaroid .content .username {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }

    .actions button {
        background-color: transparent;
        border: none;
        color: #ff69b4;
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .actions button:hover {
        transform: scale(1.2);
    }

    .tweet, .blog-article {
        margin: 20px 0;
        padding: 20px;
        background: white;
        border: 1px solid #bfbfbf;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .tweet:hover, .blog-article:hover {
        box-shadow: 0 0 15px #ff69b4;
    }

    .tweet img, .blog-article img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .chat {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: white;
        border: 1px solid #bfbfbf;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        padding: 15px;
        cursor: pointer;
    }

    .chat:hover {
        box-shadow: 0 0 15px #ff69b4;
    }

    .chat-icon {
        font-size: 1.5rem;
        color: #ff69b4;
    }

    .blog-article h2 {
        color: #ff69b4;
    }

    .blog-article p {
        margin: 10px 0;
    }

    .blog-article a {
        color: #ff69b4;
        text-decoration: underline;
    }

    .blog-article a:hover {
        text-decoration: none;
    }

    .blog-container {
        display: flex;
        gap: 20px;
        overflow-x: auto;
    }

    .blog-container::-webkit-scrollbar {
        height: 10px;
    }

    .blog-container::-webkit-scrollbar-thumb {
        background-color: #ff69b4;
        border-radius: 5px;
    }
</style>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Social Media</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each posts as post}
            <div class="polaroid">
                <img src={post.image} alt="Post">
                <div class="content">
                    <span class="username">{post.username}</span>
                    <span class="text-gray-700">{post.content}</span>
                </div>
                <div class="actions">
                    <button on:click={likePost}>&#x2764;</button>
                    <button>&#x1f4e3;</button>
                </div>
            </div>
        {/each}
    </div>

    <div class="tweet">
        <img src="https://picsum.photos/600/200" alt="Tweet Image">
        <p><strong>@randomuser:</strong> Just had the most amazing coffee at a local cafe! #blessed</p>
    </div>

    <div class="blog-container">
        <div class="blog-article">
            <img src="https://picsum.photos/800/300" alt="Blog Image">
            <h2>5 Tips for a Healthier Lifestyle</h2>
            <p>Living a healthier life doesn't have to be difficult. Here are five simple tips to get you started...</p>
            <a href="/link" class="text-blue-500">Read more</a>
        </div>

        <div class="blog-article">
            <img src="https://picsum.photos/801/300" alt="Blog Image">
            <h2>The Ultimate Guide to Home Workouts</h2>
            <p>Don't have time for the gym? No problem! Follow this guide for the best home workout routines...</p>
            <a href="/link" class="text-blue-500">Read more</a>
        </div>

        <div class="blog-article">
            <img src="https://picsum.photos/802/300" alt="Blog Image">
            <h2>Exploring the Great Outdoors</h2>
            <p>Nature offers us so much beauty and adventure. Discover some of the best outdoor activities...</p>
            <a href="/link" class="text-blue-500">Read more</a>
        </div>
    </div>
</div>

<div class="chat">
    <span class="chat-icon">&#x1f4ac;</span>
</div>