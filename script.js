const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDrawEl = document.getElementById('scoreDraw');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const result = checkWin();
    if (result) {
        highlightWin(result);
        status.textContent = `Player ${currentPlayer} Wins! 🎉`;
        status.classList.add('winner');
        scores[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== '')) {
        status.textContent = "It's a Draw! 🤝";
        scores.Draw++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return pattern;
        }
    }
    return null;
}

function highlightWin(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('win');
    });
}

function updateScoreboard() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.Draw;
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = "Player X's Turn";
    status.classList.remove('winner');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
