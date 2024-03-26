import "./styles.css"
import { Container, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';


function TitleScreen(props) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


    return (<Container>
        <Box sx={{ WebkitTextStrokeColor: "black", WebkitTextStrokeWidth: "3px" }} color={"#f3eece"} textAlign={"center"} py={2}>
            <Typography fontFamily={"hexenkotel"} variant={isSmallScreen ? "h2" : "h1"} component="h1" >Ragnarok </Typography>
            <Typography sx={{ WebkitTextStrokeWidth: "2.5px" }} fontFamily={"hexenkotel"} variant={isSmallScreen ? "h3" : "h2"} component="h2">
                Memory Game
            </Typography>
        </Box>
    </Container>
    )
}

export default TitleScreen
