const cardsMinId = 4001;
const cardsMaxId = 4610;

const easyDifficulty = 8;
const mediumDifficulty = 16;
const hardDifficulty = 32;

class GameLogic {

    cardsArray = []
    foundCards = []
    activeCards = []

    startGame(difficulty) {

        let gameDifficulty

        switch (difficulty) {

            case 'easy':
                gameDifficulty = easyDifficulty;
                break;

            case 'medium':
                gameDifficulty = mediumDifficulty;
                break;

            case 'hard':
                gameDifficulty = hardDifficulty;
                break;

            default:
                gameDifficulty = mediumDifficulty;
                break;

        }

        let newCardsArray = getCards(gameDifficulty);
        shuffleCardsArray(newCardsArray);
        this.cardsArray = newCardsArray;
    };

    selectCard(card) {

        this.activeCards.push(card);

        if (this.activeCards.length == 2) {

            let firstCard = this.activeCards[0]
            let secondCard = this.activeCards[1]
            this.activeCards = []

            if (firstCard.id == secondCard.id) {

                this.foundCards.push(firstCard)
                this.foundCards.push(secondCard)

            }
            else {

            }
        }
    }

}

function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

};

function shuffleCardsArray(arrayToShuffle) {

    for (let i = arrayToShuffle.length - 1; i >= 0; i--) {

        let randomIndex = getRandomNumber(0, i);

        [arrayToShuffle[i], arrayToShuffle[randomIndex]] = [arrayToShuffle[randomIndex], arrayToShuffle[i]]
    }

};

function getCards(pairsQuantity) {

    const newCardsArray = [];

    for (let i = 0; i < pairsQuantity; i++) {

        // gets a randomId
        let randomId = getRandomNumber(cardsMinId, cardsMaxId);

        // if it already exists, gets another
        while (newCardsArray.includes(randomId)) {
            randomId = getRandomNumber(cardsMinId, cardsMaxId);
        }

        newCardsArray.push({ id: randomId, key: 1 });
        newCardsArray.push({ id: randomId, key: 2 });
    }

    return newCardsArray
}

function compareCards(firstCard, secondCard) {
    return (firstCard.id == secondCard.id);
}



export default GameLogic