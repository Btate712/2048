const WIDTH = 4;
const COLORS = {
  2: "red",
  4: "blue"
}

const board = document.getElementById("board");

function createGame() {
  for(let i = 0; i < WIDTH * WIDTH; i++) {
    newTile = document.createElement("div");
    newTile.innerHTML = "0";
    newTile.className = "tile";
    newTile.id = `tile${i}`;
    board.appendChild(newTile);
  }

  makeNewTile();
  makeNewTile();
  setColors();
}

function makeNewTile() {
  const newTileIndex = Math.floor(Math.random() * WIDTH * WIDTH);

  newTile = document.getElementById(`tile${newTileIndex}`);
  if (!parseInt(newTile.innerHTML)) {
    newTile.innerHTML = getNewTileValue();
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
    console.log(COLORS[parseInt(tile.innerHTML)])
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

