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
}

createGame();
console.log(board);