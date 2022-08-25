document.getElementById("inferno").onclick = () => {
  if (game.canStart) startGame(5, 1);
};
document.getElementById("hard").onclick = () => {
  if (game.canStart) startGame(20, 10);
};
document.getElementById("medium").onclick = () => {
  if (game.canStart) startGame(30, 16);
};
document.getElementById("easy").onclick = () => {
  if (game.canStart) startGame(50, 18);
};

function startGame(num1, num2) {
  game.init(num1, num2);
  game.canStart = false;
}
