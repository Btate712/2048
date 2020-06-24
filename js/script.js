const WIDTH = 4;
const COLORS = {
  2: "red",
  4: "blue"
}

const newRow = new Array(WIDTH);
newRow.fill(0);
const board = new Array(WIDTH);
board.fill(newRow);

const boardElement = document.getElementById("board");

function createGame() {
  for(let i = 0; i < WIDTH * WIDTH; i++) {
    const row = parseInt(i / WIDTH);
    const col = i % WIDTH;
    newTile = document.createElement("div");
    newTile.innerHTML = board[row][col];
    newTile.className = "tile";
    newTile.id = `tile${i}`;
    boardElement.appendChild(newTile);
  }

  makeNewTile();
  makeNewTile();
  setColors();
}

function makeNewTile() {
  const newTileIndex = Math.floor(Math.random() * WIDTH * WIDTH);

  const newTileRow = parseInt(newTileIndex / WIDTH);
  const newTileCol = parseInt(newTileIndex % WIDTH);

  if (!board[newTileRow][newTileCol]) {
    board[newTileRow][newTileCol] = getNewTileValue();
    newTile = document.getElementById(`tile${newTileIndex}`);
    newTile.innerHTML = board[newTileRow][newTileCol];
  } else {
    makeNewTile();
  }
}

function getNewTileValue() {
  return Math.random() >= 0.9 ? "4" : "2";
}

function setColors() {

  for (let i = 0; i < WIDTH * WIDTH; i++) {
    tile = document.getElementById(`tile${i}`);
    tile.style.background = COLORS[parseInt(tile.innerHTML)];
  }
}

function setupEventListeners() {
  document.addEventListener("keydown", event => {
    if(/^Arrow/.test(event.key)) {
      const moveDirection = event.key.slice(5);
      move(moveDirection);
    }
  });
}

function move(direction) {
  console.log(direction);
}

createGame();
setupEventListeners();

