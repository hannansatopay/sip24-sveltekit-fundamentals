<header class="bg-white py-4 shadow-md sticky top-0">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold font-['Comic_Sans_MS']">Craftlab</h1>
        <a href="/add-post" class="bg-blue-500 text-while font-bold py-2 px-4 rounded">Add post</a>
    </div>
  </header>
  
  
  <script>
    let selectedFile;
    let imageName = "No file selected";
    let username = "";
    let contentNote = "";
  
    const handleFileChange = (event) => {
      selectedFile = event.target.files[0];
      if (selectedFile) {
        imageName = selectedFile.name;
      } else {
        imageName = "No file selected";
      }
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        alert('Please select a file to upload');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('username', username);
      formData.append('contentNote', contentNote);
  
      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          alert('Image uploaded successfully');
        } else {
          alert('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    };
  </script>
  
  <style>
    .upload-container {
      position: relative;
      width: 80%; /* Adjust width as needed */
      margin: 20px auto; /* Center the box and provide spacing */
    }
  
    .upload-box {
      border: .5px dashed  #ccc;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      height: 200px; /* Set height as needed */
      position: relative;
      margin-bottom: 20px; /* Adds space between upload box and form */
    }
  
    .upload-box:hover {
      background-color: #f0f0f0;
    }
  
    .upload-box input[type="file"] {
      display: none;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    .form-group input[type="text"],
    .form-group textarea {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    .upload-button-container {
      text-align: right;
    }
  
    button.upload-button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button.upload-button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  
  <div class="upload-container">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="upload-box" on:click={() => document.getElementById('file-input').click()}>
    <input id="file-input" type="file" accept="image/*" on:change={handleFileChange} />
    <p>{imageName}</p>
    <p>Click here to select an image file</p>
  </div>
  
  
  <div class="upload-button-container">
    <button class="upload-button" on:click={handleUpload}>Upload Image</button>
  </div>
  </div>
  
  <div class="form-group">
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} />
  </div>
  
  <div class="form-group">
    <label for="contentNote">Content Note:</label>
    <textarea id="contentNote" bind:value={contentNote} ></textarea>
  </div>
  
  
  