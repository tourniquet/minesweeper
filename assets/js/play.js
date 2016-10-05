/* globals game */

let playState = {
  create () {
    // set game background image
    this.levelBackground = game.add.sprite(0, 0, 'levelBackground')

    this.cellWidth = 25
    this.cellHeight = 25

    this.template = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    this.cells = game.add.group()

    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        let cell = this.cells.create(i * this.cellWidth, j * this.cellHeight, 'cell')
        cell.inputEnabled = true
        cell.events.onInputDown.add(this.revealCell, this)
      }
    }

    for (let i = 0; i < 10; i++) {
      this.setMines()
    }

    this.showMines()
  },
  setMines () {
    // I will use 'board' instead of 'this.template' because is shorter
    let board = this.template

    var column
    var row

    function randNum () {
      column = Math.floor(Math.random() * 9)
      row = Math.floor(Math.random() * 9)
    }

    randNum()

    while (board[row][column]) {
      randNum()
    }

    board[row][column] = 'x'

    // this.setNumbers(row, column)
  },
  setNumbers (row, column) {
    let board = this.template

    function upperRow (x, y) {
      for (let i = -1; i < 1; i++) {
        if (x !== 0 && board[x - 1][y + i] !== 'x') {
          board[x - 1][y + i]++
          game.add.text(
            (x - 1) * this.cellWidth, (y + i) * this.cellHeight,
            board[x - 1][y + i],
            { font: '22px Arial', fill: '#ffffff', boundsAlignH: 'center' }
          )
        }
      }
    }

    upperRow(row, column)

    // function lowerRow (x, y) {
    //   console.log('Hi!')
    // }

    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     if (i !== 0) {
    //       upperRow(i, j)
    //     }
    //
    //     // if (i !== 9) {
    //     //   lowerRow(i, j)
    //     // }
    //   }
    // }
  },
  revealCell () {
    console.log('Hello, world!')
  },
  showMines () {
    let board = this.template

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j]) {
          game.add.image(i * this.cellWidth, j * this.cellHeight, 'mine')
        }
      }
    }
  }
}
