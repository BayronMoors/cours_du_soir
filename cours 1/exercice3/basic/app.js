// init
var content = document.getElementById("player");
var selectPlayer;
var curentPlayer;
var otherPlayer;
var countRound;
var stockPoint = 0;
var dice = 0;
// player list
var player = [
    { name: "human", point: 0 },
    { name: "ia", point: 0 }
];
// Reset point
var resetPoint = function () {
    player[0].point = 0;
    player[1].point = 0;
};
// Starting
var start = function () {
    resetPoint();
    countRound = 0;
    selectPlayer = player[Math.floor(Math.random() * 2)];
    curentPlayer = selectPlayer;
};
// Get other player
var getOtherPlayer = function () {
    var other = player.filter(function (other) { return other.name !== curentPlayer.name; });
    otherPlayer = other[0];
};
// Change the name of title content
var changeContentName = function () {
    content.innerText = "C'est le tour du joueur : " + curentPlayer.name;
};
// show point of throw dice
var getPointRound = function () {
    document.getElementById("point").innerText = "D\u00E9: " + dice + "\n total des points du round: " + String(stockPoint);
};
// Change player
var changePlayer = function () {
    var change = player.filter(function (curent) { return curent !== curentPlayer; });
    curentPlayer = change[0];
    getOtherPlayer();
    changeContentName();
    return curentPlayer;
};
// Showing score
var score = function () {
    document.getElementById("player1").innerText = curentPlayer.name + " \u00E0 " + curentPlayer.point + " point" + (curentPlayer.point > 1 ? "s" : "");
    document.getElementById("player2").innerText = otherPlayer.name + " \u00E0 " + otherPlayer.point + " point" + (otherPlayer.point > 1 ? "s" : "");
};
// Throw the dice
var throwDice = function () {
    dice = Math.floor(Math.random() * 6 + 1);
};
// Validate the point of the round
var validateRound = function () {
    curentPlayer.point += stockPoint;
    countRound = 0;
    score();
    getPointRound();
    changePlayer();
    stockPoint = 0;
    round();
};
// skip round wihout geting point
var skipRound = function () {
    stockPoint = 0;
    countRound = 0;
    changePlayer();
    score();
    getPointRound();
    round();
};
// winning and stop the game
var win = function (player) {
    document.getElementById("show").style.display = "none";
    content.innerText = player.name + " a gagner!";
};
var disabled = function () {
    document.getElementById("pass").setAttribute("disabled", "true");
    document.getElementById("validate").setAttribute("disabled", "true");
    document.getElementById("throw").setAttribute("disabled", "true");
};
var enable = function () {
    document.getElementById("pass").removeAttribute("disabled");
    document.getElementById("validate").removeAttribute("disabled");
    document.getElementById("throw").removeAttribute("disabled");
};
var checkWin = function () {
    if (player[0].point >= 50) {
        win(player[0]);
    }
    else if (player[1].point >= 50) {
        win(player[1]);
    }
};
var iaThrow = function () {
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
function round() {
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
                setTimeout(function () {
                    iaThrow();
                    round();
                }, 200 + Math.random() * 1800);
            }
            else if (countRound === 1) {
                countRound += 1;
                setTimeout(function () {
                    var chance = Math.random();
                    if (chance < 0.75) {
                        iaThrow();
                        round();
                    }
                    else {
                        validateRound();
                    }
                }, 200 + Math.random() * 1800);
            }
            else if (countRound === 2) {
                countRound += 1;
                setTimeout(function () {
                    var chance = Math.random();
                    if (chance < 0.45) {
                        iaThrow();
                        round();
                    }
                    else {
                        validateRound();
                    }
                }, 200 + Math.random() * 1800);
            }
            else if (countRound >= 3) {
                countRound += 1;
                setTimeout(function () {
                    var chance = Math.random();
                    if (chance < 0.1) {
                        iaThrow();
                        round();
                    }
                    else {
                        validateRound();
                    }
                }, 200 + Math.random() * 1800);
            }
            break;
    }
}
// Start game / restart game
document.getElementById("start").addEventListener("click", function () {
    start();
    document.getElementById("start").innerText = "Redémarrer une partie";
    changeContentName();
    getOtherPlayer();
    resetPoint();
    score();
    stockPoint = 0;
    dice = 0;
    getPointRound();
    document.getElementById("show").style.display = "block";
    round();
});
document.getElementById("throw").addEventListener("click", function () {
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
document.getElementById("validate").addEventListener("click", function () {
    validateRound();
});
document.getElementById("pass").addEventListener("click", function () {
    skipRound();
});
