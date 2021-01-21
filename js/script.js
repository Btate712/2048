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

// device detection
if(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    hideDirectionButtons();
}

function hideDirectionButtons() {
  document.getElementById("mobile-buttons").className = "hide-mobile";
}

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
  move(direction);
  collapse(direction);
  move(direction);
  makeNewTile();
  redrawBoard();
}

function gameWon() {
  alert("Congratulations, you won! Keep playing to see how high you can go!");
}

function collapse(direction) {
  switch(direction) {
    case 'Right':
      for (let row = 0; row < WIDTH; row++) {
        for (let col = WIDTH - 2; col >= 0; col--) {
          if(board[row][col] != 0 && board[row][col] == board[row][col + 1]) {
            board[row][col] = 0;
            board[row][col + 1] *= 2;
            // Check for game win
            if(board[row][col + 1] === 2048) {
              gameWon();
            }
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
            // Check for game win
            if(board[row][col - 1] === 2048) {
              gameWon();
            }
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
            // Check for game win
            if(board[row - 1][col] === 2048) {
              gameWon();
            }
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
            // Check for game win
            if(board[row + 1][col] === 2048) {
              gameWon();
            }
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

