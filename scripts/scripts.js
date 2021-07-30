const backFaces = [
    "metalparrot",
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot",
];
let aswers = [];

function setupGame() {
    const numberOfCards = getNumberOfCards();
    generateAnswers(numberOfCards);
    generateCards(numberOfCards);
    
}
function getNumberOfCards() {
    let input = Number(prompt("Com quantas cartas deseja jogar?"));
    while (!(input >= 4 && input <= 14 && input % 2 === 0)){
        input = Number(prompt("Com quantas cartas deseja jogar?"));
    }
    return input;
}
function generateAnswers(numberOfCards) {
    for (let key = 0; key < numberOfCards / 2; key ++) {
        aswers.push(key);
        aswers.push(key);       
    }
    shuffle(aswers);
}
// Peguei esse aqui no StackOverflow, parece ser mais eficiente
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
function generateCards(numberOfCards) {
    const gameArea = document.querySelector(".content");
    for (let i = 0; i < numberOfCards; i++) {
        gameArea.innerHTML += `<div class="card" onclick="classList.toggle('virada')">
        <div class="front-face face">
            <img src="images/front.png">
        </div>
        <div class="back-face face">
            <img src="images/${backFaces[aswers[i]]}.gif">
        </div>
    </div>`;
    }
}