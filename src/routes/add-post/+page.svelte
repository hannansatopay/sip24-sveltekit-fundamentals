<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Image</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f7fafc;
        }
        header {
            background: linear-gradient(to right, #667eea, #764ba2);
        }
        h1 {
            font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        input, textarea, button {
            outline: none;
        }
        .canvas-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        .filter-buttons {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }
        .hidden {
            display: none;
        }
        .active-filter {
            background-color: #4a5568;
        }
    </style>
</head>
<body>
    <script>
        let files = null;

        function handleFileSelect(event) {
            files = event.target.files;
            if (files.length) {
                document.getElementById('preview-button').classList.remove('hidden');
                document.getElementById('file-name').innerText = files[0].name; // Displaying file name
            }
        }

        function previewImage() {
            if (files && files.length) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.getElementById('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        document.getElementById('canvas').classList.remove('hidden');
                        document.getElementById('filter-buttons').classList.remove('hidden');
                    }
                    img.src = event.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        function applyFilter(filter) {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            if (filter === 'grayscale') {
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                document.getElementById('grayscale-button').classList.add('active-filter');
                document.getElementById('sepia-button').classList.remove('active-filter');
            } else if (filter === 'sepia') {
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i];
                    const green = data[i + 1];
                    const blue = data[i + 2];
                    data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                    data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                    data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
                }
                document.getElementById('sepia-button').classList.add('active-filter');
                document.getElementById('grayscale-button').classList.remove('active-filter');
            }

            ctx.putImageData(imageData, 0, 0);
        }
    </script>

    <header class="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-3xl font-extrabold text-white">Craftlab</h1>
            <a href="/" class="bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">Home</a>
        </div>
    </header>

    <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="mb-6 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg border-gray-300 hover:border-indigo-600 hover:bg-gray-50 transition duration-300 ease-in-out">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-12 h-12 mb-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v8m0 0l-4-4m4 4l4-4M4 12h16m-7 8a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p class="text-sm text-gray-500 font-semibold" id="file-name">Click to upload</p>
            </div>
            <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required onchange="handleFileSelect(event)" />
        </label>
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-300 ease-in-out" />
        </div>
        <div class="mb-6">
            <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea name="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-300 ease-in-out"></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Share</button>
    </form>

    <div class="canvas-container">
        <button id="preview-button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out hidden" onclick="previewImage()">Preview</button>
        <canvas id="canvas" class="hidden"></canvas>
        <div id="filter-buttons" class="filter-buttons hidden">
            <button id="grayscale-button" onclick="applyFilter('grayscale')" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out">Grayscale</button>
            <button id="sepia-button" onclick="applyFilter('sepia')" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out">Sepia</button>
        </div>
    </div>
</body>
</html>
