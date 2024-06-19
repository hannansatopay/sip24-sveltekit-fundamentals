<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftlab Image Editor</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <script>
        let files = null;
    </script>

    <header class="bg-white py-4 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
            <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    </header>

    <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
            <div class="flex flex-col items-center justify-center pt-5 pb-6" id="upload-message">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
            </div>
            <input name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" required/>
        </label>
        <div class="mb-3">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>
        <div class="mb-3">
            <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea name="content" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Share</button>
    </form>

    <div class="container mx-auto p-5">
        <canvas id="canvas" class="border border-gray-300 rounded-lg w-full"></canvas>
        <div class="flex space-x-3 mt-3">
            <button id="grayscale" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">Grayscale</button>
            <button id="sepia" class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5">Sepia</button>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const dropzone = document.getElementById("dropzone");
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const grayscaleButton = document.getElementById("grayscale");
            const sepiaButton = document.getElementById("sepia");
            const uploadMessage = document.getElementById("upload-message");

            let img = new Image();

            dropzone.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        img.onload = () => {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0);
                            uploadMessage.style.display = "none";
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });

            grayscaleButton.addEventListener("click", () => {
                ctx.drawImage(img, 0, 0);
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                ctx.putImageData(imageData, 0, 0);
            });

            sepiaButton.addEventListener("click", () => {
                ctx.drawImage(img, 0, 0);
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    let red = data[i];
                    let green = data[i + 1];
                    let blue = data[i + 2];
                    data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
                    data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
                    data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
                }
                ctx.putImageData(imageData, 0, 0);
            });
        });
    </script>
</body>
</html>