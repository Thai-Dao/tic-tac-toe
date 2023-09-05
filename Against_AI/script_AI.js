const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

let currentPlayer = 'circle'; // Set the initial player to 'circle'
infoDisplay.textContent = 'Circle goes first';

let gameIsOver = false;

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

function aiMove() {
  if (gameIsOver || currentPlayer !== 'cross') {
    return; // AI (cross) should only move when it's its turn
  }

  const emptySquares = document.querySelectorAll(
    '.square:not(.circle):not(.cross)'
  );
  if (emptySquares.length === 0) {
    return; // No empty squares left
  }

  // Filter out squares that are already taken
  const unoccupiedSquares = [...emptySquares].filter(
    (square) =>
      !square.classList.contains('circle') &&
      !square.classList.contains('cross')
  );

  if (unoccupiedSquares.length === 0) {
    return; // No unoccupied squares left
  }

  // Randomly select an empty square for the AI's move
  const randomIndex = Math.floor(Math.random() * unoccupiedSquares.length);
  const aiSquare = unoccupiedSquares[randomIndex];

  const goDisplay = document.createElement('div');
  goDisplay.classList.add('cross'); // AI always plays as 'cross'
  aiSquare.append(goDisplay);
  currentPlayer = 'circle'; // Switch to the player's turn
  infoDisplay.textContent = 'It is now ' + currentPlayer + "'s go.";
  aiSquare.removeEventListener('click', addGo);
  checkScore();
}

// Modify your addGo function to call aiMove after player's move
function addGo(e) {
  const square = e.target;

  // Check if the square has already been clicked (contains 'circle' or 'cross' class)
  if (
    !square.classList.contains('circle') &&
    !square.classList.contains('cross') &&
    !gameIsOver
  ) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(currentPlayer);
    square.append(goDisplay);
    square.removeEventListener('click', addGo); // Remove the event listener
    checkScore();

    if (!gameIsOver) {
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Switch players
      infoDisplay.textContent = 'It is now ' + currentPlayer + "'s go.";

      if (currentPlayer === 'cross') {
        // Delay the AI move by 2 seconds
        setTimeout(() => {
          aiMove();
        }, 1000);
      }
    }
  }
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square');
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let circleWins = false;
  let crossWins = false;

  // Check for a winning combination
  winningCombos.forEach((array) => {
    if (
      array.every((cell) =>
        allSquares[cell].firstChild?.classList.contains('circle')
      )
    ) {
      circleWins = true;
    }

    if (
      array.every((cell) =>
        allSquares[cell].firstChild?.classList.contains('cross')
      )
    ) {
      crossWins = true;
    }
  });

  // Check for a draw
  const isBoardFull = [...allSquares].every(
    (square) =>
      square.firstChild?.classList.contains('circle') ||
      square.firstChild?.classList.contains('cross')
  );

  if (circleWins) {
    infoDisplay.textContent = 'Circle Wins!';
    restartButton.style.display = 'block';
  } else if (crossWins) {
    infoDisplay.textContent = 'Cross Wins!';
    restartButton.style.display = 'block';
  } else if (isBoardFull) {
    infoDisplay.textContent = "It's a Draw!";
    restartButton.style.display = 'block';
  } else if (circleWins || crossWins || isBoardFull) {
    gameIsOver = true; // Mark the game as over
  }
}

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// Function to restart the game
function restartGame() {
  window.location.reload();
}
