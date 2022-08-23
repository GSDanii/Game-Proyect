
 window.onload = () => {
  document.getElementById('start').onclick = () => {
    if(game.canStart) startGame();
  };
  function startGame() {
     game.init('#Canvas')
    game.canStart = false
 };
}

