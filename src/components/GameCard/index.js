import "./styles.css"
import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import backgroundImage from "../../assets/ludeCardBack.jpg"


function GameCard(props) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            width={isSmallScreen ? "97.5px" : "146.25px"}
            height={isSmallScreen ? "130px" : "195px"}
            position={"relative"}

        >
            <Box className={props.flipped ? "front flipCard" : "front"} component="img" src={`https://static.divine-pride.net/images/items/cards/${props.cardId}.png`} />
            <Box className={props.flipped ? "back" : "back flipCard"} component="div" />
        </Box>
    )
}

export default GameCard