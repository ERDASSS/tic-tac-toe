const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY]];
let player = CROSS;
let end = false;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (checkCell(row, col) && !end) {
        renderSymbolInCell(player, row, col);
        field[row][col] = player;
        if (checkWin() === EMPTY) {
            player = player === CROSS ? ZERO : CROSS;
            let emptyCounter = 0;
            for (let i = 0; i < 3; i++) {
                if (field[i].includes(EMPTY)) {
                    emptyCounter++;
                }
            }
            if (emptyCounter === 0) 
                alert('Tie')
        } else {
            end = true;
            alert(player)
        }
    }
    console.log(field);
}

function checkWin () {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] != EMPTY) {
            renderSymbolInCell(player, i, 0, "#ff0000")
            renderSymbolInCell(player, i, 1, "#ff0000")
            renderSymbolInCell(player, i, 2, "#ff0000")
            return player;
        }

        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[2][i] != EMPTY) {
            renderSymbolInCell(player, 0, i, "#ff0000")
            renderSymbolInCell(player, 1, i, "#ff0000")
            renderSymbolInCell(player, 2, i, "#ff0000")
            return player;
        }

        if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[2][2] != EMPTY) {
            renderSymbolInCell(player, 0, 0, "#ff0000")
            renderSymbolInCell(player, 1, 1, "#ff0000")
            renderSymbolInCell(player, 2, 2, "#ff0000")
            return player;
        }

        if (field[2][0] === field[1][1] && field[1][1] === field[0][2] && field[0][2] != EMPTY) {
            renderSymbolInCell(player, 2, 0, "#ff0000")
            renderSymbolInCell(player, 1, 1, "#ff0000")
            renderSymbolInCell(player, 0, 2, "#ff0000")
            return player;
        }
    }   
    return EMPTY;
}

function checkCell (row, col) {
    return field[row][col] === EMPTY ? true : false;
}

function renderSymbolInCell (symbol, row, col, color = '#336') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
            end = false;
        }
    }
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
