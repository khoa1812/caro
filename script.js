const boardSize = 15;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(""));
let currentPlayer = "X";

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.addEventListener('click', () => makeMove(i, j));
            boardElement.appendChild(cellElement);
        }
    }
}

function makeMove(row, col) {
    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        const index = row * boardSize + col;
        const cell = document.getElementsByClassName("cell")[index];
        cell.textContent = currentPlayer;
        if (checkWinner(row, col)) {
            setTimeout(() => {
                alert(currentPlayer + " is the winner!");
                location.reload();
            }, 100);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner(row, col) {
    const directions = [
        [[-1, 0], [1, 0]],
        [[0, -1], [0, 1]],
        [[-1, -1], [1, 1]],
        [[-1, 1], [1, -1]]
    ];

    for (let direction of directions) {
        let count = 1;
        for (let i = 0; i < 2; i++) {
            let step = 1;
            while (true) {
                const curRow = row + step * direction[i][0];
                const curCol = col + step * direction[i][1];
                if (curRow >= 0 && curRow < boardSize && curCol >= 0 && curCol < boardSize && board[curRow][curCol] === currentPlayer) {
                    count++;
                    step++;
                } else {
                    break;
                }
            }
        }
        if (count >= 5) return true;
    }
    return false;
}

createBoard();
