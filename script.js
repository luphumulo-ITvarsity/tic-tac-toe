const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = false;

let playerNames = {
  X: 'Player X',
  O: 'Player O'
};

function startGame() {
  const nameX = document.getElementById('playerX').value.trim();
  const nameO = document.getElementById('playerO').value.trim();

  if (!nameX || !nameO) {
    alert("Please enter names for both players.");
    return;
  }

  playerNames.X = nameX;
  playerNames.O = nameO;
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
}

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;

  if (cell.textContent || !gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${playerNames[currentPlayer]} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell.textContent)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
}

function checkWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a].textContent &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}

function restartGame() {
  if (!playerNames.X || !playerNames.O) {
    statusText.textContent = "Please start the game first.";
    return;
  }
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
}
