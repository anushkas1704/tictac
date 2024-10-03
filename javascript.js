let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function createBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        scores[currentPlayer]++;
        updateScore();
        showConfetti(currentPlayer);
        showWinnerPopup(currentPlayer);
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        showWinnerPopup('Draw');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
}

function updateScore() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    removeConfetti();
    removeWinnerPopup();
}

function showConfetti(player) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.opacity = Math.random();
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.innerText = player;
        document.body.appendChild(confetti);
    }
}

function removeConfetti() {
    const confetti = document.querySelectorAll('.confetti');
    confetti.forEach(c => c.remove());
}

function showWinnerPopup(winner) {
    const popup = document.createElement('div');
    popup.classList.add('winner-popup');
    popup.innerHTML = winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`;
    document.body.appendChild(popup);
    setTimeout(() => removeWinnerPopup(), 3000);
}

function removeWinnerPopup() {
    const popup = document.querySelector('.winner-popup');
    if (popup) popup.remove();
}

createBoard();