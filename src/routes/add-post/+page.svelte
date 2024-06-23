<script>
    import { onMount } from 'svelte';
    let selectedImage = null;
    let canvas, ctx;
    let files = null;

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width / 2; // Adjust canvas size
                canvas.height = img.height / 2; // Adjust canvas size
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                selectedImage = img;
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function applyFilter(filter) {
        if (!selectedImage) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height); // Redraw the image

        if (filter === 'grayscale') {
            ctx.filter = 'grayscale(100%)';
        } else if (filter === 'blur') {
            ctx.filter = 'blur(5px)';
        } else if (filter === 'clarendon') {
            ctx.filter = 'contrast(1.5) saturate(1.25)';
        } else if (filter === 'sharpen') {
            ctx.filter = 'contrast(200%)';
        } else if (filter === 'blackAndWhite') {
            ctx.filter = 'grayscale(100%) contrast(200%)';
        } else if (filter === 'mayfair') {
            ctx.filter = 'contrast(1.1) saturate(1.1) brightness(1.15)';
        } else if (filter === 'juno') {
            ctx.filter = 'contrast(1.15) saturate(1.8)';
        } else if (filter === 'sierra') {
            ctx.filter = 'contrast(0.8) saturate(1.2) sepia(0.15)';
        } else {
            ctx.filter = 'none';
        }
        ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none'; // Reset filter
    }

    function clearFilter() {
        if (!selectedImage) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height); // Redraw the image
    }

    onMount(() => {
        canvas = document.getElementById('imageCanvas');
        ctx = canvas.getContext('2d');
    });
</script>

<style>
    .header {
        background-color:#5851DB;
        color:white;
    }
body{
    background-image:url(https://th.bing.com/th/id/OIP.5dSi0zCpBrYxg1gwbe1IhgHaEo?rs=1&pid=ImgDetMain);
    background-repeat: no-repeat;
    background-size: cover;
}
    

    .button {
        transition: background-color 0.3s;
    }

    .button:hover {
        filter: brightness(90%);
    }

    .canvas-container {
        background-color: rgba(229, 231, 235, 0.8);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }
</style>
<body>
<header class="header py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Instagram</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="container mx-auto my-5 canvas-container">
        <h2 class="text-xl font-bold mb-4">Image Editor</h2>
        <button type="button" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 button" on:click="{() => document.getElementById('dropzone').click()}">Upload Image</button>
    <input bind:files="{files}" name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" on:change="{handleImageUpload}" required/>
        <canvas id="imageCanvas" class="w-full border mt-4"></canvas>
        <div class="mt-4 flex flex-wrap gap-2">
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('grayscale')}">Grayscale</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('blur')}">Blur</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('clarendon')}">Clarendon</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('sharpen')}">Sharpen</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('blackAndWhite')}">Black and White</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('mayfair')}">Mayfair</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('juno')}">Juno</button>
            <button class="bg-gray-600 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{() => applyFilter('sierra')}">Sierra</button>
            <button class="bg-red-500 text-white font-bold py-2 px-4 rounded button" type="button" on:click="{clearFilter}">Clear Filter</button>
        </div>
    </div>

    

    <div>    
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required/>
    </div>
    <div>    
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></textarea><br>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 button">Share</button>
</form>
</body>
