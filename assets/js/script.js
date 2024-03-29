const allConstants = {
  noWin: "No Win",
  draw: "Draw",
};

class TicTacToe {
  constructor(players = ["X", "O"]) {
    this.gameStatus = "started";
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.players = players;
    this.currentPlayer = 0;
    this.playerScores = [0, 0];
    this.cells = document.getElementsByClassName("cell");
  }

  whoseTurn() {
    document.getElementById("current-player").textContent = `
  ${this.players[this.currentPlayer]}'s Turn`;
  }

  checkWinner() {
    for (let i = 0; i < 3; i++) {
      // Horizontally check
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ""
      ) {
        return this.board[i][0];
      }
      // Vertically check
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ""
      ) {
        return this.board[0][i];
      }
    }
    // Check for diagonal
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ""
    ) {
      return this.board[0][0];
    }
    // Check for diagonal
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ""
    ) {
      return this.board[0][2];
    }
    // Check for draw
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        // If "" exist that no body wins
        if (this.board[i][j] === "") return allConstants["noWin"];
    return allConstants["draw"];
  }

  resetBoard() {
    // Board state reset
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = "";
      }
    }

    // Board UI reset
    function cellTextReset(element) {
      element.textContent = "";
    }

    this.gameStatus = "started";
    Array.from(this.cells).forEach(cellTextReset);
  }

  closePopUp() {
    const resultPopUp = document.getElementById("resultPopUp");
    resultPopUp.style.display = "None";
    this.resetBoard();
  }

  showResults(result) {
    const resultPopUp = document.getElementById("resultPopUp");
    const popUpText = document.getElementById("popUpText");

    this.gameStatus = "ended";

    if (result === "Draw") {
      popUpText.textContent = "This game is a draw";
      playAudio('lose');
    } else {
        if (this.players[result] === 'Comp') {
          popUpText.textContent = ` Too bad! ${this.players[result]} is the winner! :(`;
          playAudio('lose');
        }
        else {
          popUpText.textContent = ` Hurray! ${this.players[result]} is the winner! :)`;
          playAudio('win');
        }
    }
    resultPopUp.style.display = "flex";
  }

  scoresUpdate() {
    document.getElementById("score0").textContent = this.playerScores[0];
    document.getElementById("score1").textContent = this.playerScores[1];
  }

  createListeners() {
    function onCellClick(element, i) {
      // Inside Click Event
      const row = Math.floor(i / 3);
      const col = i % 3;

      // Check if clicked cell should be triggered
      if (
        ticTacToe.board[row][col] === "" &&
        ticTacToe.gameStatus === "started"
      ) {
        playAudio('click');
        // Getting player character
        let player = ticTacToe.players[ticTacToe.currentPlayer];
        // Updating UI
        element.textContent = player;
        // Saving state
        ticTacToe.board[row][col] = ticTacToe.currentPlayer;

        // Updating for next move
        if (ticTacToe.currentPlayer === 0) ticTacToe.currentPlayer = 1;
        else ticTacToe.currentPlayer = 0;

        // Whose turn gets called
        ticTacToe.whoseTurn();

        // Check winner logic
        let result = ticTacToe.checkWinner();

        if (result !== allConstants["noWin"]) {
          ticTacToe.showResults(result);

          if (result !== allConstants["draw"]) {
            ticTacToe.playerScores[result]++;

            // Players scores updated
            ticTacToe.scoresUpdate();
          }
        }
      }
    }

    function forEachCall(cell, index) {
      cell.addEventListener("click", function () {
        onCellClick(cell, index);
      });
    }

    Array.from(this.cells).forEach(forEachCall);
  }

  manualClickTriggerRaw(index) {
    this.cells[index].click();
  }

  manualClickTriggerWithAxis(row_index, col_index) {
    let index = row_index * 3 + col_index;
    this.cells[index].click();
  }
}

function playAudio(audioToPlay) {
  const audioLibrary = {
    click: "assets/sounds/click.wav",
    win: "assets/sounds/win.wav",
    lose: "assets/sounds/lose.wav"
  };

  var audio = new Audio(audioLibrary[audioToPlay]);
  audio.play();
}
