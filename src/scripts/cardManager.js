const cardsMinId = 4001
const cardsMaxId = 4610

export function flipCard(card) {
    for (const child of card.children) {
        child.classList.toggle("flipCard");
    }
}

export function getCards(pairsQuantity) {

    const newCardsArray = []

    for (let i = 0; i < pairsQuantity; i++) {

        let randomId = getRandomNumber(cardsMinId, cardsMaxId);

        while (newCardsArray.includes(randomId)) {
            randomId = getRandomNumber(cardsMinId, cardsMaxId);
        }

        newCardsArray.push(randomId);
        newCardsArray.push(randomId);
    }

    return newCardsArray
}

export function shuffleCards(arrayToShuffle) {

    for (let i = arrayToShuffle.length - 1; i >= 0; i--) {

        let randomIndex = getRandomNumber(0, i);

        [arrayToShuffle[i], arrayToShuffle[randomIndex]] = [arrayToShuffle[randomIndex], arrayToShuffle[i]]
    }

}

export function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}