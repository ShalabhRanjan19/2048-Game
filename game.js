const gridSize = 4;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

// Initialize the game
function initializeGame() {
    addBlock();
    addBlock();
    renderGrid();
}

// Add a new block (2 or 4) at a random empty position
function addBlock() {
    let emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) emptyCells.push([i, j]);
        }
    }
    if (emptyCells.length === 0) return;
    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
}

// Move and merge tiles up
function moveUp() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        let temp = [];
        for (let row = 0; row < gridSize; row++) {
            if (grid[row][col] !== 0) temp.push(grid[row][col]);
        }
        for (let i = 0; i < temp.length - 1; i++) {
            if (temp[i] === temp[i + 1]) {
                temp[i] *= 2;
                temp.splice(i + 1, 1);
                moved = true;
            }
        }
        for (let row = 0; row < gridSize; row++) {
            const value = temp[row] || 0;
            if (grid[row][col] !== value) moved = true;
            grid[row][col] = value;
        }
    }
    return moved;
}

// Move and merge tiles down
function moveDown() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        let temp = [];
        for (let row = gridSize - 1; row >= 0; row--) {
            if (grid[row][col] !== 0) temp.push(grid[row][col]);
        }
        for (let i = 0; i < temp.length - 1; i++) {
            if (temp[i] === temp[i + 1]) {
                temp[i] *= 2;
                temp.splice(i + 1, 1);
                moved = true;
            }
        }
        for (let row = gridSize - 1; row >= 0; row--) {
            const value = temp[gridSize - 1 - row] || 0;
            if (grid[row][col] !== value) moved = true;
            grid[row][col] = value;
        }
    }
    return moved;
}

// Move and merge tiles left
function moveLeft() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        let temp = [];
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] !== 0) temp.push(grid[row][col]);
        }
        for (let i = 0; i < temp.length - 1; i++) {
            if (temp[i] === temp[i + 1]) {
                temp[i] *= 2;
                temp.splice(i + 1, 1);
                moved = true;
            }
        }
        for (let col = 0; col < gridSize; col++) {
            const value = temp[col] || 0;
            if (grid[row][col] !== value) moved = true;
            grid[row][col] = value;
        }
    }
    return moved;
}

// Move and merge tiles right
function moveRight() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        let temp = [];
        for (let col = gridSize - 1; col >= 0; col--) {
            if (grid[row][col] !== 0) temp.push(grid[row][col]);
        }
        for (let i = 0; i < temp.length - 1; i++) {
            if (temp[i] === temp[i + 1]) {
                temp[i] *= 2;
                temp.splice(i + 1, 1);
                moved = true;
            }
        }
        for (let col = gridSize - 1; col >= 0; col--) {
            const value = temp[gridSize - 1 - col] || 0;
            if (grid[row][col] !== value) moved = true;
            grid[row][col] = value;
        }
    }
    return moved;
}

// Render the grid on the UI
function renderGrid() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = grid[i][j] !== 0 ? grid[i][j] : '';
            tile.dataset.value = grid[i][j];
            container.appendChild(tile);
        }
    }
}

// Listen for keypress events to move tiles
document.addEventListener('keydown', (event) => {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp': moved = moveUp(); break;
        case 'ArrowDown': moved = moveDown(); break;
        case 'ArrowLeft': moved = moveLeft(); break;
        case 'ArrowRight': moved = moveRight(); break;
        default: return;
    }
    if (moved) {
        addBlock();
        renderGrid();
        if (!canMove()) {
            alert('Game Over!');
        }
    }
});

// Check if there are moves available
function canMove() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) return true;
            if (i > 0 && grid[i][j] === grid[i - 1][j]) return true;
            if (j > 0 && grid[i][j] === grid[i][j - 1]) return true;
        }
    }
    return false;
}

// Start the game
initializeGame();
