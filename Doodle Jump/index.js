document.addEventListener('DOMContentLoaded', () => {
    //Variables
    const grid = document.querySelector('.grid');
    const ball = document.createElement('div');
    let gameOver = false;
    let ballLeftSpace = 50;
    let ballBottomSpace = 150;
    
    class platform{
        constructor(newPlatBottom){
            this.left = 
        }
    }

    function createBall (){
        grid.appendChild(ball);
        ball.classList.add('ball');
        ball.style.bottom = ballBottomSpace + 'px';
    }
    createBall();
})