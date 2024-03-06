import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//components
import TitleScreen from './components/TitleScreen';
import Board from './components/Board';

const theme = createTheme({
  palette: {
    primary: {
      main: "#f3eece",

    },

  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TitleScreen />
        <Board />
      </div>
    </ThemeProvider>

  );
}

export default App;
