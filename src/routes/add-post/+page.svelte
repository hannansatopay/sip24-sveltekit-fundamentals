
    <style>
        body {
            background-color: #121212;
            color: #e0e0e0;
            font-family: sans-serif;
            margin: 0;
        }

        .container {
            padding-top: 20px;
        }

        .form-container {
            padding: 20px;
            background-color: #1f2937;
            border-radius: 10px;
        }

        .dropzone {
            background-color: #374151;
            color: #d1d5db;
        }

        .dropzone p {
            color: #9ca3af;
        }

        .input-field {
            background-color: #374151;
            border-color: #4b5563;
            color: #d1d5db;
        }

        .input-label {
            color: #d1d5db;
        }

        .filter-container {
            margin-top: 10px;
        }

        .filter-slider {
            width: 100%;
        }

        canvas {
            width: 300px;
            height: auto;
        }
    </style>
    
<body>
<header class="bg-gray-900 py-4 shadow-md sticky top-0 z-10">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>

<div class="container mx-auto">
    <form class="form-container" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="dropzone mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="text-sm font-semibold">Click to upload</p>
            </div>
            <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required onchange="handleFileUpload(event)"/>
        </label>
        <div class="mb-3">
            <label for="username" class="input-label block mb-2 text-sm font-medium">Username</label>
            <input name="username" id="username" type="text" class="input-field border text-sm rounded-lg block w-full p-2.5"/>
        </div>
        <div class="mb-3">
            <label for="content" class="input-label block mb-2 text-sm font-medium">Content</label>
            <textarea name="content" id="content" class="input-field border text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
    </form>

    <div class="form-container mt-5">
        <canvas id="imageCanvas"></canvas>
        <div class="filter-container">
        </div>
        <div class="flex space-x-2 mt-2">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onclick="applyFilter('grayscale', filterValue)">Grayscale</button>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onclick="applyFilter('sepia', filterValue)">Sepia</button>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onclick="applyFilter('invert', filterValue)">Invert</button>
        </div>
    </div>
</div>

<script>
    let files = null;
    let image = null;
    let canvas = null;
    let ctx = null;
    let filterValue = 100;

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas = document.getElementById('imageCanvas');
                    ctx = canvas.getContext('2d');
                    canvas.width = 300;  // Set canvas width to 300 pixels
                    canvas.height = img.height * (300 / img.width);  // Scale height proportionally
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    image = img;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function updateFilterValue(event) {
        filterValue = event.target.value;
    }

    function applyFilter(filter, value = 100) {
        if (ctx && image) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            switch (filter) {
                case 'grayscale':
                    for (let i = 0; i < data.length; i += 4) {
                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = data[i + 1] = data[i + 2] = avg * (value / 100);
                    }
                    break;
                case 'sepia':
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        data[i] = r * 0.393 + g * 0.769 + b * 0.189 * (value / 100);
                        data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168 * (value / 100);
                        data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131 * (value / 100);
                    }
                    break;
                case 'invert':
                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = 255 - data[i] * (value / 100);
                        data[i + 1] = 255 - data[i + 1] * (value / 100);
                        data[i + 2] = 255 - data[i + 2] * (value / 100);
                    }
                    break;
                default:
                    break;
            }

            ctx.putImageData(imageData, 0, 0);
        }
    }
</script>
</body>

