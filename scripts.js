const imageUpload = document.getElementById('imageUpload');
const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');
const grayscaleBtn = document.getElementById('grayscaleBtn');
const sepiaBtn = document.getElementById('sepiaBtn');
const resetBtn = document.getElementById('resetBtn');
let uploadedImage = null;

// Handle image upload
imageUpload.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            uploadedImage = img;
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Apply grayscale filter
grayscaleBtn.addEventListener('click', function() {
    applyFilter(grayscale);
});

// Apply sepia filter
sepiaBtn.addEventListener('click', function() {
    applyFilter(sepia);
});

// Reset image to original
resetBtn.addEventListener('click', function() {
    if (uploadedImage) {
        ctx.drawImage(uploadedImage, 0, 0);
    }
});

// Helper functions for filters
function applyFilter(filterFunction) {
    const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        filterFunction(data, i);
    }

    ctx.putImageData(imageData, 0, 0);
}

function grayscale(data, i) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // Red
    data[i + 1] = avg; // Green
    data[i + 2] = avg; // Blue
}

function sepia(data, i) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b); // Red
    data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b); // Green
    data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b); // Blue
}

