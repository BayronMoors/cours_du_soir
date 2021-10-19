import { Player } from "./Player.js";

const player = {
  player1: new Player({ name: "Human", point: 0 }),
  ia: new Player({ name: "IA", point: 0 })
};
const showGame = document.getElementById("show");
let stockPoint: number;
let countRound: number;
let dice: number;
let curentPlayer: Player;
let otherPlayer: Player;

const reset = (): void => {
  stockPoint = 0;
  countRound = 0;
  dice = 0;
  player.player1.reset();
  player.ia.reset();
};

const getOtherPlayer = (): void => {
  if (curentPlayer.getName() === player.player1.getName()) {
    otherPlayer = player.ia;
  } else if (curentPlayer.getName() === player.ia.getName()) {
    otherPlayer = player.player1;
  }
};

const changePlayer = (): void => {
  if (curentPlayer.getName() === player.player1.getName()) {
    curentPlayer = player.ia;
  } else if (curentPlayer.getName() === player.ia.getName()) {
    curentPlayer = player.player1;
  }
};
const score = (): void => {
  document.getElementById(
    "player1"
  )!.innerText = `${curentPlayer.getName()} : à ${String(
    curentPlayer.getPoint()
  )} point${curentPlayer.getPoint() > 0 ? "s" : ""}`;
  document.getElementById(
    "player2"
  )!.innerText = `${otherPlayer.getName()} : à ${String(
    otherPlayer.getPoint()
  )} point${otherPlayer.getPoint() > 0 ? "s" : ""}`;
};

const showThrowPoint = (data: number): void => {
  document.getElementById(
    "point"
  )!.innerText = `Jet de dé: ${data}\n Score total du round: ${stockPoint}`;
};

const checkThrow = (data: number) => {
  for (let i = 0; i <= 6; i++) {
    if (data === 1) {
      countRound = 0;
      stockPoint = 0;
      showThrowPoint(data);
      changePlayer();
      getOtherPlayer();
      curentPlayer.getContent();
      score();
    } else if (data === i) {
      stockPoint += i;
      showThrowPoint(data);
    }
  }
};

const disabled = (): void => {
  document.getElementById("validate")!.setAttribute("disabled", "true");
  document.getElementById("throw")!.setAttribute("disabled", "true");
  document.getElementById("pass")!.setAttribute("disabled", "true");
};

const enabled = (): void => {
  document.getElementById("validate")!.removeAttribute("disabled");
  document.getElementById("throw")!.removeAttribute("disabled");
  document.getElementById("pass")!.removeAttribute("disabled");
};

const iaCheck = (): void => {
  if (curentPlayer.getName() === player.ia.getName()) {
    const timeResponse = Math.floor(Math.random() * 1800) + 201;
    const chanceToThrow = Math.random();
    disabled();
    if (countRound === 0) {
      setTimeout(() => {
        dice = curentPlayer.throw();
        checkThrow(dice);
        iaCheck();
        countRound += 1;
      }, timeResponse);
    } else if (countRound === 1) {
      if (chanceToThrow <= 0.75) {
        setTimeout(() => {
          dice = curentPlayer.throw();
          checkThrow(dice);
          iaCheck();
          countRound += 1;
        }, timeResponse);
      } else {
        curentPlayer.changePoint(stockPoint);
        if(curentPlayer.getPoint() >= 50){
          document.getElementById("show")!.style.display = "none";
          curentPlayer.win();
        }else{
        stockPoint = 0;
        countRound = 0;
        dice = 0;
        changePlayer();
        getOtherPlayer();
        curentPlayer.getContent();
        score();
        showThrowPoint(dice);
        iaCheck();
        }
      }
    } else if (countRound === 2) {
      if (chanceToThrow <= 0.45) {
        setTimeout(() => {
          dice = curentPlayer.throw();
          checkThrow(dice);
          iaCheck();
          countRound += 1;
        }, timeResponse);
      } else {
        curentPlayer.changePoint(stockPoint);
        if(curentPlayer.getPoint() >= 50){
          document.getElementById("show")!.style.display = "none";
          curentPlayer.win();
        }
        else{
        stockPoint = 0;
        countRound = 0;
        dice = 0;
        changePlayer();
        getOtherPlayer();
        curentPlayer.getContent();
        score();
        showThrowPoint(dice);
        iaCheck();
        }
      }
    } else if (countRound >= 3) {
      if (chanceToThrow <= 0.1) {
        setTimeout(() => {
          dice = curentPlayer.throw();
          checkThrow(dice);
          iaCheck();
          countRound += 1;
        }, timeResponse);
      } else {
        curentPlayer.changePoint(stockPoint);
        if(curentPlayer.getPoint() >= 50){
          document.getElementById("show")!.style.display = "none";
          curentPlayer.win();
        }
        else{
        stockPoint = 0;
        countRound = 0;
        dice = 0;
        changePlayer();
        getOtherPlayer();
        curentPlayer.getContent();
        score();
        showThrowPoint(dice);
        iaCheck();
        }
      }
    }
  } else if (curentPlayer.getName() === player.player1.getName()) {
    enabled();
  }
};

// START || RESTART
document.getElementById("start")?.addEventListener("click", function (): void {
  showGame!.style.display = "block";
  this.innerText = `Redémarer une partie`;
  const random = Math.random();
  random <= 0.5 ? (curentPlayer = player.player1) : (curentPlayer = player.ia);
  curentPlayer.getContent();
  getOtherPlayer();
  reset();
  score();
  showThrowPoint(0);
  iaCheck();
});

// THROW
document.getElementById("throw")!.addEventListener("click", () => {
  dice = curentPlayer.throw();
  checkThrow(dice);
  iaCheck();
});

// Validate
document.getElementById("validate")!.addEventListener("click", () => {
  curentPlayer.changePoint(stockPoint);
  if(curentPlayer.getPoint() >= 50){
    document.getElementById("show")!.style.display = "none";
    curentPlayer.win();
  }
  else{
    stockPoint = 0;
    countRound = 0;
    dice = 0;
    changePlayer();
    getOtherPlayer();
    curentPlayer.getContent();
    score();
    showThrowPoint(dice);
    iaCheck();
  }
});

// PASS
document.getElementById("pass")!.addEventListener("click", () => {
  stockPoint = 0;
  countRound = 0;
  dice = 0;
  changePlayer();
  getOtherPlayer();
  curentPlayer.getContent();
  score();
  showThrowPoint(dice);
  iaCheck();
});
