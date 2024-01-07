function cutImage(inputImagePath, outputFolderPath, numRows, numColumns) {
    const originalImage = new Image();
    originalImage.src = inputImagePath;

    originalImage.onload = function () {
        const imageWidth = originalImage.width;
        const imageHeight = originalImage.height;

        const canvas = document.createElement('canvas');
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        const context = canvas.getContext('2d');
        context.drawImage(originalImage, 0, 0);

        const partWidth = Math.floor(imageWidth / numColumns);
        const partHeight = Math.floor(imageHeight / numRows);

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const left = col * partWidth;
                const top = row * partHeight;
                const right = (col + 1) * partWidth;
                const bottom = (row + 1) * partHeight;

                const imageData = context.getImageData(left, top, partWidth, partHeight);

                const canvasPart = document.createElement('canvas');
                canvasPart.width = partWidth;
                canvasPart.height = partHeight;
                const contextPart = canvasPart.getContext('2d');
                contextPart.putImageData(imageData, 0, 0);

                const imagePart = new Image();
                imagePart.src = canvasPart.toDataURL('image/png');

                // Aquí puedes manejar o guardar las partes como desees
                document.body.appendChild(imagePart);
            }
        }
    };
}

// Llamada a la función con tus rutas y dimensiones deseadas
cutImage('gtav.jpg', 'imgs-cuted', 5, 5);