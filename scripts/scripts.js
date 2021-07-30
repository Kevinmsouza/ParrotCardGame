// Inicio do setup
let aswers = [];
let numberOfCards;
setupGame()
function setupGame() {
    numberOfCards = getNumberOfCards();
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
function shuffle(array) { // Peguei esse aqui no StackOverflow, parece ser mais eficiente
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
    const backFaces = [
        "metalparrot",
        "bobrossparrot",
        "explodyparrot",
        "fiestaparrot",
        "revertitparrot",
        "tripletsparrot",
        "unicornparrot",
    ];
    const gameArea = document.querySelector(".content");
    for (let i = 0; i < numberOfCards; i++) {
        gameArea.innerHTML += `<div class="card" onclick="verifyPlay(this)">
        <div class="front-face face">
            <img src="images/front.png">
        </div>
        <div class="back-face face">
            <img src="images/${backFaces[aswers[i]]}.gif">
        </div>
    </div>`;
    }
}
// Fim do setup

// Inicio da Gameplay
let isFirstOfPair = true, firstCard, secondCard;
let score = 0;
let playCount = 0;
let antiSpam = false; // Impede o usuario de clickar enquanto o as cartas desviram
function verifyPlay(card) {
    if (!(card.classList.contains("turned")) && !antiSpam){
        if (!isFirstOfPair){
            antiSpam = true;
            setTimeout(function () {
                antiSpam = false;
            }, 1200)
        }
        playCount++;
        turnCard(card);
    }
}
function turnCard(card){
    card.classList.add('turned')
    if (isFirstOfPair){
        firstCard = card;
        isFirstOfPair = false;
    }else{
        secondCard = card;
        verifyPoint()
        isFirstOfPair = true;
    }
}
function verifyPoint(){
    if (firstCard.innerHTML === secondCard.innerHTML){
        firstCard = null;
        secondCard = null;
        score++;
    }else{
        setTimeout(function () {
            firstCard.classList.remove("turned");
            secondCard.classList.remove("turned");
        }, 1000);
    }
    setTimeout(verifyEndgame, 500);
}
function verifyEndgame() {
    if (score === (numberOfCards / 2)){
        alert(`Você ganhou em ${playCount} jogadas!`)
    }
}