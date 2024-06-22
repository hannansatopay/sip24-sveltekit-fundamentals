<script>
    let files = null;
    $: console.log(files);

    let imageUpload = false;
    let selectedFilter = '';
    let filterApplied = false;
    let originalImage = null;

    $: if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.getElementById('imageCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
                ctx.drawImage(img, 0, 0);
                imageUpload = true;
                filterApplied = false;
                selectedFilter = ''; // Reset filter when a new image is uploaded
                originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Store the original image data
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    }

    function selectFilter(filter) {
        if (selectedFilter !== filter) {
            selectedFilter = filter;
            applyFilter();
        }
    }

    function applyFilter() {
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        ctx.putImageData(originalImage, 0, 0); 
        if (selectedFilter !== 'none') {
            ctx.filter = getFilter(selectedFilter);
            ctx.drawImage(canvas, 0, 0); 
        } else {
            ctx.filter = 'none'; 
            ctx.drawImage(canvas, 0, 0); 
        }
        filterApplied = true; 
    }

    function getFilter(filter) {
        switch (filter) {
            case 'grayscale':
                return 'grayscale(100%)';
            case 'sepia':
                return 'sepia(100%)';
            case 'vintage':
                return 'contrast(1.4) brightness(0.9)';
            case 'nostalgia':
                return 'sepia(60%) hue-rotate(180deg)';
            case 'none':
            default:
                return 'none';
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const canvas = document.getElementById('imageCanvas');
        const filteredImageDataURL = canvas.toDataURL(); 
        
        const formData = new FormData(event.target);
        formData.set('image', filteredImageDataURL); 

        
        const response = await fetch('/add-post', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Image uploaded successfully');
            window.location.href = '/';
        } else {
            console.error('Image upload failed');
        }
    }
</script>

<header class='bg-white py-4 shadow-md sticky top-0 z-10'>
    <div class='container mx-auto px-4 flex justify-between items-center'>
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data" on:submit={handleSubmit}>
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <canvas id="imageCanvas" class="max-w-full max-h-64 rounded-lg"></canvas>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
    </label>

    {#if imageUpload}
        <div class="mb-5 p-1">
            <button 
                type="button"
                class="rounded-lg px-3 py-1.5 bg-gray-100 mb-2"
                class:bg-gray-400={selectedFilter === 'grayscale'} 
                class:bg-gray-100={selectedFilter !== 'grayscale'} 
                on:click={() => selectFilter('grayscale')}>
                Grayscale
            </button>
            <button 
                type="button"
                class="rounded-lg px-3 py-1.5 bg-gray-100 ml-2"
                class:bg-gray-400={selectedFilter === 'sepia'} 
                class:bg-gray-100={selectedFilter !== 'sepia'} 
                on:click={() => selectFilter('sepia')}>
                Sepia
            </button>
            <button 
                type="button"
                class="rounded-lg px-3 py-1.5 bg-gray-100 ml-2"
                class:bg-gray-400={selectedFilter === 'vintage'} 
                class:bg-gray-100={selectedFilter !== 'vintage'} 
                on:click={() => selectFilter('vintage')}>
                Vintage
            </button>
            <button 
                type="button"
                class="rounded-lg px-3 py-1.5 bg-gray-100 ml-2"
                class:bg-gray-400={selectedFilter === 'nostalgia'} 
                class:bg-gray-100={selectedFilter !== 'nostalgia'} 
                on:click={() => selectFilter('nostalgia')}>
                Nostalgia
            </button>
            <button 
                type="button"
                class="rounded-lg px-3 py-1.5 bg-gray-100 ml-2"
                class:bg-gray-400={selectedFilter === 'none'} 
                class:bg-gray-100={selectedFilter !== 'none'} 
                on:click={() => selectFilter('none')}>
                No effect
            </button>
        </div>
    {/if}

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
    </div>

    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

    <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2">Share</button>
</form>
