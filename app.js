// ==========================================
// DOM ELEMENTS
// ==========================================
const leftLabel = document.getElementById("left-label");
const rightLabel = document.getElementById("right-label");
const landing = document.getElementById("landing-page");
const game = document.getElementById("game-page");
const loadingScreen = document.getElementById("loading-screen");

const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");

const progress = document.querySelector(".loading-progress");
const loadingTitle = document.querySelector(".loading-title");
const loadingText = document.querySelector(".loading-text");

const popup = document.getElementById("result-popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");

const playAgainBtn = document.getElementById("play-again-btn");
const menuBtn = document.getElementById("menu-btn");

const playerScore = document.getElementById("player-score");
const aiScore = document.getElementById("ai-score");

const turnText = document.getElementById("turn-text");
const gameModeText = document.getElementById("game-mode");

const cards = document.querySelectorAll(".mode-card");
const cells = document.querySelectorAll(".cell");


// ==========================================
// GAME VARIABLES
// ==========================================

let board = ["","","","","","","","",""];

let currentPlayer = "X";

let gameActive = true;

let selectedMode = "easy";

let playerPoints = 0;

let aiPoints = 0;


// ==========================================
// GAME MODE
// ==========================================

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        cards.forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");

        selectedMode = card.dataset.mode;

    });

});


// ==========================================
// START GAME
// ==========================================

startBtn.addEventListener(("click"),()=>{

    landing.classList.add("hidden");

    loadingScreen.classList.remove("hidden");
    loadingScreen.classList.add("show-loading");

    progress.classList.remove("loading");

    void progress.offsetWidth;

    progress.classList.add("loading");

    loadingTitle.textContent = "INITIALIZING AI...";
    loadingText.textContent = "CONNECTING TO NEON GRID";

    setTimeout(() => {

        loadingTitle.textContent = "LOADING GAME...";
        loadingText.textContent = "PREPARING BATTLEFIELD";

    }, 700);

    setTimeout(() => {

        loadingTitle.textContent = "WELCOME PLAYER";
        loadingText.textContent = "SYSTEM READY";

    }, 1400);

    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        loadingScreen.classList.remove("show-loading");

        game.classList.remove("hidden");

        if (selectedMode === "easy") {

            gameModeText.textContent = "EASY AI";
            leftLabel.textContent = "PLAYER";
            rightLabel.textContent = "AI";

        }
        else if (selectedMode === "hard") {

            gameModeText.textContent = "HARD AI";
            leftLabel.textContent = "PLAYER";
            rightLabel.textContent = "AI";

        }
        else {

            gameModeText.textContent = "PLAY WITH FRIEND";
            leftLabel.textContent = "PLAYER 1";
            rightLabel.textContent = "PLAYER 2";

        }

    }, 2000);

});




// ==========================================
// BACK BUTTON
// ==========================================

backBtn.addEventListener("click",()=>{

    resetBoard();
    playerPoints = 0;
aiPoints = 0;

playerScore.textContent = 0;
aiScore.textContent = 0;
    game.classList.add("hidden");

    landing.classList.remove("hidden");

});


// ==========================================
// CELL EVENTS
// ==========================================

cells.forEach(cell=>{

    cell.addEventListener("click",handleCellClick);

});


// ==========================================
// PLAYER MOVE
// ==========================================

function handleCellClick(e){

    if(!gameActive) return;

    const cell = e.target;

    const index = cell.dataset.index;

    if(board[index]!="") return;

    board[index] = currentPlayer;

cell.textContent = currentPlayer;

cell.style.color = currentPlayer === "X"
    ? "white"
    : "#ff1744";

    const result = checkWinner();

    if(result){

        endGame(result);

        return;

    }

    // FRIEND MODE

if(selectedMode === "friend"){

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    turnText.textContent =
        currentPlayer === "X"
        ? "PLAYER 1 TURN"
        : "PLAYER 2 TURN";

    return;

}

    turnText.textContent="AI THINKING...";

    if(selectedMode==="easy"){

        setTimeout(aiMove,500);

    }

    else{

        setTimeout(hardAiMove,500);

    }

}
// ==========================================
// EASY AI
// ==========================================

function aiMove(){

    if(!gameActive) return;

    let emptyCells = [];

    board.forEach((cell,index)=>{

        if(cell===""){

            emptyCells.push(index);

        }

    });

    if(emptyCells.length===0) return;

    const move = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    board[move] = "O";

    cells[move].textContent = "O";
    cells[move].style.color = "#ff1744";

    const result = checkWinner();

    if(result){

        endGame(result);

        return;

    }

    turnText.textContent = "YOUR TURN";

}


// ==========================================
// HARD AI (MINIMAX)
// ==========================================

