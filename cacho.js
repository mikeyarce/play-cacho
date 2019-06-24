const roll = document.getElementById("roll");
const clear = document.getElementById("clear");
const restart = document.getElementById("restart");
const addScore = document.getElementById("addscore");
const table = document.getElementById("table");
const numbers = document.getElementById("numbers");
const blocks = document.getElementsByClassName('blocks');
const total = document.getElementById("total");

var totalScore = 0;
var selected = numbers.getElementsByClassName('selected');
var score;
var turn = 0;
var rollTurn = 0;


restart.onclick = function restart() {
    location.reload();
}

function clearDice() {
    rollTurn = 0;
    for (child of numbers.children) {
        child.innerText = 0;
        child.classList.remove('selected');
        child.classList.add('btn');
    }
}
clear.onclick = function () {
    clearDice();
    for (let block of blocks) {
        if (block.classList.contains('highlight')) {
            block.classList.toggle('highlight');
        }
    }
}

function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setScore() {
    addScore.onclick = function addScore() {
        table.classList.add('active');
        for (let block of blocks) {
            if (block.innerText == '') {
                block.classList.add('highlight');
            }
        }
    }
    for (let block of blocks) {
        block.onclick = function () {

            if (table.classList.contains('active')) {
                table.classList.remove('active');
                this.classList.add('set');
                block.classList.toggle('highlight');
            }
            if (block.classList.contains('highlight')) {
                block.classList.toggle('highlight');
            }
        }

        if (table.classList.contains('active') &&
            !block.classList.contains('set')) {
            block.classList.toggle('highlight');
            table.classList.remove('active');
        }
    }
}
setScore();

roll.onclick = function roll() {
    rollTurn++;
    if (rollTurn > 3) {
        return;
    }
    var btns = numbers.getElementsByClassName('btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].innerHTML = rollDice(1, 7);
    }
}

// select dice
var results = numbers.getElementsByClassName('btn');

for (var i = 0; i < results.length; i++) {

    results[i].onclick = function select() {

        this.classList.toggle('selected');
        this.classList.toggle('btn');
    }
}

// Add Scoring
function scoring(score, scoreName) {
    if (table.classList.contains('active') &&
        !scoreName.classList.contains('set')) {
        scoreName.innerText = score;
        scoreName.classList.add('set');
        table.classList.remove('active');
        clearDice();
        tabulateTotal(score);
    }

}

function tabulateScore(value, scoreName) {
    var score;
    var scoreCount = 0;

    for (let die of selected) {

        if (die.innerText == value) {
            scoreCount++;
        }
    }
    score = value * scoreCount;
    scoring(score, scoreName);
}


function arrayEqual(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (var i = array1.length; i--;) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function tabulateStraight(score, scoreName) {
    var straight = [];
    var straightRollHigh = ["2", "3", "4", "5", "6"];
    var straightRollLow = ["1", "2", "3", "4", "5"];


    for (let die of selected) {
        straight.push(die.innerText);
        straight.sort();
    }

    if (arrayEqual(straight, straightRollHigh) ||
        arrayEqual(straight, straightRollLow)) {
        if (rollTurn == 1) {
            score = 25;
        } else {
            score = 20;
        }
    }
    scoring(score, scoreName);
}

function tabulateFlush(score, scoreName) {
    var flush = [];
    for (let die of selected) {
        flush.push(die.innerText);
    }
    var unique = [...new Set(flush)];
    if (unique.length > 2) {
        score = 0;
    } else {
        var num1 = unique[0];
        var num2 = unique[1];

        const num1Count = flush.filter(i => i === num1).length;
        const num2Count = flush.filter(i => i === num2).length;

        if ((num1Count == 3 && num2Count == 2) ||
            (num1Count == 2 && num2Count == 3)) {
            if (rollTurn == 1) {
                score = 35;
            } else {
                score = 30;
            }
        }
    }
    scoring(score, scoreName)
}

function tabulatePoker(score, scoreName) {
    var poker = [];

    for (let die of selected) {
        poker.push(die.innerText);
    }
    const pokerUnique = [...new Set(poker)];
    if (pokerUnique.length > 1) {
        const pok1 = pokerUnique[0];
        const pok2 = pokerUnique[1];
        const pok1Count = poker.filter(i => i === pok1).length;
        const pok2Count = poker.filter(i => i === pok2).length;

        console.log(pokerUnique.length);
        console.log(pok1Count);
        console.log(pok2Count);
        if ((pok1Count == 4 && pok2Count == 1) || (pok1Count == 1 && pok2Count == 4) || pok1Count == 5) {
            if (rollTurn == 1) {
                score = 45;
            } else {
                score = 40;
            }
        } else {
            score = 0;
        }
    }
    console.log(pokerUnique.length);
    console.log(poker.length);
    if (pokerUnique.length == 1 && poker.length == 4) {
        if (rollTurn == 1) {
            score = 45;
        } else {
            score = 40;
        }
    }

    console.log(score);
    scoring(score, scoreName)
}

function laGrande(score, scoreName) {
    var grande = [];
    for (let die of selected) {
        grande.push(die.innerText);
    }
    var grandeUnique = [...new Set(grande)];
    console.log(grandeUnique.length);
    if (grandeUnique.length != 1 || grande.length != 5) {
        score = 0;
    } else {
        if (rollTurn == 1) {
            score = "You Win!";
        } else {
            score = 50;
        }
    }
    console.log(typeof (score));
    scoring(score, scoreName)
}

function laGrandeDoble(score, scoreName) {
    var grande = [];
    for (let die of selected) {
        grande.push(die.innerText);
    }
    var grandeUnique = [...new Set(grande)];
    console.log(grandeUnique.length);
    if (grandeUnique.length != 1 || grande.length != 5) {
        score = 0;
    } else {
        if (rollTurn == 1) {
            score = "You Win!";
        } else {
            score = 50;
        }
    }
    console.log(typeof (score));
    scoring(score, scoreName)
}



for (var i = 0; i < blocks.length; i++) {

    blocks[i].onclick = function () {

        // We don't want to overwrite something already scored
        if (this.classList.contains('final')) {
            return;
        }


        switch (this.id) {
            case 'ones':
                tabulateScore(1, ones);
                break;

            case 'twos':
                tabulateScore(2, twos);
                break;

            case 'threes':
                tabulateScore(3, threes);
                break;

            case 'fours':
                tabulateScore(4, fours);
                break;

            case 'fives':
                tabulateScore(5, fives);
                break;

            case 'sixes':
                tabulateScore(6, sixes);
                break;

            case 'straights':
                tabulateStraight(0, straights);
                break;

            case 'flush':
                tabulateFlush(0, flush);
                break;

            case 'poker':
                tabulatePoker(0, poker);
                break;

            case 'grande':
                laGrande(0, grande);
                break;

        }
    }


}


// Total Score
function tabulateTotal(score) {
    console.log(score);
    totalScore += score;
    console.log(totalScore);
    if (typeof (score) == "string") {
        total.innerText = score;
    } else {
        total.innerText = "Total: " + totalScore;
    }

}