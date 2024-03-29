let ticTacToe = new TicTacToe((players = ["X", "Comp"]));
ticTacToe.createListeners();

function runFunction() {
  if (ticTacToe.currentPlayer === 1) {
    let possibleIndexes = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (ticTacToe.board[i][j] === "") {
          possibleIndexes.push(i * 3 + j);
        }
      }
    }

    computerSelection =
      possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
      ticTacToe.manualClickTriggerRaw(computerSelection);
  }
}

var t = setInterval(runFunction, 500);
