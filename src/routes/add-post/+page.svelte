<script>
    import { onMount } from "svelte";
    let files = null;
    let imageSrc = '';
    let canvas, ctx;

    onMount(() => {
        if (canvas) {
            ctx = canvas.getContext('2d');
        }
    });

    const handleFileChange = (event) => {
        if (event.target.files.length) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc = e.target.result;
                drawImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const drawImage = () => {
        if (!canvas || !ctx || !imageSrc) return;
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = imageSrc;
    };

    const applyFilter = (filter) => {
        if (!ctx) return;
        ctx.filter = filter;
        drawImage();
    };
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Instagram</h1>
        <a
            href="/"
            class="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
            Home
        </a>
    </div>
</header>

<form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
    <label
        for="dropzone"
        class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-grey-300"
    >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
                <p class="text-sm text-grey-500 font-semibold">
                    {files[0].name}
                </p>
            {:else}
                <svg
                    class="w-8 h-8 mb-4 text-grey-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                >
                </svg>
                <p class="text-sm text-grey-500 font-semibold">
                    Click to upload
                </p>
            {/if}
        </div>
        <input
            bind:files
            on:change={handleFileChange}
            name="image"
            id="dropzone"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            required
        />
    </label>

    <div class="mb-3">
        <label
            for="username"
            class="block mb-2 text-sm font-medium text-grey-900"
        >
            Username
        </label>
        <input
            name="username"
            id="username"
            type="text"
            class="bg-grey-50 border border-grey-300 text-grey-900 text-sm rounded-lg block w-full p-2.5"
            required
        />
    </div>

    <div class="mb-3">
        <label
            for="content"
            class="block mb-2 text-sm font-medium text-grey-900"
        >
            Content
        </label>
        <textarea
            name="content"
            id="content"
            class="bg-grey-50 border border-grey-300 text-grey-900 text-sm rounded-lg block w-full p-2.5"
            required
        ></textarea>
    </div>

    {#if imageSrc}
        <div class="mb-3">
            <canvas bind:this={canvas}></canvas>
        </div>

        <div class="mb-3 flex space-x-2">
            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => applyFilter('none')}>
                No Filter
            </button>
            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => applyFilter('grayscale(1)')}>
                Grayscale
            </button>
            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => applyFilter('sepia(1)')}>
                Sepia
            </button>
        </div>
    {/if}

    <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" > Share </button>
</form>