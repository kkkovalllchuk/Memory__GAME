const cards = document.querySelectorAll('.memory_card');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard 

const flipCard = e => {
    if (boardLocked) return;
    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");


    if (!hasFlippedCard) {
      // first click
        hasFlippedCard = true;
        firstCard = target;
    } else {
        //second click

        hasFlippedCard = false;
        secondCard = target;
        //check for match
        checkForMatch();
    }
};

const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
    isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
};
const resetBoard = () => {
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
};

const cardPlace = document.querySelector('.wrapper'); 
const prePair = [];
let pairs = 0;
const clearAllOperationObjectsAndCreateNewGame = function () {
    const playAgain = window.confirm('Congratulations. You have matched all pairs and won the game. Want to play again?');
    if (playAgain) {
        cardPlace.innerHTML = "";
        prePair.length = 0;
        pairs = 0;
        resetBoard();
    }
}


cards.forEach(card => {
    // add Event Listener to every card
    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});