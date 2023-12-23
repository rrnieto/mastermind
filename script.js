// script.js

const colors = ['gray', 'red', 'blue', 'green', 'yellow', 'black', 'white'];

let activeRow = 0;
let secretPattern = generateSecretPattern();

function generateSecretPattern() {
  const pattern = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    pattern.push(colors[randomIndex]);
  }
  return pattern;
}

function createGameBoard(rows, columns) {
  const gameBoard = document.getElementById('game-board');

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < columns; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.row = i;
      square.dataset.column = j;
      square.addEventListener('click', handleSquareClick);

      if (i === activeRow) {
        square.style.backgroundColor = 'gray';
      } else {
        square.style.pointerEvents = 'none';
      }

      row.appendChild(square);
    }

    gameBoard.appendChild(row);
  }

  const validateButton = document.createElement('button');
  validateButton.textContent = 'Validar Ronda';
  validateButton.addEventListener('click', handleValidateClick);
  document.getElementById('guesses').appendChild(validateButton);
}

function handleSquareClick(event) {
  const clickedSquare = event.target;
  const row = parseInt(clickedSquare.dataset.row);

  if (row === activeRow) {
    clickedSquare.style.backgroundColor = getNextColor(clickedSquare.style.backgroundColor);
  }
}


function handleValidateClick() {
    const squares = document.querySelectorAll(`.square[data-row="${activeRow}"]`);
    const guess = Array.from(squares).map(square => square.style.backgroundColor);
  
    if (guess.includes('gray')) {
      alert('Por favor, selecciona un color en cada posición antes de validar.');
    } else {
      if (validateRow(guess)) {
        displayValidationInfo(guess);
        activeRow++;
  
        if (activeRow === 10) {
          endGame();
        } else {
          disableClicksOnPreviousRows();
          resetColorsInActiveRow();
        }
      } else {
        alert('La conjetura no es correcta. Inténtalo de nuevo.');
      }
    }
  }
  
  function validateRow(guess) {
    // Solo validamos la fila activa
    return JSON.stringify(guess) === JSON.stringify(secretPattern);
  }
  
  

function displayValidationInfo(guess) {
  console.log('Guess:', guess);
  console.log('Secret Pattern:', secretPattern);
}

function endGame() {
  console.log('Fin del juego');
}

function getNextColor(currentColor) {
  const currentIndex = colors.indexOf(currentColor);
  const nextIndex = (currentIndex + 1) % colors.length;
  return colors[nextIndex];
}

function disableClicksOnPreviousRows() {
  const rows = document.querySelectorAll('.row');
  for (let i = 0; i < activeRow; i++) {
    const squares = rows[i].querySelectorAll('.square');
    squares.forEach(square => (square.style.pointerEvents = 'none'));
  }
}

function resetColorsInActiveRow() {
  const squares = document.querySelectorAll(`.square[data-row="${activeRow}"]`);
  squares.forEach(square => (square.style.backgroundColor = 'gray'));
}

window.onload = function () {
  createGameBoard(10, 4);
};
