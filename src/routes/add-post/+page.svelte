<script>
    let fileInput;
    let previewUrl = "";
    import { onMount } from "svelte";
    let canvas;
    let ctx;
    let originalImageData = null;

    onMount(() => {
        ctx = canvas.getContext("2d");
    });

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewUrl = e.target.result;
                const img = new Image();
                img.onload = function () {
                    const aspectRatio = img.width / img.height;
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientWidth / aspectRatio;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    saveCanvasImage();
                };
                img.src = previewUrl;
            };
            reader.readAsDataURL(file);
        } else {
            previewUrl = "";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            saveCanvasImage();
        }
    }

    function saveCanvasImage() {
        canvas.toBlob((blob) => {
            const file = new File([blob], "modified_image.png", {
                type: "image/png",
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
        }, "image/png");
    }

    let currentFilter = "none";

    function applyFilter(filter) {
        if (!canvas || !ctx) return;
        if (
            filter === "none" ||
            (filter !== "grayscale" && filter !== "sepia")
        ) {
            if (originalImageData) {
                ctx.putImageData(originalImageData, 0, 0);
                originalImageData = null;
                saveCanvasImage();
                return;
            }
        }
        const img = new Image();
        img.onload = function () {
            const aspectRatio = img.width / img.height;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientWidth / aspectRatio;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (filter === "none") {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveCanvasImage();
            } else {
                if (!originalImageData) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    originalImageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                    );
                }
                if (filter === "grayscale") {
                    ctx.filter = "grayscale(100%)";
                } else if (filter === "sepia") {
                    ctx.filter = "sepia(100%)";
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveCanvasImage();
            }
            ctx.filter = "none";
        };
        img.src = canvas.toDataURL();
    }

    function resetFilter() {
        applyFilter("none");
    }
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Picto</h1>
        <a
            href="/"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >Home</a
        >
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <div class="w-full flex flex-col h-auto justify-between">
        <div class="flex gap-32">
            <label
                for="dropzone"
                class="mb-3 flex items-center justify-center w-32 h-15 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200"
            >
                <input
                    bind:this={fileInput}
                    on:change={handleFileChange}
                    name="image"
                    id="dropzone"
                    type="file"
                    accept="image/png, image/jpeg"
                    class="hidden"
                    required
                />
                <div
                    class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                    
                        <svg
                            class="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p class="text-sm text-gray-500 font-semibold">
                            Upload
                        </p>
                    
                </div>
            </label>

            <div class="mb-3">
                <div class="block mb-2 text-sm font-medium text-gray-900">
                    Apply Filter
                </div>
                <div class="flex gap-2 my-5">
                    <button
                        type="button"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
                        on:click={() => applyFilter("grayscale")}
                        >Grayscale</button
                    >
                    <button
                        type="button"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
                        on:click={() => applyFilter("sepia")}>Sepia</button
                    >
                    <button
                        type="button"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
                        on:click={resetFilter}>Reset</button
                    >
                </div>
            </div>
        </div>
        <label
            for="preview"
            class="block mb-2 text-sm font-medium text-gray-900">Preview</label
        >
        <canvas
            bind:this={canvas}
            class="mb-3 flex flex-col items-center justify-center w-auto h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        ></canvas>
    </div>

    <div class="mb-3">
        <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900">Username</label
        >
        <input
            name="username"
            id="username"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
    </div>
    <div class="mb-3">
        <label
            for="caption"
            class="block mb-2 text-sm font-medium text-gray-900">Caption</label
        >
        <textarea
            name="caption"
            id="caption"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></textarea>
    </div>
    <button
        type="submit"
        class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
        >Share</button
    >
</form>
