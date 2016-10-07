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

    // where i if for column
    // and j is for row
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        let cell = this.cells.create(i * this.cellWidth, j * this.cellHeight, 'cell')
        cell.inputEnabled = true
        cell.events.onInputDown.add(this.revealCell, this)
      }
    }

    // call setMines function 10 times, to set all 10 mines
    for (let i = 0; i < 10; i++) {
      this.setMines()
    }

    this.showMines()

    this.drawNumbers()
  },
  setMines () {
    // I will use 'board' instead of 'this.template' because is shorter
    let board = this.template

    let column
    let row

    function randNum () {
      column = Math.floor(Math.random() * 9)
      row = Math.floor(Math.random() * 9)
    }

    randNum()

    while (board[column][row]) {
      randNum()
    }

    board[column][row] = 'x'

    this.setNumbers(column, row)
  },
  // set numbers tips
  setNumbers (column, row) {
    let board = this.template

    // calculate hints for upper row
    // y is for column
    // x is for row
    ;(function (y, x) {
      for (let i = -1; i < 2; i++) {
        // if x === 0 game can't draw number for left upper side
        if (x === 0 && i === -1) {
          ++i
        }
        // if x === 9 game can't draw number for right upper side
        if (x === 9 && i === 1) {
          break
        }
        // if x or y === 0, game will return an error,
        // because array not have a negative index
        if (y !== 0 && board[y - 1][x + i] !== 'x') {
          board[y - 1][x + i]++
        }
      }
    })(column, row)
    // upperRow(column, row)

    // calculate hints for lower row
    ;(function (y, x) {
      for (let i = -1; i < 2; i++) {
        // if x === 0 game can't draw number for left down side
        if (x === 0 && i === -1) {
          ++i
        }
        // if x === 9 game can't draw number for right down side
        if (x === 9 && i === 1) {
          break
        }
        // if x === 0 or y === 9 game will return an error,
        // because array not have a negative index
        if (y < 9 && board[y + 1][x + i] !== 'x') {
          board[y + 1][x + i]++
        }
      }
    })(column, row)
    // lowerRow(column, row)

    // calculate left side hints
    ;(function (y, x) {
      if (board[y][x - 1] !== 'x') {
        board[y][x - 1]++
      }
    })(column, row)

    // calculate left side hints
    ;(function (y, x) {
      if (board[y][x + 1] !== 'x') {
        board[y][x + 1]++
      }
    })(column, row)
  },
  drawNumbers () {
    let board = this.template

    let cellHeight = this.cellHeight
    let cellWidth = this.cellWidth

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] && board[i][j] !== 'x') {
          game.add.text(
            j * cellHeight, i * cellWidth,
            board[i][j], { font: '22px Arial', fill: '#ff0000' }
          )
        }
      }
    }
  },
  revealCell () {
    let board = this.template

    let cellIndexY = Math.floor(game.input.y / this.cellHeight)
    let cellIndexX = Math.floor(game.input.x / this.cellWidth)

    console.log(board[cellIndexY][cellIndexX])

    console.log(board)
  },
  showMines () {
    let board = this.template

    let cellHeight = this.cellHeight
    let cellWidth = this.cellWidth

    // i is for column (Y-axis)
    // j is for row (X-axis)
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === 'x') {
          // http://phaser.io/docs/2.6.2/Phaser.GameObjectFactory.html#image
          // add.image(X-axis, Y-axis, key, frame, group)
          game.add.image(j * cellWidth, i * cellHeight, 'mine')
        }
      }
    }
  }
}
