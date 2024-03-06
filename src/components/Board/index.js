import "./styles.css"
import { Box, Grid, Button, Stack, Container } from "@mui/material";
import backgroundImage from "./../../assets/cardBack.jpg"
import { useEffect, useState } from "react";

// scripts
import GameLogic from "../../scripts/gameLogic";

function Board() {

    const [gameLogic, setGameLogic] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(true);

    function handleStartGame(selectedDifficulty) {

        let newGameLogic = new GameLogic();
        newGameLogic.startGame(selectedDifficulty);

        setGameLogic(newGameLogic);
        setGameStarted(true);
        setGameOver(false);

    }

    function handleSelectCard(card) {
        gameLogic.selectCard(card);
        setGameOver(gameLogic.foundCards.length == gameLogic.cardsArray.length);
    }

    function backToTitle() {
        setGameStarted(false);
    }


    return (
        <Container>
            {!gameStarted ? (
                <Stack justifyContent={"Center"} spacing={2} direction={"row"}>
                    <Button onClick={() => { handleStartGame("easy") }} variant="contained" sx={{ width: "100px" }}>Easy</Button>
                    <Button onClick={() => { handleStartGame("medium") }} variant="contained" sx={{ width: "100px" }}>Medium</Button>
                    <Button onClick={() => { handleStartGame("hard") }} variant="contained" sx={{ width: "100px" }}>Hard</Button>
                </Stack>) : (!gameOver ? (
                    <Grid gap="10px" container justifyContent={"space-evenly"}>
                        {gameLogic.cardsArray.map((card, index) => {
                            return (
                                <Grid key={index} item className={`card ${card}`} onClick={(event) => { handleSelectCard(event.target) }}>
                                    <Box className="front flipCard" component="img" src={`https://static.divine-pride.net/images/items/cards/${card}.png`}></Box>
                                    <Box className="back" component="img" src={backgroundImage}></Box>
                                </Grid>
                            )
                        })}
                    </Grid>) : (
                    <Box textAlign="center">
                        <Button onClick={backToTitle} variant="contained">Play Again</Button>
                    </Box>)
            )}
        </Container>
    )
}

export default Board