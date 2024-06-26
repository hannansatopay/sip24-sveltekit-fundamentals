<script>
    export let data;

    function downloadImage(imageData, imageName) {
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<style>
    .image-card {
        position: relative;
        overflow: hidden;
    }

    .image-card:hover .download-overlay {
        opacity: 1;
    }

    .download-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(26, 25, 25, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .download-overlay img {
        width: calc(100% - 20px); /* Reduce width by 10px on each side */
        max-width: 60px; /* Maximum width of 40px */
        height: auto;
    }

    .bg-sky-blue {
        background-color: #22befb; /* Sky blue color */
    }
</style>

<header class="bg-white py-3 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">InstaGallery</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-sky-blue">Add post</a>
    </div>
</header>

<div class="container md:my-5">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mx-20 my-12">
        {#each data.posts as post}
            <div class="bg-white shadow-md overflow-hidden image-card">
                <img class="w-full h-56 object-cover" src="data:image;base64,{post.image}" alt="Post">
                <div class="download-overlay">
                    <a href="#" class="text-blue-500 hover:underline" style="text-decoration: none;" on:click={(event) => {
                        event.preventDefault();
                        downloadImage(post.image, 'post-image.jpg');
                    }}>
                        <img src="/src/images/download8.png" alt="Download">
                        <p style="color: white; margin-left:-10px">Download</p>
                    </a>
                </div>
                <div class="px-4 py-3">
                    <h2 class="text-lg font-semibold">{post.username}</h2>
                    <p class="text-gray-700">{post.content}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
