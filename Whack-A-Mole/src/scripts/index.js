let currentMolePipe;
let currentPlantPipe;
let score = 0;
let plantClicked = false;
let moleInterval;
let plantInterval;
let BOARD_SIZE = 3;
let MOLE_INTERVAL = 750;
let PLANT_INTERVAL = MOLE_INTERVAL * 2;
let SCORE_TO_WIN = 500;
let clickedDifficulty;

window.onload = () => {
    setPipes();
    waitForStart();
}

function waitForStart() {
    const difficultyButtons = document.getElementsByClassName('difficulty');
    //Add a listener for each difficulty botton
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', (event) => {
            clickedDifficulty = parseInt(event.target.innerText);
            setGame();
        });
    }
}

function setGame() {
    //Change the variables of the difficulty for the user choice
    switch (clickedDifficulty) {
        case 1:
            MOLE_INTERVAL = 3000;
            break;
        case 2:
            MOLE_INTERVAL = 1500;
            break;
        case 3:
            MOLE_INTERVAL = 750;
            break;
    }
    //Change the position of the Mole every 2 seconds
    moleInterval = setInterval(setMole, MOLE_INTERVAL);
    plantInterval = setInterval(setPlant, PLANT_INTERVAL);
}

function resetGame() {
    let body = document.getElementsByTagName('body')[0];
    body.style.color = 'rgb(180, 121, 12)';
    let scoreElement = document.getElementById('score');
    scoreElement.style.color = 'rgb(180, 121, 12)';
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    currentMolePipe = null;
    currentPlantPipe = null;
    score = 0;
    plantClicked = false;
    document.getElementById('score').innerText = '0';
    let board = document.getElementById('board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    // Recreate the pipes after being cleaning at the restart
    setPipes();

    // Deletes the restart button
    let restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.parentNode.removeChild(restartBtn);
    }

    // Restart the title
    let title = document.getElementById('title');
    title.innerText = 'Whack a Mole';
    title.style.color = 'rgb(180, 121, 12)';
}

//Set up the grid for the game board
function setPipes() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            let pipe = document.createElement('div');
            pipe.id = i + '_' + j;
            document.getElementById('board').appendChild(pipe);
        }
    }
}

function getRandomCordinate() {
    // Math.random --> (0,1) * 3 = (0,3) --> round down with Math.floor to (0,2)
    random_x = Math.floor(Math.random() * BOARD_SIZE)
    random_y = Math.floor(Math.random() * BOARD_SIZE)
    return random_x + '_' + random_y;
}

function setMole() {
    //If the currentMolePipe is initialized then eliminate the current Mole img that its on it
    if (currentMolePipe != null) {
        currentMolePipe.innerHTML = '';
    }
    //Create the Mole img
    let mole = document.createElement('img');
    mole.src = "src/imgs/mole.webp";
    //Add the eventListener for when the Mole is Clicked sum 1 to the score
    mole.addEventListener('click', handleMoleClick);
    //Take a random Pipe
    let random_cordinate = getRandomCordinate();
    //Check if the Mole and the Plant are not in the same Pipe
    if (currentPlantPipe != null && currentPlantPipe.id == random_cordinate) {
        return;
    }
    currentMolePipe = document.getElementById(random_cordinate);
    //Add to the random Pipe the Mole
    currentMolePipe.appendChild(mole);
}

function setPlant() {
    if (currentPlantPipe != null) {
        currentPlantPipe.innerHTML = '';
    }
    let plant = document.createElement('img');
    plant.src = 'src/imgs/piranha-plant.png';

    // If the user press on the Plant the game will finish
    plant.addEventListener('click', handlePlantClick);

    let random_cordinate = getRandomCordinate();
    if (currentMolePipe != null && currentMolePipe.id == random_cordinate) {
        return;
    }
    currentPlantPipe = document.getElementById(random_cordinate);
    currentPlantPipe.appendChild(plant);
}

function checkTheEnd() {
    let title = document.getElementById('title');
    let scoreElement = document.getElementById('score');

    if (plantClicked || score >= SCORE_TO_WIN) {
        if (score >= SCORE_TO_WIN) {
            playWinSound();
        }
        clearInterval(moleInterval);
        clearInterval(plantInterval);
        title.style.color = plantClicked ? 'red' : 'green';
        scoreElement.style.color = plantClicked ? 'red' : 'green';
        // Remove Event listeners at the end of the game
        removeEventListeners();
        title.innerText = plantClicked ? 'YOU LOSED' : 'YOU HAVE WOONED';
        //Create a restart btn
        let restartBtn = document.createElement('button');
        restartBtn.innerText = 'Restart';
        restartBtn.id = 'restartBtn';
        restartBtn.addEventListener('click', resetGame);
        //Add it to the html
        let topVar = document.getElementById('top-var');
        topVar.appendChild(restartBtn);
    }
}


function removeEventListeners() {
    let moles = document.querySelectorAll('#board img[src="src/imgs/mole.webp"]');
    let plants = document.querySelectorAll('#board img[src="src/imgs/piranha-plant.png"]');

    moles.forEach(mole => {
        mole.removeEventListener('click', handleMoleClick);
    });

    plants.forEach(plant => {
        plant.removeEventListener('click', handlePlantClick);
    });
}

function handleMoleClick() {
    score += 10;
    document.getElementById('score').innerText = score.toString();
    playWhackSound();
    checkTheEnd();
}

function handlePlantClick() {
    playLoseSound();
    plantClicked = true;
    checkTheEnd();
}

function playWhackSound() {
    var audio = document.getElementById("whack-audio");
    audio.play();
}

function playWinSound() {
    var audio = document.getElementById("win-audio");
    audio.play();
}

function playLoseSound() {
    var audio = document.getElementById("lose-audio");
    audio.play();
}