import * as cardManagerScript from "./cardManager"

export let foundCards = [];
let canRevealCard = true;
let activeCards = [];

export function selectCard(card) {

    if (canRevealCard) {

        cardManagerScript.flipCard(card);
        activeCards.push(card);
        card.style.pointerEvents = "none"

        if (activeCards.length == 2) {

            let firstCard = activeCards[0];
            let secondCard = activeCards[1];
            canRevealCard = false;

            if (firstCard.classList[3] == secondCard.classList[3]) {

                setTimeout(() => {
                    foundCards.push(firstCard);
                    foundCards.push(secondCard);

                    canRevealCard = true;
                }, 1100)

            }

            else {
                setTimeout(() => {

                    cardManagerScript.flipCard(firstCard)
                    firstCard.style.pointerEvents = "auto"

                    cardManagerScript.flipCard(secondCard)
                    secondCard.style.pointerEvents = "auto"

                    canRevealCard = true;
                }, 1100)
            }

            activeCards = [];
        }
    }
}