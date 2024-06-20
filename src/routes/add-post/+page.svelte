<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Upload with Preview and Filters</title>
    <style>
        /* Add CSS styles for image preview */
        .image-preview {
            width: 100%;
            height: auto;
            margin-bottom: 1rem;
        }

        /* Add CSS styles for filters */
        .filters {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <header class="bg-white py-4 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 flex justify-between item-center">
            <h1 class="text-2xl font-bold font-['Comic_sons_MS']">Craftlab</h1>
            <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    </header>

    <form class="container mx-auto p-5" method="post" enctype="multipart/form-data">
        <!-- Image preview -->
        <div class="image-preview" id="imagePreview"></div>

        <!-- File input -->
        <label for="dropzone" class="mb-3 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg" id="dropzoneLabel">
            <div class="flex flex-col items-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" d="M16 10l-4 4-434 4vo"></path></svg>
                <p class="text-sm text-gray-500 font-semibold" id="uploadText">Click to upload</p>
            </div>
            <input onchange="previewImage()" name="image" id="dropzone" type="file" accept="image/png,image/jpeg" class="hidden" required/>
        </label>

        <!-- Username input -->
        <div class="mb-3">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input name="username" id="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        </div>

        <!-- Content input -->
        <div class="mb-3">
            <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea name="content" id="content" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>

        <!-- Filter options -->
        <div class="filters">
            <label for="filter">Select Filter:</label>
            <select id="filter">
                <option value="none">None</option>
                <option value="grayscale">Grayscale</option>
                <option value="sepia">Sepia</option>
                <option value="blur">Blur</option>
                <!-- Add more filter options as needed -->
            </select>
        </div>

        <!-- Submit button -->
        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Upload</button>
    </form>

    <script>
        function previewImage() {
            const preview = document.getElementById('imagePreview');
            const dropzoneLabel = document.getElementById('dropzoneLabel');
            const uploadText = document.getElementById('uploadText');
            const fileInput = document.querySelector('input[type=file]');
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const image = new Image();
                image.src = e.target.result;

                image.onload = function () {
                    dropzoneLabel.style.display = 'none'; // Hide the label
                    preview.innerHTML = ''; // Clear previous preview
                    preview.appendChild(image); // Show the uploaded image
                };
            };

            reader.readAsDataURL(file);
        }

        // Apply selected filter to the image preview
        document.getElementById('filter').addEventListener('change', function () {
            const previewImage = document.querySelector('.image-preview img');
            const selectedFilter = this.value;

            previewImage.style.filter = selectedFilter;
        });
    </script>
</body>
</html>
