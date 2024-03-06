class GameLogic {

    cardsMinId = 4001;
    cardsMaxId = 4610;

    easyDifficulty = 4;
    mediumDifficulty = 16;
    hardDifficulty = 32;

    cardsArray = [];
    foundCards = [];
    activeCards = [];

    canRevealCard = false;
    gameOver = false;

    startGame(difficulty) {

        let gameDifficulty

        switch (difficulty) {
            case 'easy':
                gameDifficulty = this.easyDifficulty;
                break;

            case 'medium':
                gameDifficulty = this.mediumDifficulty;
                break;

            case 'hard':
                gameDifficulty = this.hardDifficulty;
                break;

            default:
                gameDifficulty = this.mediumDifficulty;
                break;
        }

        let newCardsArray = this.getCards(gameDifficulty);
        this.shuffleCardsArray(newCardsArray);
        this.cardsArray = newCardsArray;
        this.canRevealCard = true;

    };

    selectCard(card) {

        if (this.canRevealCard) {

            this._flipCard(card);
            this.activeCards.push(card);
            card.style.pointerEvents = "none"

            if (this.activeCards.length == 2) {

                let firstCard = this.activeCards[0];
                let secondCard = this.activeCards[1];
                this.canRevealCard = false;

                if (firstCard.classList[3] == secondCard.classList[3]) {

                    this.foundCards.push(firstCard.classList[3]);
                    this.foundCards.push(secondCard.classList[3]);

                    setTimeout(() => {
                        this.canRevealCard = true;
                    }, 500)


                }

                else {
                    setTimeout(() => {

                        this._flipCard(firstCard)
                        firstCard.style.pointerEvents = "auto"

                        this._flipCard(secondCard)
                        secondCard.style.pointerEvents = "auto"

                        this.canRevealCard = true;
                    }, 1000)
                }

                this.activeCards = [];
            }
        }
    };

    getCards(pairsQuantity) {

        const newCardsArray = [];

        for (let i = 0; i < pairsQuantity; i++) {

            let randomId = this._getRandomNumber(this.cardsMinId, this.cardsMaxId);

            while (newCardsArray.includes(randomId)) {
                randomId = this._getRandomNumber(this.cardsMinId, this.cardsMaxId);
            }

            newCardsArray.push(randomId);
            newCardsArray.push(randomId);
        }

        return newCardsArray
    };

    shuffleCardsArray(arrayToShuffle) {

        for (let i = arrayToShuffle.length - 1; i >= 0; i--) {

            let randomIndex = this._getRandomNumber(0, i);

            [arrayToShuffle[i], arrayToShuffle[randomIndex]] = [arrayToShuffle[randomIndex], arrayToShuffle[i]]
        }

    };

    _flipCard(card) {
        for (const child of card.children) {
            child.classList.toggle("flipCard");
        }
    };

    _getRandomNumber(min, max) {

        return Math.floor(Math.random() * (max - min + 1) + min);

    };
}

export default GameLogic;