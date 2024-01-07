let rows = 5;
let columns = 5;

let currentSelectedTile;
let destinyTile;

let turns = 0;

window.onload = () => {

    //Initialize the 5 x 5 Board
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {

            let tile = document.createElement('img');
            tile.id = i + '_' + j;
            tile.src = './src/imgs/whiteDummy.jpg'

            //Drag Functionality
            tile.addEventListener('dragstart', dragStart);   // Click on image to drag
            tile.addEventListener('dragover', dragOver);     // Drag an image
            tile.addEventListener('dragenter', dragEnter);   // Dragging an image into another one
            tile.addEventListener('dragleave', dragLeave);   // Dragging an image away from another
            tile.addEventListener('drop', drop);             // When you drop an image into another one
            tile.addEventListener('dragend', dragEnd);       // after you complete the dragDrop

            document.getElementById('board').appendChild(tile);
        }
    }

    //Pieces Array
    let pieces = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            pieces.push(i + '_' + j);
        }
    }

    //Suffle array of pieces
    for (let i = 0; i < pieces.length; i++) {

        let randomPiece_1 = Math.floor(Math.random() * pieces.length);
        let randomPice_2 = Math.floor(Math.random() * pieces.length);

        let auxiliar = pieces[randomPiece_1];
        pieces[randomPiece_1] = pieces[randomPice_2];
        pieces[randomPice_2] = auxiliar;

    }

    //Add images to the initial pieces
    for (let i = 0; i < rows * columns; i++) {
        let tile = document.createElement('img');
        tile.src = './src/imgs/gtav/imgs-cuted/part_' + pieces[i] + '.png';
        //Drag Functionality
        tile.addEventListener('dragstart', dragStart);   // Click on image to drag
        tile.addEventListener('dragover', dragOver);     // Drag an image
        tile.addEventListener('dragenter', dragEnter);   // Dragging an image into another one
        tile.addEventListener('dragleave', dragLeave);   // Dragging an image away from another
        tile.addEventListener('drop', drop);             // When you drop an image into another one
        tile.addEventListener('dragend', dragEnd);       // after you complete the dragDrop

        document.getElementById('pieces').appendChild(tile);
    }

}

function dragStart() {
    currentSelectedTile = this; //Referes to the selected (clicked image)
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {
    e.preventDefault();
}

function dragLeave() {

}

function drop() {
    destinyTile = this;
}

function dragEnd() {
    //To not drag white or dark images
    if (currentSelectedTile.src.includes('white') || currentSelectedTile.src.includes('black')) {
        return;
    }
    //Swap imgs surces
    let currentImg = currentSelectedTile.src;
    let otherImg = destinyTile.src;
    currentSelectedTile.src = otherImg;
    destinyTile.src = currentImg;
    //Increment turn
    turns += 1;
    document.getElementById('turns').innerText = turns;
}