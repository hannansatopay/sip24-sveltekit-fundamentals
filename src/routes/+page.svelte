<script>
    import {onMount} from 'svelte'
    export let data;
    let selectedImage = null;

    function openImageViewer(imageBase64) {
        selectedImage = imageBase64;
    }

    function closeImageViewer() {
        selectedImage = null;
    }
    function applyGrayscale() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = function() {
           
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;       // Red
                data[i + 1] = avg;   // Green
                data[i + 2] = avg;   // Blue
            }

            ctx.putImageData(imageData, 0, 0);
            selectedImage = canvas.toDataURL();
        };

        img.src = selectedImage;
    }

    onMount(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                closeImageViewer();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });
</script>
<style>
 
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        max-width: 90%;
        max-height: 90%;
    }

    .modal-image {
        max-width: 100%;
        max-height: 100%;
    }
</style>

<header class= "bg-white py-4 shadow-md sticky top-0 z-10">
    <div class ="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Cosmic_Sans_MS"> Craftlab </h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">Add Post</a>

    </div>
</header>


<div class="container mx-auto md:my-5">
    <div class="grid-cols-1 md:grid-cols gap-4">
        
        {#each data.posts as post }
        <div class="bg-white shadow-md rounded-lg overflow-hidden cursor -pointer" on:click={()=>openImageViewer(post.image)}>
            <img class="w-full " src="data:image;base64,{post.image} " alt="Post">
            <div class="text-sm py-2 ">
                <span class="font-bold">{post.username}</span>
                <span class="text-gray-700">{post.content}</span>
            </div>
        </div>      
        {/each}
    </div>
    {#if selectedImage}
    <div class="modal" on:click={closeImageViwer}>
        <div class="modal-content">
            <img src="data:image;base64,{selectedImage}" alt="Selected Image" class="modal-image">
        </div>
        <button onclick={applyGrayscale} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Apply Grayscale Filter</button>

    </div>
    {/if}
</div>