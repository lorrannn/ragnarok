import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";

function GameOverScreen(props) {

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [elapsedMinutes, setElapsedMinutes] = useState(0);


    useEffect(() => {
        setElapsedMinutes(Math.floor(props.elapsedTime / 60))
        setElapsedSeconds(props.elapsedTime % 60)
    }, [])

    return (<Box textAlign="center">
        <Button onClick={props.backToTitle} variant="contained">Play Again</Button>
        <Box sx={{ WebkitTextStrokeColor: "black", WebkitTextStrokeWidth: "0.5px" }} mt={5} color={"#f3eece"}>
            <Typography sx={{ WebkitTextStrokeWidth: "2px" }} fontFamily={"hexenkotel"} variant="h2">Statistics</Typography>
            <Typography fontFamily={"hexenkotel"} variant="h4">Difficulty: {props.difficulty}</Typography>
            <Typography fontFamily={"hexenkotel"} variant="h4" >Time: {elapsedMinutes}:{elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds}</Typography>
            <Typography fontFamily={"hexenkotel"} variant="h4">Mistakes: {props.mistakes}</Typography>

        </Box>
    </Box>)
}

export default GameOverScreen