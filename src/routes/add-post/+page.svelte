<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftlab</title>
    <style>
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
            display: none;
            margin: 0 auto;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        button {
            transition: transform 0.2s, box-shadow 0.2s;
        }

        button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .char-count {
            font-size: 12px;
            text-align: right;
            color: gray;
        }

        .flex-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .full-width {
            width: 100%;
        }
    </style>
</head>

<body>
    <header class="bg-white py-4 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <p class="text-2xl font-bold">Instagram</p>
            <a href="/" class="bg-blue-500 px-2 py-2 rounded-lg text-white font-bold hover:scale-105 hover:shadow-md hover:shadow-gray-300">Home</a>
        </div>
    </header>

    <div class="flex-center mx-auto my-5 rounded-lg full-width">
        <label for="dropzoneInp" class="mb-3 flex flex-col items-center justify-center w-100 h-70 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
            <div class="flex flex-col items-center justify-center ">
                <canvas class="w-full h-[225px]" id="canvas"></canvas>
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                <p id="fileName" class="text-sm text-gray-500 font-semibold">Click to upload</p>
                <div id="spinner" class="spinner"></div>
            </div>
            <input name="imageInp" id="dropzoneInp" type="file" accept="image/png, image/jpeg" class="opacity-0 w-full h-full" required onchange="showImg()" />
        </label>
    </div>

    <form class="flex-center flex-column max-w-md mx-auto my-5 rounded-lg full-width" method="POST" enctype="multipart/form-data" id="postForm" name="postForm">
        <input type="file" class="hidden" name="image" id="dropzone" />
        <div id="filterButtons" class="mb-5 w-full flex items-center justify-center"></div>

        <div class="gap-2 w-full px-5">
            <label for="username" class="text-lg font-medium">Username</label>
            <input type="text" class="bg-gray-100 border border-black rounded-lg w-full h-12 px-3 py-1 font-meduim" id="username" name="username" required placeholder="Username" />
        </div>
        <br />
        <div class="gap-2 w-full px-5">
            <label for="content" class="text-lg font-medium" >Content</label>
            <textarea type="text" class="bg-gray-100 border border-black rounded-lg w-full h-15 py-1 px-3 font-meduim resize-none" id="content" name="content" maxlength="10" placeholder="Content" required oninput="updateCharCount()"></textarea>
        </div>
        <br />
        <button type="submit" class="bg-blue-500 px-3 py-2 rounded-lg text-white text-md font-mono font-bold hover:scale-105 hover:shadow-md hover:shadow-gray-400 max-w-20 " >Post</button>
    </form>

    <script>
        let files = null,
            filter = 0;
        const fileNameElement = document.getElementById('fileName');
        const spinner = document.getElementById('spinner');
        const filterButtons = document.getElementById('filterButtons');
        const filterOptions = [
            { name: 'Original', value: 0 },
            { name: 'Grayscale', value: 1 },
        ];

        filterOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.name;
            button.className = `${filter === option.value ? 'bg-blue-700' : 'bg-blue-700'} py-2 rounded-lg text-white font-semibold w-20 hover:scale-105 hover:shadow-md hover:shadow-gray-400 text-[13px] m-1`;
            button.onclick = (e) => {
                e.preventDefault();
                showImg(option.value);
            };
            filterButtons.appendChild(button);
        });

        async function showImg(val = 0) {
            filter = val;
            const userInput = document.getElementById("dropzoneInp");
            let file = userInput.files[0];
            let dpi = window.devicePixelRatio;
            let canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            function fix_dpi() {
                let style_height = +getComputedStyle(canvas)
                    .getPropertyValue("height")
                    .slice(0, -2);
                let style_width = +getComputedStyle(canvas)
                    .getPropertyValue("width")
                    .slice(0, -2);
                canvas.setAttribute("height", style_height * dpi);
                canvas.setAttribute("width", style_width * dpi);
            }

            if (file) {
                spinner.style.display = 'block';
                fileNameElement.textContent = file.name;
                let imgURL = URL.createObjectURL(file);
                const img = new Image();
                img.onload = function () {
                    fix_dpi();
                    var hRatio = canvas.width / img.width;
                    var vRatio = canvas.height / img.height;
                    var ratio = Math.min(hRatio, vRatio);
                    var centerShift_x = (canvas.width - img.width * ratio) / 2;
                    var centerShift_y = (canvas.height - img.height * ratio) / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    if (val === 0) {
                        ctx.filter = "none";
                    } else if (val === 1) {
                        ctx.filter = "grayscale(1)";
                    }
                    ctx.drawImage(
                        img,
                        0,
                        0,
                        img.width,
                        img.height,
                        centerShift_x,
                        centerShift_y,
                        img.width * ratio,
                        img.height * ratio
                    );
                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name, { type: file.type });
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(newFile);
                        document.getElementById("dropzone").files = dataTransfer.files;
                        spinner.style.display = 'none';
                    }, file.type);
                };
                img.src = imgURL;
            } else {
                alert("No file detected, please insert a file.");
            }
        }

        function updateCharCount() {
            const content = document.getElementById("content");
            const charCount = document.getElementById("charCount");
            charCount.textContent = `${content.value.length} characters`;
        }
    </script>
</body>

</html>
