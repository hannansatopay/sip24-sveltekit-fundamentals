<script>
    let files = null;
    let imageUrl = null;
    let effect = 'none';

    $: if (files && files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            imageUrl = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        imageUrl = null;
    }

    function applyEffect(newEffect) {
        effect = newEffect;
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 relative">
        <div class="flex flex-col items-center justify-center w-full h-full">
            {#if imageUrl}
                <img src={imageUrl} alt="Preview" class={`w-full h-full object-cover absolute inset-0 ${effect}`}/>
                <p class="text-sm text-gray-500 font-semibold z-10 bg-white bg-opacity-75 p-1">{files[0].name}</p>
            {:else}
                <svg class="w-8 h-8 mb-4 text-gray-500 z-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <p class="text-sm text-gray-500 font-semibold z-10 bg-white bg-opacity-75 p-1">Click to upload</p>
            {/if}
        </div>
        <input bind:files={files} name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required>
    </label>
    <div class="flex space-x-4 mb-3">
        <button type="button" on:click={() => applyEffect('none')} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">None</button>
        <button type="button" on:click={() => applyEffect('grayscale')} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Grayscale</button>
        <button type="button" on:click={() => applyEffect('sepia')} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Sepia</button>
    </div>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-300 border border-gray-300 rounded-lg text-gray-900 text-sm block w-full p-2.5">
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-300 border border-gray-300 rounded-lg text-gray-900 text-sm block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-900 rounded-lg text-sm px-5 py-2.5">Share</button>
</form>

<style>
    label[for="dropzone"] {
        position: relative;
    }

    label[for="dropzone"] img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    label[for="dropzone"] p {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        background: rgba(255, 255, 255, 0.75);
        padding: 0.5rem;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .grayscale {
        filter: grayscale(100%);
    }

    .sepia {
        filter: sepia(100%);
    }
</style>
