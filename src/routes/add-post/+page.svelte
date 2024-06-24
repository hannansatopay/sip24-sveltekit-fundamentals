<script>
    import { onMount } from 'svelte';
    
    let files = null;
    let imageUrl = '';
    let canvas;
    let ctx;

    function loadImage(event) {
        files = event.target.files;
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = imageUrl;
        }
        reader.readAsDataURL(files[0]);
    }

    function applyFilter(filter) {
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.filter = filter;
            ctx.drawImage(img, 0, 0);
            ctx.filter = 'none'; // Reset filter for next operation
        }
        img.src = imageUrl;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataUrl = canvas.toDataURL('image/png');
        const imageBlob = await fetch(dataUrl).then(res => res.blob());
        formData.set('image', imageBlob, 'image.png');
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            window.location.href = '/';
        }
    }

    onMount(() => {
        canvas = document.getElementById('imageCanvas');
        ctx = canvas.getContext('2d');
    });

</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center py-2 px-4 rounded">
        <h1 class="mt-1.5 mb-1.5  text-2xl font-bold font-['Comic_Sans_MS']">
            CraftLab
        </h1>
        <a href="/" class="mt-1.5 mb-1.5 hover:bg-container">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="home.png">
        </a>
    </div>
</header>

    <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" action="/add-post" on:submit={handleSubmit}>
        
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-60 border-2 border-black rounded-lg">
            <div class="flex flex-col items-center justify-center pt-5 pb-6 py-4 px-4 rounded">
                {#if files && files.length}
                    <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
                {:else}
                    <svg class="mt-10 w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M12 5v14m7-7H5"></path>
                    </svg>
                    <p class="mt-3 flex justify-center items-center text-sm text-black font-semibold font-['Comic_Sans_MS']">Click to upload</p>  
                {/if}
            </div>
            <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change={loadImage} required/>
        </label>

    <div class="mb-3">
        <label for="username" class= "mt-5 block mb-2 text-large font-bold font-['Comic_Sans_MS'] text-gray-900"> Username </label>
        <input name ="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-black text-bold rounded-lg block w-full p-2.5">
    </div>

    <div class='mb-3'>
        <label for="Content" class= "block mb-2 text-large font-bold font-['Comic_Sans_MS'] text-gray-900"> Content </label>
        <textarea name= "content" id="content" class="bg-gray-50 border border-gray-300 text-black text-bold rounded-lg block w-full p-2.5"></textarea>
    </div>

    <canvas class="bg-white mt-4 rounded-lg w-full" id="imageCanvas"></canvas>

    <footer class="py-4 sticky top-0 z-10">
        <div class="pl-1 mx-auto px-4 flex items-centre  py-2 px-4 rounded ">
            <h1>
            <button type="button" class="text-black bg-white hover:bg-blue-800 font-bold font-['Comic_Sans_MS'] rounded-lg text-sm px-5 py-2.5 border-2 border-black rounded-lg" on:click={() => applyFilter('grayscale(100%)')}>
                Grayscale
            </button>
            <button type="button" class=" text-black bg-white hover:bg-blue-800 font-bold font-['Comic_Sans_MS'] rounded-lg text-sm px-5 py-2.5 border-2 border-black rounded-lg" on:click={() => applyFilter('sepia(100%)')}>
                Sepia
            </button>
            </h1>
            <button type="submit" class="ml-1.5 hover:bg-blue-700 text-black font-bold py-1 px-3 rounded border-2 border-black rounded-lg z-10">
                <img src="send.png" alt="">
            </button>
        </div>
    </footer>   
</form>