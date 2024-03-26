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
        <Box mt={5} color={"#3f5956"}>
            <Typography fontFamily={"hexenkotel"} variant="h3">Statistics</Typography>
            <Typography fontFamily={"hexenkotel"} variant="h5" >Time: {elapsedMinutes}:{elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds}</Typography>
            <Typography fontFamily={"hexenkotel"} variant="h5">Mistakes: {props.mistakes}</Typography>

        </Box>
    </Box>)
}

export default GameOverScreen