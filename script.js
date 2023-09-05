const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

/* Const is a assignment of a variable 
    variable is a value that you assign
    [ ] = array - used to store list of object aka data
*/

let go = 'circle';
infoDisplay.textContent = 'Circle go First';

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameboard.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement('div');
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === 'circle' ? 'cross' : 'circle';
  infoDisplay.textContent = 'it is now  ' + go + "'s go.";
  e.target.removeEventListener('click', addGo);
  checkScore();
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

  if (circleWins) {
    infoDisplay.textContent = 'Circle Wins!';
    restartButton.style.display = 'block'; // Show the restart button
  } else if (crossWins) {
    infoDisplay.textContent = 'Cross Wins!';
    restartButton.style.display = 'block'; // Show the restart button
  }
}

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// Function to restart the game
function restartGame() {
  window.location.reload();
}
