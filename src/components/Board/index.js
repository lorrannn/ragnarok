import "./styles.css"
import { Grid, Button, Stack, Container } from "@mui/material";
import { useEffect, useState } from "react";
import GameCard from "../GameCard";
import GameOverScreen from "../GameOverScreen";

const cardsMinId = 4001;
const cardsMaxId = 4610;
const easyDifficulty = 8;
const mediumDifficulty = 16;
const hardDifficulty = 32;

let initialTime;
let finalTime;
let elapsedTime;
let mistakes;
let chosenDifficulty;

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


function Board() {

    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [cardsArray, setCardsArray] = useState([])
    const [foundCards, setFoundCards] = useState([])
    const [activeCards, setActiveCards] = useState([])
    const [count, setCount] = useState(0)

    function backToTitle() {
        setGameStarted(prevState => false);
        setGameOver(prevState => false);
    }

    function startGame(difficulty) {

        let gameDifficulty
        chosenDifficulty = difficulty

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
        setCardsArray(prevState => newCardsArray);
        setFoundCards(prevState => [])
        setGameStarted(prevState => true);
        setGameOver(prevState => false);
        initialTime = Date.now();
        mistakes = 0;

    }

    function endGame() {

        finalTime = Date.now();
        elapsedTime = Math.floor((finalTime - initialTime) / 1000)
        setGameOver(prevState => true)
    }

    function selectCard(card) {
        if (!foundCards.includes(card)) {

            if (!activeCards.includes(card) && activeCards.length < 2) {
                setActiveCards(prevState => [...prevState, card])
            }
        }
    }

    useEffect(() => {
        setCount(prevState => prevState + 1)

        if (count > 1 && activeCards.length == 2) {

            let firstCard = activeCards[0]
            let secondCard = activeCards[1]

            if (firstCard.id == secondCard.id) {
                setFoundCards(prevState => [...prevState, firstCard, secondCard])
                setActiveCards(prevState => [])
            }

            else {
                setTimeout(() => { setActiveCards(prevState => []) }, 1000)
                mistakes++;
            }
        }

    }, [activeCards])

    useEffect(() => {

        if (count > 1 && foundCards.length == cardsArray.length) {

            setTimeout(() => {
                endGame();
            }, 1000)

        }

    }, [foundCards])

    return (<Container>
        {!gameStarted ? (
            <Stack justifyContent={"Center"} spacing={2} direction={"row"}>
                <Button onClick={() => { startGame("easy") }} variant="contained" sx={{ width: "100px" }}>Easy</Button>
                <Button onClick={() => { startGame("medium") }} variant="contained" sx={{ width: "100px" }}>Medium</Button>
                <Button onClick={() => { startGame("hard") }} variant="contained" sx={{ width: "100px" }}>Hard</Button>
            </Stack>) : (!gameOver ? (
                <>
                    <Grid container gap="10px" justifyContent={"space-evenly"}>
                        {cardsArray.map((card, index) => {
                            return (
                                <Grid
                                    item
                                    key={index}
                                    onClick={(event) => { selectCard(card) }}
                                >
                                    <GameCard flipped={!(activeCards.includes(card) || foundCards.includes(card))} cardId={card.id} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </>) : (
                <GameOverScreen
                    backToTitle={backToTitle}
                    elapsedTime={elapsedTime}
                    mistakes={mistakes}
                    difficulty={chosenDifficulty}
                />
            )
        )}
    </Container>)
}

export default Board