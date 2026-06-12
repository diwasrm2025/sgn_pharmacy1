import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import App from './App';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: { main: '#D20009' },
    secondary: { main: '#666666' },
    background: { default: '#fcfcfc', paper: '#ffffff' },
    text: { primary: '#222222', secondary: '#666666' },
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Space Grotesk", "Manrope", sans-serif', fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 0, textTransform: 'none', fontWeight: 700 } } },
    MuiCard: { defaultProps: { square: true }, styleOverrides: { root: { borderRadius: 0 } } },
    MuiPaper: { defaultProps: { square: true }, styleOverrides: { root: { borderRadius: 0 } } },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
