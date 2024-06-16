<script>
    let files = null;
</script>

<header class="bg-white py-4 shadow-md sticky top-0 z-10">
    <div class="container1 mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-black font-color--black font-['Comic_Sans_MS'] ">Craftlab</h1>
        <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
    </div>
</header>



<form id="post-form" class="container1 mx-auto p-5" method="POST" enctype="multipart/form-data">
    <button id="share-button"type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" >Share</button>

    <div class="mb-3">
        <label for="username" class="block mb-2 text-sm font-medium text-white-900">Username</label>
        <input name="username" id="username" type="text" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
    </div>
    <div class="mb-3">
        <label for="content" class="block mb-2 text-sm font-medium text-white-900">Content</label>
        <textarea name="content" id="content" class="bg-gray-50 border border-white-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
    </div>

    <label for="image" class="sr-only">Upload an image</label>
    <input  type="file" accept="image/png, image/jpg, image/jpeg" name="image" id="image" required>
</form>
    <div class="container">
        <canvas></canvas>
        </div>
     
    <h1>
        Apply filters to your images
    </h1>
    <div class="buttons">
        <div class="filters">
            <button id="grayscale" onclick="applyFilter('applyGrayscale')">Grayscale</button>
           <button id="sepia" onclick="applyFilter('applySepia')">Sepia</button>   </div>
        <div class="actions">
            <button id="reset" onclick="resetFilter()">Reset</button>
          
            <a id="download" download>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download</span>
            </a>
           
        </div>
    </div>
   


<main>
    <link rel="stylesheet" href="./src/index.css">
    <script src="./src/index.js"></script>
    <script>
     const canvas = document.querySelector('canvas'); 
        const context = canvas.getContext('2d'); 

        const grayscale = document.getElementById('grayscale'); 
        const sepia = document.getElementById('sepia');
        const reset = document.getElementById('reset'); 
        const download = document.getElementById('download');
        const input = document.getElementById('image');
        const shareButton = document.getElementById('share-button');

        let imageWidth = null; 
        let imageHeight = null; 
        let originalData = null; 

        const image = new Image(); 
        image.addEventListener('load', () => {
            imageWidth = image.width; 
            imageHeight = image.height; 
            canvas.width = imageWidth; 
            canvas.height = imageHeight; 
            context.drawImage(image, 0, 0); 
        });

        const reader = new FileReader(); 
        reader.addEventListener('load', () => {
            image.src = reader.result; 
            originalData = reader.result;
        });

        input.addEventListener('change', () => {
            reader.readAsDataURL(input.files[0]);
        });

        const applyFilter = (filterType) => {
            if(!imageWidth || !imageHeight) {
                return alert("Please upload an image first!");
            }

            const imageData = context.getImageData(0, 0, imageWidth, imageHeight);
            const imgData = imageData.data; 
            
            for(let i = 0; i < imgData.length; i += 4) {
                const red = imgData[i]; 
                const green = imgData[i + 1]; 
                const blue = imgData[i + 2]; 
                
                const grayValue = (red + green + blue) / 3;
                const data = filters[filterType](red, green, blue, grayValue);
                imgData[i] = data[0];
                imgData[i + 1] = data[1];
                imgData[i + 2] = data[2];
            }

            context.putImageData(imageData, 0, 0); 
            download.href = canvas.toDataURL(); 
        }

        const filters = {
            applyGrayscale: (r, g, b, gray) => {
                return [gray, gray, gray];
            }, 
          
            applySepia: (r, g, b) => {
                const tr = 0.393 * r + 0.769 * g + 0.189 * b;
                const tg = 0.349 * r + 0.686 * g + 0.168 * b;
                const tb = 0.272 * r + 0.534 * g + 0.131 * b;
                return [Math.min(255, tr), Math.min(255, tg), Math.min(255, tb)];
            }
        }

        const resetFilter = () => {
            if(!image || !context || !originalData) {
                return alert('There is nothing to reset'); 
            }

            image.src = originalData; 
            context.drawImage(image, 0, 0); 
        }

        grayscale.addEventListener('click', () => applyFilter('applyGrayscale'));
       sepia.addEventListener('click', () => applyFilter('applySepia'));
        reset.addEventListener('click', resetFilter);

        shareButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const dataURL = canvas.toDataURL('image/png');
    const imageData = await fetch(dataURL).then(res => res.blob());
    
    const form = document.getElementById('post-form');
    const formData = new FormData(form);
    formData.append('filteredImage', imageData, 'filteredImage.png');
    
    const response = await fetch(form.action, {
        method: form.method,
        body: formData
    });

    if (response.ok) {
        window.location.href = '/';
    } else {
        console.error('Error sharing the post');
    }
});



        // Existing filter application logic here
    </script>
</main>







  