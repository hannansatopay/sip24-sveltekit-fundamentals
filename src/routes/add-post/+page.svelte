<!-- routes/add-post/page.svelte -->
<script>
    let files = null;
    let imageData = '';

    const handleFileUpload = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageData = e.target.result;
            const canvas = document.getElementById('preview-canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = imageData;
        };
        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };
</script>

<header class="bg-white py-4 shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">BLab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white rounded font-bold py-2">HOME</a>
    </div>
</header>

<form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-3">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <canvas id="preview-canvas" width="300" height="300"></canvas>
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png,image/jpeg" class="hidden" required on:change={handleFileUpload}/>
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">USERNAME</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900">CONTENT</label>
        <textarea name="content" id="content" type="text" class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
</form>
