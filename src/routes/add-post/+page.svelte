<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftlab - Image Viewer and Photo Filter Editor</title>
    <style>
        h1 {
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
    </style>
    <script>
        let files = null;
    </script>
</head>
<body>
    <header class="bg-white py-4 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold font-['Instagram Sans']">
                Craftlab
            </h1>
            <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    </header>
    
    <form class="container mx-auto p-5 bg-white shadow-md rounded-lg mt-6" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required />
                <div id="fileName" class="text-sm text-gray-500 font-semibold">Click to upload</div>
            </div>
        </label>
        <div class="mb-3">
            <label for="username" class="block mb-2 text-sm font-bold text-gray-900">Username</label>
            <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
        </div>
        <div>
            <label for="content" class="block mb-2 text-sm font-bold text-gray-900">Content</label>
            <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Share</button>
    </form>

    <div class="container mx-auto p-5 bg-white shadow-md rounded-lg mt-6">
        <canvas id="canvas" class="hidden"></canvas>
        <button type="button" id="grayscale-button" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 hidden">Grayscale</button>
        <button type="button" id="sepia-button" class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 hidden">Sepia</button>
    </div>

    <script>
        const dropzone = document.getElementById('dropzone');
        const fileName = document.getElementById('fileName');
        const canvas = document.getElementById('canvas');
        const grayscaleButton = document.getElementById('grayscale-button');
        const sepiaButton = document.getElementById('sepia-button');
        const resetButton = document.getElementById('reset-button');
        const ctx = canvas.getContext('2d');
        let originalImageData = null;

        // Handle file selection
        dropzone.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                fileName.textContent = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        canvas.classList.remove('hidden');
                        grayscaleButton.classList.remove('hidden');
                        sepiaButton.classList.remove('hidden');
                        resetButton.classList.remove('hidden');
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Apply grayscale filter
        grayscaleButton.addEventListener('click', function() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
            ctx.putImageData(imageData, 0, 0);
        });

        // Apply sepia filter
        sepiaButton.addEventListener('click', function() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            }
            ctx.putImageData(imageData, 0, 0);
        });

        // Reset filter
        resetButton.addEventListener('click', function() {
            if (originalImageData) {
                ctx.putImageData(originalImageData, 0, 0);
            }
        });

        // Handle form submission to include the edited image.
        document.getElementById('image-form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission.
            const dataURL = canvas.toDataURL('image/png');
            const imageBlob = dataURItoBlob(dataURL);
            const formData = new FormData(this);
            formData.append('editedImage', imageBlob, 'editedImage.png');

            fetch('/', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
            .then(data => {
                console.log(data); // Handle the response data.
                // Redirect to home page.
                window.location.href = '/';
            }).catch(error => {
                console.error(error); // Handle errors
            });
        });

        // Convert data URI to Blob
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }
    </script>
</body>
</html>
