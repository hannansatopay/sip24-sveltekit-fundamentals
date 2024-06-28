<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';

    let imageSrc = '';
    let filter = '';
    let isLoading = false;
    let error = '';

    onMount(async () => {
        try {
            isLoading = true;
            const res = await fetch('/path/to/image');
            const blob = await res.blob();
            imageSrc = URL.createObjectURL(blob);
        } catch (err) {
            error = 'Failed to fetch image.';
        } finally {
            isLoading = false;
        }
    });

    function applyFilter(type) {
        filter = type;
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
            ctx.filter = type;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageSrc;
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add post</a>
    </div>
</header>

<div class="container mx-auto md:my-5">
    {#if isLoading}
        <p>Loading...</p>
    {:else if error}
        <p>{error}</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <canvas id="imageCanvas" class="w-full" width="800" height="600"></canvas>
            </div>
            <div>
                <button on:click={() => applyFilter('grayscale')} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Grayscale</button>
                <button on:click={() => applyFilter('sepia')} class="bg-yellow-300 hover:bg-yellow-400 text-yellow-800 font-bold py-2 px-4 rounded">Sepia</button>
            </div>
        </div>
    {/if}
</div>


