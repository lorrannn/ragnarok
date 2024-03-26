import "./styles.css"
import { Box, Grid, Button, Stack, Container } from "@mui/material";
import { useState } from "react";
import GameCard from "../GameCard";
// scripts
import GameLogic from "../../scripts/gameLogic2";

function Board() {

    const [gameLogic, setGameLogic] = useState(null)
    const [flippedCards, setFlippedCards] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(true)



    function handleStartGame(selectedDifficulty) {

        let newGameLogic = new GameLogic()
        newGameLogic.startGame(selectedDifficulty)

        setGameLogic(prevState => newGameLogic)
        setGameStarted(prevState => true)
        setGameOver(prevState => false)
        setFlippedCards(prevState => [...newGameLogic.cardsArray])

    }

    function backToTitle() {
        setGameStarted(false);
    }


    function handleSelectCard(card) {

        if (!gameLogic.activeCards.includes(card) && !gameLogic.foundCards.includes(card)) {

            gameLogic.selectCard(card);
            handleFlipCard(card);




        }



    }

    function handleFlipCard(card) {

        if (flippedCards.includes(card)) {

            setFlippedCards(prevState => flippedCards.filter(element => element != card))

        }
        else {

            setFlippedCards(prevState => [...flippedCards, card])
        }
    }

    return (
        <Container>
            {!gameStarted ? (
                <Stack justifyContent={"Center"} spacing={2} direction={"row"}>
                    <Button onClick={() => { handleStartGame("easy") }} variant="contained" sx={{ width: "100px" }}>Easy</Button>
                    <Button onClick={() => { handleStartGame("medium") }} variant="contained" sx={{ width: "100px" }}>Medium</Button>
                    <Button onClick={() => { handleStartGame("hard") }} variant="contained" sx={{ width: "100px" }}>Hard</Button>
                </Stack>) : (!gameOver ? (
                    <>
                        <Grid container gap="10px" justifyContent={"space-evenly"}>
                            {gameLogic.cardsArray.map((card, index) => {
                                return (
                                    <Grid
                                        item
                                        key={index}
                                        onClick={(event) => { handleSelectCard(card) }}
                                    >
                                        <GameCard flipped={flippedCards.includes(card)} cardId={card.id} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>) : (
                    <Box textAlign="center">
                        <Button onClick={backToTitle} variant="contained">Play Again</Button>
                    </Box>)
            )}
        </Container>
    )
}

export default Board