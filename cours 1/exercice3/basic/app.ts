interface player {
  name: string;
  point: number;
}

// init

const content = document.getElementById("player");
let selectPlayer: player;
let curentPlayer: player;
let otherPlayer: player;
let countRound: number;
let stockPoint = 0;
let dice = 0;

// player list
const player: Array<player> = [
  { name: "human", point: 0 },
  { name: "ia", point: 0 }
];

// Reset point
const resetPoint = (): void => {
  player[0].point = 0;
  player[1].point = 0;
};

// Starting
const start = (): void => {
  resetPoint();
  countRound = 0;
  selectPlayer = player[Math.floor(Math.random() * 2)];
  curentPlayer = selectPlayer;
};

// Get other player
const getOtherPlayer = (): void => {
  let other = player.filter((other) => other.name !== curentPlayer.name);
  otherPlayer = other[0];
};

// Change the name of title content
const changeContentName = (): void => {
  content!.innerText = `C'est le tour du joueur : ${curentPlayer.name}`;
};

// show point of throw dice
const getPointRound = (): void => {
  document.getElementById(
    "point"
  )!.innerText = `Dé: ${dice}\n total des points du round: ${String(
    stockPoint
  )}`;
};

// Change player
const changePlayer = (): player => {
  let change = player.filter((curent) => curent !== curentPlayer);
  curentPlayer = change[0];
  getOtherPlayer();
  changeContentName();
  return curentPlayer;
};

// Showing score
const score = (): void => {
  document.getElementById("player1")!.innerText = `${curentPlayer.name} à ${
    curentPlayer.point
  } point${curentPlayer.point > 1 ? "s" : ""}`;
  document.getElementById("player2")!.innerText = `${otherPlayer.name} à ${
    otherPlayer.point
  } point${otherPlayer.point > 1 ? "s" : ""}`;
};

// Throw the dice
const throwDice = (): void => {
  dice = Math.floor(Math.random() * 6 + 1);
};

// Validate the point of the round
const validateRound = (): void => {
  curentPlayer.point += stockPoint;
  countRound = 0;
  score();
  getPointRound();
  changePlayer();
  stockPoint = 0;
  round();
};

// skip round wihout geting point
const skipRound = (): void => {
  stockPoint = 0;
  countRound = 0;
  changePlayer();
  score();
  getPointRound();
  round();
};

// winning and stop the game
const win = (player: player): void => {
  document.getElementById("show")!.style.display = "none";
  content!.innerText = `${player.name} a gagner!`;
};

const disabled = (): void => {
  document.getElementById("pass")!.setAttribute("disabled", "true");
  document.getElementById("validate")!.setAttribute("disabled", "true");
  document.getElementById("throw")!.setAttribute("disabled", "true");
};

const enable = (): void => {
  document.getElementById("pass")!.removeAttribute("disabled");
  document.getElementById("validate")!.removeAttribute("disabled");
  document.getElementById("throw")!.removeAttribute("disabled");
};

const checkWin = (): void => {
  if (player[0].point >= 50) {
    win(player[0]);
  } else if (player[1].point >= 50) {
    win(player[1]);
  }
};

const iaThrow = (): void => {
  throwDice();
  switch (dice) {
    case 1:
      countRound = 0;
      score();
      skipRound();
      break;
    case 2:
      stockPoint += 2;
      break;
    case 3:
      stockPoint += 3;
      break;
    case 4:
      stockPoint += 4;
      break;
    case 5:
      stockPoint += 5;
      break;
    case 6:
      stockPoint += 6;
      break;
  }
  getPointRound();
};

// choice on the round
function round(): void {
  switch (curentPlayer.name) {
    case "human":
      enable();
      checkWin();
      break;
    case "ia":
      disabled();
      checkWin();
      if (countRound === 0) {
        countRound += 1;
        setTimeout(() => {
          iaThrow();
          round();
        }, 200 + Math.random() * 1800);
      } else if (countRound === 1) {
        countRound += 1;
        setTimeout(() => {
          const chance = Math.random();
          if (chance < 0.75) {
            iaThrow();
            round();
          } else {
            validateRound();
          }
        }, 200 + Math.random() * 1800);
      } else if (countRound === 2) {
        countRound += 1;
        setTimeout(() => {
          const chance = Math.random();
          if (chance < 0.45) {
            iaThrow();
            round();
          } else {
            validateRound();
          }
        }, 200 + Math.random() * 1800);
      } else if (countRound >= 3) {
        countRound += 1;
        setTimeout(() => {
          const chance = Math.random();
          if (chance < 0.1) {
            iaThrow();
            round();
          } else {
            validateRound();
          }
        }, 200 + Math.random() * 1800);
      }
      break;
  }
}

// Start game / restart game
document.getElementById("start")!.addEventListener("click", () => {
  start();
  document.getElementById("start")!.innerText = "Redémarrer une partie";
  changeContentName();
  getOtherPlayer();
  resetPoint();
  score();
  stockPoint = 0;
  dice = 0;
  getPointRound();
  document.getElementById("show")!.style.display = "block";
  round();
});

document.getElementById("throw")!.addEventListener("click", () => {
  throwDice();
  switch (dice) {
    case 1:
      countRound = 0;
      score();
      skipRound();
      break;
    case 2:
      stockPoint += 2;
      break;
    case 3:
      stockPoint += 3;
      break;
    case 4:
      stockPoint += 4;
      break;
    case 5:
      stockPoint += 5;
      break;
    case 6:
      stockPoint += 6;
      break;
  }
  getPointRound();
});

document.getElementById("validate")!.addEventListener("click", () => {
  validateRound();
});

document.getElementById("pass")!.addEventListener("click", () => {
  skipRound();
});
