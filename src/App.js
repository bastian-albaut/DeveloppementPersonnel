import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import "./styles/styles.scss"

import HomePage from "./pages/Homepage";
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';

let theme = createTheme({
  palette: {
    primary: {
      main: '#DA2C38',
    },
    secondary: {
      main: '#226F54',
    },
    background1: {
      main: '#3a4f41',
    },
    background2: {
      main: '#48ACF0',
    },
    black: {
      main: '#000000',
    },
    grey: {
      main: '#7d7d7d',
    }
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    h1: {
      fontFamily: [
        'Fredoka',
        'cursive',
      ].join(','),
    },
    h2: {
      fontFamily: [
        'Raleway',
        'cursive',
      ].join(','),
    },
    h3: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    h4: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    h5: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    h6: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    subtitle1: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    body1: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    caption: {
      fontFamily: [
        'Raleway',
        'sans-serif',
      ].join(','),
    },
    button: {
      fontFamily: [
        'Fredoka',
        'cursive',
      ].join(','),
      fontWeight: "bold",
    }
  },
  shape: {
    borderRadius: 30
  },
});

theme = responsiveFontSizes(theme);

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} width="100%"/>
            <Route path="/quiz" element={<Quiz />} width="100%"/>
            <Route path="/quiz/result/resultid" element={<QuizResult />} width="100%"/>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;