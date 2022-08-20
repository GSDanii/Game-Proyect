
 window.onload = () => {
  document.getElementById('start').onclick = () => {
    startGame();
  };
  function startGame() {
     game.init('#Canvas')
 };
}