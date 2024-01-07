//Random apareance for the Mole and the plant
let currentMolePipe;
let currentPlantPipe;
//Score
let score = 0;
let SCORE_TO_WIN = 500;
//Plant clicked
let losedGame = false;
//Interval of the apareance of the Mole and the Plant
let moleInterval;
let plantInterval;
let MOLE_INTERVAL = 750;
let PLANT_INTERVAL = MOLE_INTERVAL * 2;
//Size of the board
let BOARD_SIZE = 3;
//Difficulty selected by the user
let clickedDifficulty;
//Audios
let tapOnMoleAudio = new Audio('./src/sounds/tap-on-mole.wav');
let winGameAudio = new Audio('./src/sounds/game-winned.wav');
let loseGameAudio = new Audio('./src/sounds/game-losed.wav');
//Time
let countdownInterval;
let countdownValue = 30;

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
    startCountdown();
    //Change the position of the Mole every 2 seconds
    moleInterval = setInterval(setMole, MOLE_INTERVAL);
    plantInterval = setInterval(setPlant, PLANT_INTERVAL);
}

function resetGame() {
    let body = document.getElementsByTagName('body')[0];
    let scoreElement = document.getElementById('score');
    let countDownElement = document.getElementById('countdown');

    countdownValue = 30
    countDownElement.innerText = countdownValue.toString();
    body.style.color = 'rgb(180, 121, 12)';
    scoreElement.style.color = 'rgb(180, 121, 12)';
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    currentMolePipe = null;
    currentPlantPipe = null;
    score = 0;
    losedGame = false;
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
    if (losedGame || score >= SCORE_TO_WIN) {
        if (score >= SCORE_TO_WIN) {
            playWinSound();
        }
        if(countdownValue <= 0){
            playLoseSound();
        }
        clearInterval(countdownInterval);
        setTheEnd();
    }
}

function setTheEnd() {
    let title = document.getElementById('title');
    let scoreElement = document.getElementById('score');

    clearInterval(moleInterval);
    clearInterval(plantInterval);
    title.style.color = losedGame ? 'red' : 'green';
    scoreElement.style.color = losedGame ? 'red' : 'green';
    // Remove Event listeners at the end of the game
    removeEventListeners();
    title.innerText = losedGame ? 'YOU LOSED' : 'YOU HAVE WOONED';
    //Create a restart btn
    let restartBtn = document.createElement('button');
    restartBtn.innerText = 'Restart';
    restartBtn.id = 'restartBtn';
    restartBtn.addEventListener('click', resetGame);
    //Add it to the html
    let topVar = document.getElementById('top-var');
    topVar.appendChild(restartBtn);
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
    losedGame = true;
    checkTheEnd();
}

//Countdown functions: 
function startCountdown() {
    countdownInterval = setInterval(function () {
        countdownValue--;
        updateCountdown();

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            handleTimeout(); // Define this function to handle the end of time
        }
    }, 1000); // The interval is 1 second (1000 milliseconds)
}

function updateCountdown() {
    document.getElementById('countdown').innerText = countdownValue;
}

function handleTimeout() {
    losedGame = true;
    checkTheEnd();
}

//The audios are cloned in orther to be played multiple times at the same time, especially when you click to time a MoleVery quickly
function playWhackSound() {
    let soundCloned = tapOnMoleAudio.cloneNode(true);
    soundCloned.play();
}

function playWinSound() {
    let soundCloned = winGameAudio.cloneNode(true);
    soundCloned.play();
}

function playLoseSound() {
    let soundCloned = loseGameAudio.cloneNode(true);
    soundCloned.play();
}

