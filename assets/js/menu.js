/* globals game */

let menuState = {
  create () {
    game.add.image(0, 0, 'background')

    // display game name
    let gameName = game.add.text(
      game.world.centerX, 200, 'Tic Tac Toe',
      { font: '50px Arial', fill: '#ffffff' }
    )
    gameName.anchor.setTo(0.5, 0.5)

    // explain how to start the game
    let startGame = game.add.text(
      game.world.centerX, 250, 'click to start',
      { font: '20px Arial', fill: '#ffffff' }
    )
    startGame.anchor.setTo(0.5, 0.5)

    // start game on click
    game.input.onDown.add(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
