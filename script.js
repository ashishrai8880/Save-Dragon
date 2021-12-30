class keyboardControl {

    upKey() {
        let dino = document.getElementById('dino');
        dino.classList.add('dinoJump');
    
        setTimeout(() => {
            dino.classList.remove('dinoJump');
        }, 1000);
    }

    leftKey() {
        let dino = document.getElementById('dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }

    rightKey() {
        let dino = document.getElementById('dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }
}

class Win {
    checkWin() {
        let dino = document.getElementById('dino');
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        let obstacle = document.getElementById('dragon');
        let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        if (Math.abs(dx - ox) < 230 && Math.abs(dy - oy) < 52) {
            dragon.style.left = ox + "px";
            dragon.classList.remove('dragonAni');
            gameOver = true;
            return true;

        } else {
            return false;
        }

    }
}

class Score {
    score = 0;
    updateScore() {
        let dino = document.getElementById('dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        let obstacle = document.getElementById('dragon');
        let oX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));

        let diffrence = dinoX - oX;
        if (diffrence > 0 && cross) {
            this.score = this.score + 1;
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            let level = new IncreseLevel();
            level.increaseLevel();
        }

    }
    showScore() {
        let yourScore = document.getElementById('yourScore');
        yourScore.innerText = this.score;
    }
}

class IncreseLevel {
    increaseLevel() {
        setTimeout(() => {

            let obstacle = document.getElementById('dragon');
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';

        }, 500);

    }
}
// ------------------------------------Program Start from here------------------------------------------
// ------------------------------------Program Start from here------------------------------------------
let gameAudio = new Audio('tune/music.mp3');
let gameFinish = new Audio('tune/ting.mp3');

let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    let intro = document.getElementsByClassName('intro')[0];
    intro.style.visibility = 'hidden';
    let dragon = document.getElementById('dragon');
    dragon.classList.add('dragonAni');
    let dino = document.getElementById('dino');
    dino.style.bottom = '0vh';
    dino.style.left = '0vw';
    gameAudio.play();    
    gameAudio.currentTime = 0;
    sc.score = 0;
})

var cross = true;

var gameOver = false;
let k = new keyboardControl;
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        k.upKey();
    }
    if (e.keyCode == 39) {
        k.leftKey();
    }
    if (e.keyCode == 37) {
        k.rightKey();
    }
})

let win = new Win();
setInterval(() => {
    if (gameOver == false) {
        win.checkWin();
    }
}, 100);

let sc = new Score();
setInterval(() => {
    if (win.checkWin() == false) {
        sc.updateScore();
        sc.showScore();
    } else {
        let intro = document.getElementsByClassName('intro')[0];
        let heading = document.getElementById('heading');
        heading.innerText = "Game Over"
        let btn = document.getElementById('btn');
        btn.innerText = "Play Again";
        intro.style.visibility = 'visible';

        let dino = document.getElementById('dino');
        dino.style.bottom = '-20vh';
        dino.style.left = '-20vw';
        gameAudio.pause();
        gameFinish.play();

    }
}, 100);








