let origBoard;

let aiX = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="#F2B137" d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>`;
let aiO = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="#F2B137" d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/></svg>`;
let huX = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="#31C3BD" d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>`;
let huO = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path fill="#31C3BD" d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/></svg>`;

let aiPlayer = aiO;
let huPlayer = huX;

let playerTurn = "X";

const aiDelay = 400;
const delay = 600;
const turnIndicatorImg = document.querySelector(".turn__p img");

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
];

const cells = document.querySelectorAll(".cell");
startGame();

function selectSym(sym) {
  const btnX = document.querySelector(".btnX");
  const btnO = document.querySelector(".btnO");
  if (sym === "X") {
    btnO.classList.remove("selected");
    btnX.classList.add("selected");
  } else {
    btnX.classList.remove("selected");
    btnO.classList.add("selected");
  }

  huPlayer = sym === "X" ? huX : huO;
  aiPlayer = sym === "O" ? aiX : aiO;
}

function closeLobby() {
  document.querySelector(".lobby").style.display = "none";
  startGame();
}

function startGame() {
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", turnClick, false);
  }

  document.querySelector(".modal__infos").style.display = "none";
  document.querySelector(".modal__restart").style.display = "none";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].style.removeProperty("background-color");
  }

  if (aiPlayer === aiX) {
    turn(bestSpot(), aiPlayer);
  }
}

function restartGame() {
  document.querySelector(".modal__restart").style.display = "flex";
}

function closeModal() {
  document.querySelector(".modal__restart").style.display = "none";
}

function quit() {
  document.querySelector(".modal__infos").style.display = "none";
  document.querySelector(".lobby").style.display = "flex";
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] === "number") {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      setTimeout(() => {
        turn(bestSpot(), aiPlayer);
      }, aiDelay);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(
    gameWon.player === huPlayer ? "You won!" : "Oh no, you lost..."
  );
}

function declareWinner(who) {
  setTimeout(() => {
    document.querySelector(".modal__infos").style.display = "flex";
    document.querySelector(".modal__infos .modal__infos--player").innerText =
      who;
    document.querySelector(".modal__infos .modal__infos--winner").innerText =
      "Takes the round";
  }, delay);
}

function declareTie(who) {
  setTimeout(() => {
    document.querySelector(".modal__infos").style.display = "flex";
    document.querySelector(".modal__infos .modal__infos--player").innerText =
      "";
    document.querySelector(".modal__infos .modal__infos--winner").style.color =
      "#A8BFC9";
    document.querySelector(".modal__infos .modal__infos--winner").innerText =
      who;
  }, delay);
}

function emptySquares() {
  return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener("click", turnClick, false);
    }
    declareTie("Round tied");
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === aiPlayer) move.score = minimax(newBoard, huPlayer).score;
    else move.score = minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if (
      (player === aiPlayer && move.score === 10) ||
      (player === huPlayer && move.score === -10)
    )
      return move;
    else moves.push(move);
  }

  let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
