        const canvas = document.querySelector('canvas'); 
        const context = canvas.getContext('2d'); 

        const grayscale = document.getElementById('grayscale'); 
        const monotone = document.getElementById('monotone'); 
        const duotone = document.getElementById('duotone'); 
        const reset = document.getElementById('reset'); 
        const download = document.getElementById('download');
        const input = document.getElementById('image');
        const shareButton = document.getElementById('share-button');
        const sepia = document.getElementById('sepia');

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
                const data = filters[filterType](grayValue);
                imgData[i] = data[0];
                imgData[i + 1] = data[1];
                imgData[i + 2] = data[2];
            }

            context.putImageData(imageData, 0, 0); 
            download.href = canvas.toDataURL(); 
        }

        const filters = {
            applyGrayscale: (gray) => {
                return [gray, gray, gray];
            }, 
            applyMonotone: (gray) => {
                return [gray - 40, gray - 40, gray + 80];
            },
            applyDuotone: (gray) => {
                const diff = Math.round((128/100) * gray); 
                return [gray + diff, gray, 255 - diff];
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
        monotone.addEventListener('click', () => applyFilter('applyMonotone'));
        duotone.addEventListener('click', () => applyFilter('applyDuotone'));
        reset.addEventListener('click', resetFilter);
        sepia.addEventListener('click', () => applyFilter('applySepia'));

        shareButton.addEventListener('click', async () => {
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