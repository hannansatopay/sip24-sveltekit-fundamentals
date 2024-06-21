<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload Form</title>
    <style>
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }

        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-group .file-dropzone {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px dashed #ccc;
            padding: 20px;
            cursor: pointer;
            background-color: #f9f9f9;
            border-radius: 5px;
            margin-top: 10px;
            min-height: 200px; /* Increased height for larger dropzone */
        }

        .form-group .file-dropzone .upload-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 100%;
        }

        .form-group .file-dropzone .upload-box p {
            font-size: 16px;
            margin-top: 10px;
            color: #555;
        }

        .form-group .file-dropzone.drag-over {
            background-color: #f0f0f0;
            border-color: #4CAF50; /* Change border color on drag over */
        }

        .form-group .file-dropzone input[type="file"] {
            display: none;
        }

        .container button[type="submit"], .home-button, .back-button, .share-button {
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
        }

        .header {
            background-color: #2c3e50; /* Dark Blue */
            color: white;
            padding: 10px 0;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>CraftLab</h1>
</div>

<div class="container">
    <div>
        <button class="back-button" onclick="navigateBack()">Back</button>
        <button class="home-button" onclick="navigateHome()">Home</button>
        <form id="uploadForm" onsubmit="handleSubmit(event)" method="post" enctype="multipart/form-data" style="display: inline;">
            <div
                    id="fileDropzone"
                    class="form-group file-dropzone"
                    ondragenter="handleDragEnter(event)"
                    ondragleave="handleDragLeave(event)"
                    ondragover="handleDragOver(event)"
                    ondrop="handleDrop(event)"
            >
                <div class="upload-box">
                    <label for="file">Click to Upload or Drag & Drop File:</label>
                    <p id="fileInput">Click to upload</p>
                    <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onchange="handleFileChange(event)">
                </div>
            </div>
            <button type="submit">Upload</button>
        </form>
    </div>
    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
    </div>
    <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" name="description" rows="4"></textarea>
    </div>
    <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" name="content" rows="4"></textarea>
    </div>
    <button class="share-button" onclick="handleShare()">Share</button>
</div>

<script>
    let selectedFile = null;

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
        updateFilename();
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('username', document.getElementById('username').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('content', document.getElementById('content').value);

        try {
            const response = await fetch('upload.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }

    function navigateHome() {
        console.log('Navigating to Home');
    }

    function navigateBack() {
        console.log('Navigating back');
    }

    function handleShare() {
        const content = document.getElementById('content').value;
        console.log('Sharing content:', content);
    }

    function updateFilename() {
        const fileInput = document.getElementById('fileInput');
        if (selectedFile) {
            fileInput.textContent = selectedFile.name;
        } else {
            fileInput.textContent = 'Click to upload';
        }
    }

    function handleDragEnter(event) {
        event.preventDefault();
        const fileDropzone = document.getElementById('fileDropzone');
        fileDropzone.classList.add('drag-over');
    }

    function handleDragLeave(event) {
        event.preventDefault();
        const fileDropzone = document.getElementById('fileDropzone');
        fileDropzone.classList.remove('drag-over');
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const dt = event.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            selectedFile = files[0];
            updateFilename();
        }

        const fileDropzone = document.getElementById('fileDropzone');
        fileDropzone.classList.remove('drag-over');
    }
</script>
</body>
</html>
