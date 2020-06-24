const WIDTH = 4;

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
}

function makeNewTile() {
  const newTileIndex = Math.floor(Math.random() * WIDTH * WIDTH);

  newTile = document.getElementById(`tile${newTileIndex}`);
  console.log(newTile.innerHTML);
  if (!parseInt(newTile.innerHTML)) {
    newTile.innerHTML = getNewTileValue();
  } else {
    makeNewTile();
  }
}

function getNewTileValue() {
  return Math.random() >= 0.9 ? "4" : "2";
}

createGame();