import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import "./styles/styles.scss"

import HomePage from "./pages/Homepage";
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';

import variables from "./styles/abstract/variables.module.scss"
import Dashboard from './pages/Dashboard';
import LoginRegister from './pages/LoginRegister';

const { palette } = createTheme();

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: variables.primaryColor,
    },
    secondary: {
      main: variables.secondaryColor,
    },
    text: {
      primary: variables.blackColor,
      disabled: variables.greyColor,
    },
    background: {
      default: variables.whiteColor,
      paper: variables.whiteColor,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 600,
      lg: 768,
      xl: 992,
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
            <Route path="/tableaudebord/userid" element={<Dashboard />} width="100%"/>
            <Route path="/login" element={<LoginRegister />} width="100%"/>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;