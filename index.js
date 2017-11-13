const prompt = require('prompt');

const board = [];
for (let i = 0; i < 3; i++) {
  board.push(Array(3).fill(0));
}

let isGame = true;
let curPlayer = 1;

const makeBoardString = (board) => {
  let str = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      str += board[i][j] + ' ';
    }
    str += '\n';
  }
  return str;
};

const makeTotalString = (board, player) => {
  str = '';
  str += `It's Player ${player}'s turn \n`;
  str += makeBoardString(board);
  return str;
}

const checkForWinner = (board) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    const arr = board[i];
    const tot = arr.reduce((accu, cur) => {
      return accu + cur;
    }, 0);
    if (tot === 3) { return true; }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    let tot = 0;
    for (let j = 0; j < 3; j++) {
      tot += board[j][i];
    }
    if (tot === 3) { return true; }
  }
  // Check diagonals
  const major = board[0][0] + board [1][1] + board[2][2];
  if (major === 3) { return true; }
  const minor = board[0][2] + board[1][1] + board[2][0];
  if (minor === 3) { return true; }
  return false;
};

let count = 0;

prompt.start();
console.log(makeTotalString(board, curPlayer));
console.log('enter your move as [row, col], where each is a number between 1 and 3');
const nextMove = () => {
  prompt.get(['move'], function (err, result) {
    const arr = JSON.parse(result.move);
    board[arr[0]][arr[1]] = 1;
    isGame = checkForWinner(board);
    count++;
    if (count === 9) { return; }
    if (isGame) {
      console.log(`Player ${curPlayer} Wins!`);
      console.log(makeBoardString(board));
    } else {
      const nextPlayer = curPlayer === 1 ? 2 : 1;
      console.log(makeTotalString(board, nextPlayer));
      nextMove();
    }
  });
}

nextMove();
// prompt.get(['move'], function (err, result) {
//   console.log('  Move: ' + result.move);
//   const arr = JSON.parse(result.move);
//   board[i][j] = 1;
//   isGame = checkForWinner(board);
//   if (isGame) {
//     console.log(`${curPlayer} Wins!`);
//     console.log(makeBoardString(board));
//   } else {
//     const nextPlayer = curPlayer === 1 ? 2 : 1;
//     console.log(makeTotalString(board, nextPlayer));
//     nextMove();
//   }
// });
