<script>
    let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container1 mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-black font-color--black font-['Comic_Sans_MS'] ">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>



<form class="container1 mx-auto p-5" method="POST" enctype="multipart/form-data">
    <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-white-300 border-dashed rounded-lg cursor-pointer bg-gray-50"> 
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            {#if files && files.length}
            <p class="text-sm text-gray-500 font-semibold">{files[0].name}</p>
        {:else}
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
            <p class="text-sm text-gray-500 font-semibold">Click to upload</p>
        {/if}
        </div>
        <input bind:files name="image" id="dropzone" type="file" accept="image/png, image/jpeg" class="hidden" onchange="handleFileUpload(event)" required />
    </label>
    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-white-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-white-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onclick="">Share</button></form>

<main>
    <link rel="stylesheet" href="./src/index.css">
    <script src="./src/index.js"></script>
    <h1>
        Apply filters to your images
    </h1>
 
    <div class="container">
        <canvas id="imageCanvas"></canvas>
        <div class="buttons">
            <div class="filters">
                <button id="grayscale" onclick="applyFilter('grayscale')">Grayscale</button>
                <button id="monotone" onclick="applyFilter('monotone')">Blue Monotone</button>
                <button id="duotone" onclick="applyFilter('duotone')">Orange Blue</button>
            </div>
            <div class="actions">
                <button id="reset" onclick="resetFilter()">Reset</button>
              
                <a id="download" download>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Download</span>
                </a>
                <form class="container mx-auto p-5" method="POST" enctype="multipart/form-data">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onc>Share</button></form>
            </div>
        </div>
    </div>

    <script>
       let canvas = document.getElementById('imageCanvas');
        let ctx = canvas.getContext('2d');
        let image = new Image();
        let originalData;

        function handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
                image.onload = function() {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                };
            };
            reader.readAsDataURL(file);
        }

        function applyFilter(filter) {
            if (!image.src) return alert("Please upload an image first!");

            ctx.putImageData(originalData, 0, 0);

            if (filter === 'grayscale') {
                ctx.filter = 'grayscale(100%)';
            } else if (filter === 'monotone') {
                ctx.filter = 'sepia(100%) hue-rotate(190deg) saturate(1000%)';
            } else if (filter === 'duotone') {
                ctx.filter = 'contrast(150%) sepia(1) saturate(7) hue-rotate(-20deg)';
            }
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';  // Reset the filter after drawing
        }

        function sharePost() {
            const form = document.getElementById('postForm');
            const formData = new FormData(form);

            // Convert canvas to a data URL and append it to the form data
            const canvasDataUrl = canvas.toDataURL('image/png');
            formData.append('imageDataUrl', canvasDataUrl);

            // Send the form data via AJAX
            fetch('/save-post', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Post shared successfully!');
                    // Optionally, redirect to the home page
                    window.location.href = '/';
                } else {
                    alert('Failed to share post.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sharing the post.');
            });
        }
        function saveFilter() {
            updateDownloadLink();
        }

        function resetFilter() {
            ctx.putImageData(originalData, 0, 0);
            updateDownloadLink();
        }

        function updateDownloadLink() {
            const link = document.getElementById('download');
            link.href = canvas.toDataURL('image/png');
        }

        document.getElementById('download').addEventListener('click', function() {
            updateDownloadLink();
        });

    </script>


</main>







  