function hardAiMove(){

    if(!gameActive) return;

    let bestScore = -Infinity;
    let bestMove = -1;

    for(let i=0;i<9;i++){

        if(board[i]===""){

            board[i]="O";

            let score = minimax(board,false);

            board[i]="";

            if(score>bestScore){

                bestScore = score;
                bestMove = i;

            }

        }

    }

    if(bestMove===-1) return;

    board[bestMove]="O";

    cells[bestMove].textContent="O";
    cells[bestMove].style.color="#ff1744";

    const result = checkWinner();

    if(result){

        endGame(result);

        return;

    }

    turnText.textContent="YOUR TURN";

}


// ==========================================
// MINIMAX
// ==========================================

function minimax(boardState,isMaximizing){

    const score = evaluateBoard(boardState);

    if(score!==null){

        return score;

    }

    if(isMaximizing){

        let bestScore=-Infinity;

        for(let i=0;i<9;i++){

            if(boardState[i]===""){

                boardState[i]="O";

                let value=minimax(boardState,false);

                boardState[i]="";

                bestScore=Math.max(bestScore,value);

            }

        }

        return bestScore;

    }

    else{

        let bestScore=Infinity;

        for(let i=0;i<9;i++){

            if(boardState[i]===""){

                boardState[i]="X";

                let value=minimax(boardState,true);

                boardState[i]="";

                bestScore=Math.min(bestScore,value);

            }

        }

        return bestScore;

    }

}


// ==========================================
// BOARD EVALUATION
// ==========================================

function evaluateBoard(boardState){

    for(const combo of winningCombinations){

        const [a,b,c]=combo;

        if(

            boardState[a] &&
            boardState[a]===boardState[b] &&
            boardState[a]===boardState[c]

        ){

            if(boardState[a]==="O") return 10;

            if(boardState[a]==="X") return -10;

        }

    }

    if(!boardState.includes("")){

        return 0;

    }

    return null;

}


// ==========================================
// WINNING COMBINATIONS
// ==========================================

const winningCombinations=[

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


// ==========================================
// CHECK WINNER
// ==========================================

function checkWinner(){

    for(const combo of winningCombinations){

        const [a,b,c]=combo;

        if(

            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]

        ){

            gameActive=false;

            return board[a];

        }

    }

    if(!board.includes("")){

        gameActive=false;

        return "draw";

    }

    return null;

}
// ==========================================
// END GAME
// ==========================================

function endGame(result){

    gameActive = false;

    popup.classList.remove("hidden");

    // PLAYER 1 / PLAYER
    if(result === "X"){

        if(selectedMode === "friend"){

            popupTitle.textContent = "PLAYER 1 WINS";
            popupMessage.textContent = "Excellent Match!";

        }
        else{

            popupTitle.textContent = "PLAYER WINS";
            popupMessage.textContent = "Outstanding Move";

        }

        playerPoints++;
        playerScore.textContent = playerPoints;

    }

    // PLAYER 2 / AI
    else if(result === "O"){

        if(selectedMode === "friend"){

            popupTitle.textContent = "PLAYER 2 WINS";
            popupMessage.textContent = "Excellent Match!";

        }
        else{

            popupTitle.textContent = "AI WINS";
            popupMessage.textContent = "Neural Core Victorious";

        }

        aiPoints++;
        aiScore.textContent = aiPoints;

    }

    // DRAW
    else{

        popupTitle.textContent = "DRAW";

        if(selectedMode === "friend"){

            popupMessage.textContent = "Nobody Wins";

        }
        else{

            popupMessage.textContent = "AI Couldn't Beat You";

        }

    }

}

function drawWinningLine(combo){

    const canvas = document.getElementById("win-canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = 450;
    canvas.height = 450;

    ctx.strokeStyle = "#ff1744";
    ctx.lineWidth = 8;

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff1744";

    // We'll calculate start/end points based on combo
}


// ==========================================
// RESET BOARD
// ==========================================

function resetBoard(){

    board=["","","","","","","","",""];

    gameActive=true;

    currentPlayer="X";

    turnText.textContent="YOUR TURN";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.style.color="white";

    });

}


// ==========================================
// PLAY AGAIN
// ==========================================

playAgainBtn.addEventListener("click",()=>{

    popup.classList.add("hidden");

    resetBoard();

});


// ==========================================
// MAIN MENU
// ==========================================

menuBtn.addEventListener("click",()=>{

    popup.classList.add("hidden");

    resetBoard();

    game.classList.add("hidden");

    landing.classList.remove("hidden");

});

let dots=0;

const thinking=setInterval(()=>{

    dots=(dots+1)%4;

    turnText.textContent="AI THINKING"+".".repeat(dots);

},250);

