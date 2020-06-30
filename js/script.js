const WIDTH = 4;
const COLORS = {
  0: "#ddd",
  2: "#99c2ff",
  4: "#39e600",
  8: "yellow",
  16: "#ff8533",
  32: "orange",
  64: "violet",
  128: "pink",
  256: "#d5ff80",
  512: "#ff66ff",
  1024: "#66d9ff",
  2048: "#ff5c33",
  4096: "#4dffd2",
  8192: "#ffff4d"
}

const board = new Array(WIDTH);
const boardDisplayElement = document.getElementById("board");

let gameOver = false;

// initialize board to two-dimensional array of zeros
function initializeBoard() {
  for (let i = 0; i < WIDTH; i++) {
    board[i] = new Array(WIDTH).fill(0);
  }
}


function reset() {
  gameOver = false;
  for (let row = 0; row < WIDTH; row ++) {
    for (let col = 0; col < WIDTH; col++) {
      board[row][col] = 0;
    }
  }

  makeNewTile();
  makeNewTile();
}

function createGame() {
  setupBoardDisplay();
  initializeBoard();
  makeNewTile();
  makeNewTile();
}

function setupBoardDisplay() {
  for(let i = 0; i < WIDTH * WIDTH; i++) {
    const row = parseInt(i / WIDTH);
    const col = i % WIDTH;
    const newTile = document.createElement("div");
    newTile.className = "tile";
    newTile.id = `tile${row},${col}`;
    boardDisplayElement.appendChild(newTile);
  }
}

function redrawBoard() {
  for(row = 0; row < WIDTH; row++) {
    for(column = 0; column < WIDTH; column++) {
      if (board[row][column] !== 0) {
        document.getElementById(`tile${row},${column}`).innerHTML = board[row][column];
      } else {
        document.getElementById(`tile${row},${column}`).innerHTML = "";
      }
    }
  }
  setColors();
}

function makeNewTile() {
  // check for game end (no zeros on board)
  gameOver = true;
  for (let row = 0; row < WIDTH; row++) {
    for (col = 0; col < WIDTH; col++) {
      if (gameOver && board[row][col] === 0) {
        gameOver = false;
      }
    }
  }

  if(!gameOver) {
    const newTileRow = randomPosition();
    const newTileCol = randomPosition();
    
    if (board[newTileRow][newTileCol] === 0) {
      board[newTileRow][newTileCol] = getNewTileValue();
      // newTile = document.getElementById(`tile${newTileRow},${newTileCol}`);
      // newTile.innerHTML = board[newTileRow][newTileCol];
      redrawBoard();
    } else {
      makeNewTile();
    }
  } else {
    alert(`Game Over!\nFinal Score: ${getScore()}`);
  }
}

function randomPosition() {
  return Math.floor(Math.random() * WIDTH) 
} 

function getNewTileValue() {
  return Math.random() >= 0.9 ? "4" : "2";
}

function setColors() {
  for (let row = 0; row < WIDTH; row++) {
    for (let col = 0; col < WIDTH; col++) {
      tile = document.getElementById(`tile${row},${col}`);
      tile.style.background = COLORS[board[row][col]];
    }
  }
}

function setupEventListeners() {
  document.addEventListener("keydown", event => {
    if(/^Arrow/.test(event.key) && !gameOver) {
      const moveDirection = event.key.slice(5);
      slide(moveDirection);
    }
  });
}

function slide(direction) {
  collapse(direction);
  move(direction);
  makeNewTile();
  redrawBoard();
}

function collapse(direction) {
  switch(direction) {
    case 'Right':
      for (let row = 0; row < WIDTH; row++) {
        for (let col = WIDTH - 2; col >= 0; col--) {
          if(board[row][col] != 0 && board[row][col] == board[row][col + 1]) {
            board[row][col] = 0;
            board[row][col + 1] *= 2;
          }
        }
      }
      break;
    case 'Left':
      for(let row = 0; row < WIDTH; row++) {
        for(let col = 1; col < WIDTH; col++) {
          if(board[row][col] != 0 && board[row][col] == board[row][col - 1]) {
            board[row][col] = 0;
            board[row][col - 1] *= 2;
          }
        }
      }
      break;
    case 'Up':
      for(let col = 0; col < WIDTH; col++) {
        for(let row = 1; row < WIDTH; row++) {
          if(board[row][col] != 0 && board[row][col] == board[row - 1][col]) {
            board[row][col] = 0;
            board[row - 1][col] *= 2;
          }
        }
      }
      break;
    case 'Down':
      for(let col = 0; col < WIDTH; col++) {
        for(let row = WIDTH - 2; row >= 0; row--) {
          if(board[row][col] != 0 && board[row][col] == board[row + 1][col]) {
            board[row][col] = 0;
            board[row + 1][col] *= 2;
          }
        }
      }
      break;
  }
}

function move(direction) {
  switch(direction) {
    case 'Right':
      for(let row = 0; row < WIDTH; row++) {
        for(let col = WIDTH - 2; col >= 0; col--) {
          if(board[row][col] !== 0) {
            let tempCol = col;
            // move right until a non-zero number or right edge is encountered
            while(tempCol < WIDTH - 1 && board[row][tempCol + 1] === 0) {
              board[row][tempCol + 1] = board[row][tempCol];
              board[row][tempCol] = 0;
              tempCol++;
            }
          }
        }
      }
      break;
      case 'Left':
        for(let row = 0; row < WIDTH; row++) {
          for(let col = 1; col < WIDTH; col++) {
            if(board[row][col] !== 0) {
              let tempCol = col;
              // move right until a non-zero number or left edge is encountered
              while(tempCol >= 0 && board[row][tempCol - 1] === 0) {
                board[row][tempCol - 1] = board[row][tempCol];
                board[row][tempCol] = 0;
                tempCol--;
              }
            }
          }
        }
      break;
    case 'Up':
      for(let col = 0; col < WIDTH; col++) {
        for(let row = 1; row < WIDTH; row++) {
          if(board[row][col] !== 0) {
            let tempRow = row;
            // move up until a non-zero number or top is encountered
            while(tempRow > 0 && board[tempRow - 1][col] === 0) {
              board[tempRow - 1][col] = board[tempRow][col];
              board[tempRow][col] = 0;
              tempRow--;
            }
          }
        }
      }
      break;
    case 'Down':
      for(let col = 0; col < WIDTH; col++) {
        for(let row = WIDTH - 2; row >= 0; row--) {
          if(board[row][col] !== 0) {
            let tempRow = row;
            // move down until a non-zero number or bottom is encountered
            while(tempRow < WIDTH - 1 && board[tempRow + 1][col] === 0) {
              board[tempRow + 1][col] = board[tempRow][col];
              board[tempRow][col] = 0;
              tempRow++;
            }
          }
        }
      }
      break;
  }

}

function getScore() {
  let score = 0;
  for (let row = 0; row < WIDTH; row++) {
    for (let col = 0; col < WIDTH; col++) {
      score += parseInt(board[row][col]);
    }
  }
  return score;
}

createGame();
setupEventListeners();

