const WIDTH = 4;
const COLORS = {
  0: "white",
  2: "red",
  4: "blue",
  8: "yellow",
  16: "green",
  32: "orange",
  64: "violet",
  128: "pink",
  256: "skyblue"
}

let gameOver = false;

// initialize board to two-dimensional array of zeros
const board = new Array(WIDTH);
for (let i = 0; i < WIDTH; i++) {
  board[i] = new Array(WIDTH).fill(0);
}

const boardElement = document.getElementById("board");

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
  for(let i = 0; i < WIDTH * WIDTH; i++) {
    const row = parseInt(i / WIDTH);
    const col = i % WIDTH;
    const newTile = document.createElement("div");
    newTile.className = "tile";
    newTile.id = `tile${row},${col}`;
    boardElement.appendChild(newTile);
  }

  makeNewTile();
  makeNewTile();
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
    alert("Game Over!");
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
      move(moveDirection);
    }
  });
}

function move(direction) {
  // to do: check for additive collapse
  // move all tiles in the specified direction
  switch(direction) {
    case 'Right':
      for(let row = 0; row < WIDTH; row++) {
        for(let col = WIDTH - 2; col >= 0; col--) {
          // check for additive collapse 
          if(board[row][col] != 0 && board[row][col] == board[row][col + 1]) {
            board[row][col] = 0;
            board[row][col + 1] *= 2;
          }
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
          // check for additive collapse 
          if(board[row][col] != 0 && board[row][col] == board[row][col - 1]) {
            board[row][col] = 0;
            board[row][col - 1] *= 2;
          }
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
        // move up 
        for(let col = 0; col < WIDTH; col++) {
          for(let row = 1; row < WIDTH; row++) {
            // check for additive collapse 
            if(board[row][col] != 0 && board[row][col] == board[row - 1][col]) {
              board[row][col] = 0;
              board[row - 1][col] *= 2;
            }
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
      // move down 
      for(let col = 0; col < WIDTH; col++) {
        for(let row = WIDTH - 2; row >= 0; row--) {
          // check for additive collapse 
          if(board[row][col] != 0 && board[row][col] == board[row + 1][col]) {
            board[row][col] = 0;
            board[row + 1][col] *= 2;
          }
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
  makeNewTile();
  redrawBoard();
}

createGame();
setupEventListeners();

