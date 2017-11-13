const prompt = require('prompt');

const board = [];
for (let i = 0; i < 3; i++) {
  board.push(Array(3).fill(0));
}

let isGame = true;
let curPlayer = 1;

const makeBoardString = (board) => {
  let str = '';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
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

const checkForWinner = (board, mark) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    const arr = board[i];
    const tot = arr.reduce((accu, cur) => {
      if (cur === mark) { return accu + 1; }
      return accu;
    }, 0);
    if (tot === 3) { return true; }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    let tot = 0;
    for (let j = 0; j < 3; j++) {
      if (board[j][i] === mark) {
        tot++;
      }
    }
    if (tot === 3) { return true; }
  }
  // Check diagonals
  const major = [board[0][0], board [1][1], board[2][2]].reduce((accu, cur) => {
    if (cur === mark) { return accu + 1; }
    return accu;
  }, 0);
  if (major === 3) { return true; }

  const minor = [board[0][2], board[1][1], board[2][0]].reduce((accu, cur) => {
    if (cur === mark) { return accu + 1; }
    return accu;
  }, 0);
  if (minor === 3) { return true; }
  return false;
};

let count = 0;

prompt.start();
console.log(makeTotalString(board, curPlayer));
console.log('enter your move as [row, col], where each is a number between 1 and 3');
const nextMove = () => {
  prompt.get(['move'], function (err, result) {
    let arr;
    try {
      arr = JSON.parse(result.move);
    } catch(err) {
      if (!result) { return; }
      console.log('Invalid entry! Please enter your move as [row, col], where each is a number between 1 and 3')
      nextMove();
      return;
    }
    if (arr.length !== 2 || arr[0] > 2 || arr[0] < 0 || arr[1] > 2 || arr[1] < 0) {
      console.log('Invalid entry! Please enter your move as [row, col], where each is a number between 1 and 3')
      nextMove();
      return;
    }
    const mark = curPlayer === 1 ? 'X' : 'O';
    board[arr[0]][arr[1]] = mark;
    isGame = checkForWinner(board, mark);
    if (isGame) {
      console.log(`Player ${curPlayer} Wins!`);
      console.log(makeBoardString(board));
    } else {
      curPlayer = curPlayer === 1 ? 2 : 1;
      console.log(makeTotalString(board, curPlayer));
      nextMove();
    }
  });
};

nextMove();

const testing = () => {
  const makeBoardStringTest = () => {
    const testBoard = [[0], [0], [0]];
    const str = makeBoardString(testBoard);
    return str.length > 3 && str.length < 10;
  };

  const makeTotalStringTest = () => {
    const testBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const str = makeTotalString(testBoard, 1);
    const isPlayer = str.includes('Player 1\'s');
    const isBoard = str.includes('0 0 0');
    return isPlayer && isBoard;
  };

  console.log(makeBoardStringTest());
  console.log(makeTotalStringTest());
}
