const nextBtn = document.getElementById('next');
const startBtn = document.getElementById('start');
const mode = document.getElementsByClassName('mode')[0];
const symbol = document.getElementsByClassName('symbol')[0];
const result = document.getElementsByClassName('result')[0];
const game = document.getElementsByClassName('game')[0];
const compMode = document.getElementById('computer');
const humanMode = document.getElementById('human');
const player01 = document.getElementById('player01');
const player02 = document.getElementById('player02');
const x = document.getElementById('x');
const o = document.getElementById('o');
const visual = document.getElementById('visual');
const playAgain = document.getElementById('playAgain');
const box = document.getElementsByClassName('box');
const resultHeading = document.querySelector('.result > h3');


// COMPUTER MODE IS TO BE UPDATED

let modeValue, symbolValue, CurrentPlayer, Player01, Player02, winner;
let count = 0;
checkGameMode();


function checkGameMode() {
    compMode.addEventListener('click', (e) => {
        alert('COMPUTER MODE is under Development\nPlease Select HUMAN MODE\nComputer mode will be enabled soon')
        // modeValue = e.target.value;
        // nextBtn.innerText = "NEXT";
        // // Player02 will be the computer
    });
    humanMode.addEventListener('click', (e) => {
        modeValue = e.target.value;
        nextBtn.innerText = "START";
        Player01 = 'X';
        Player02 = 'O';
        CurrentPlayer = Player01;
    });
};

function checkPlayerSymbol() {
    x.addEventListener('click', (e) => {
        symbolValue = e.target.value;
        Player01 = 'X';
        Player02 = 'O'; // COMPUTER
        CurrentPlayer = Player01;
    });
    o.addEventListener('click', (e) => {
        symbolValue = e.target.value;
        Player01 = 'O';
        Player02 = 'X'; // COMPUTER
        CurrentPlayer = Player01;
    });
}



nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (modeValue == 'computer') {
        console.log("SELECTED GAME MODE : ", modeValue);
        mode.classList.add('hide');
        symbol.classList.remove('hide');
        player02.innerText = 'COMPUTER';
        player01.innerText = 'YOU';
        checkPlayerSymbol();
    }
    else if (modeValue == 'human') {
        console.log("SELECTED GAME MODE : ", modeValue);
        mode.classList.add('hide');
        game.classList.remove('hide');
    }
    else {
        alert("Please Select GAME MODE !")
    }
});

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (symbolValue == 'x') {
        console.log("SELECTED SYMBOL : ", symbolValue);
        symbol.classList.add('hide');
        game.classList.remove('hide');
    }
    else if (symbolValue == 'o') {
        console.log("SELECTED SYMBOL : ", symbolValue);
        symbol.classList.add('hide');
        game.classList.remove('hide');
    }
    else {
        alert("Please Select PLAYER SYMBOL !")
    }
});

// Converting object of Class List into an Array
Object.values(box).forEach(elm => {
    elm.addEventListener('click', (event) => {
        if (event.target.innerText === '') {
            event.target.innerText = CurrentPlayer;
            event.target.value = CurrentPlayer;
            CheckResult();
            switchTurn();
        } else {
            alert("This Box Is Already Selected");
        }

    })
});


function switchTurn() {
    if (CurrentPlayer == Player01) {
        CurrentPlayer = Player02;
        player01.classList.remove('turn');
        player02.classList.add('turn');
    }
    else {
        CurrentPlayer = Player01;
        player02.classList.remove('turn');
        player01.classList.add('turn');
    }
}

function CheckResult() {
    count++;
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    let boxes = Object.values(box);

    for (const chance of win) {

        if (boxes[chance[0]].value == Player01 && boxes[chance[1]].value == Player01 && boxes[chance[2]].value == Player01) {
            winner = Player01;
            showResult(winner);
            console.log("Winner is Player1");
            break;
        }
        else if (boxes[chance[0]].value == Player02 && boxes[chance[1]].value == Player02 && boxes[chance[2]].value == Player02) {
            winner = Player02;
            showResult(winner)
            console.log("Winner is Player2");
            break;
        }
        else if (count >= 9) {
            winner = 'none';
            showResult(winner);
            console.log('ITS DRAW');
            break;
        }


    }
}

function showResult(winner) {

    const visualList = ['🥳🎉🎊', '😵‍💫🫨', '😣😥']; // Winner = 0, Draw = 1, Looser = 2;


    if (winner == Player01) {
        if (modeValue == 'computer') {
            resultHeading.innerText = 'YOU WIN THE GAME'
            visual.innerText = visualList[0];
        } else {
            resultHeading.innerText = 'PLAYER 1 WINS THE GAME'
            visual.innerText = visualList[0];
        }
    }
    else if (winner == Player02) {
        if (modeValue == 'computer') {
            resultHeading.innerText = 'COMPUTER WINS THE GAME'
            visual.innerText = visualList[0];
        } else {
            resultHeading.innerText = 'PLAYER 2 WINS THE GAME'
            visual.innerText = visualList[0];
        }
    }
    else if (winner == 'none') {
        resultHeading.innerText = 'OPPS! ITS A DRAW'
        visual.innerText = visualList[1];
    }

    result.style.display = 'grid';
    setTimeout(() => {
        result.style.opacity = 1;
        result.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 400);

}

playAgain.addEventListener('click', (e) => {
    location.reload();
})