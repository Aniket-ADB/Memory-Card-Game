const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disableDeck = false;
let matchedCards = 0;
let timeLeft = 30; 
let timer; 
let timerStarted = false; 

const timerElement = document.getElementById("time");

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 10) {
            document.querySelector(".timer").classList.add("alert");
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000); 
}

function flipcard(e) {
    let clickedCard = e.target.closest(".card");

    if (disableDeck || clickedCard === cardOne) return;

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    clickedCard.classList.add("flip");
    if (!cardOne) {
        cardOne = clickedCard;
        return;
    }

    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        cardOne.removeEventListener("click", flipcard);
        cardTwo.removeEventListener("click", flipcard);

        resetCards();
        
        if (matchedCards === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert("Congratulations! You've matched all cards."), 500);
        }
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetCards();
        }, 1200);
    }
}

function resetCards() {
    cardOne = cardTwo = ""; 
    disableDeck = false; 
}

function gameOver() {
    alert("Game over! Time's up!");
    cards.forEach(card => card.classList.remove("flip")); 
    resetGame();
}

function resetGame() {
    matchedCards = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    timerStarted = false;
    timeLeft = 30;
    clearInterval(timer); 
    timerElement.innerText = timeLeft; 
    document.querySelector(".timer").classList.remove("alert");

    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipcard);
    });

    shuffleCards();
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

cards.forEach(card => {
    card.addEventListener("click", flipcard);
});

window.onload = function() {
    resetGame();
};
