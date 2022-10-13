import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import React from 'react';
import { black_palette, teal_palette } from '../../utils/metMuiThemes';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import './App.css';
import bgImage from '../../images/waves.png';

const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: teal_palette,
          secondary: black_palette,
        },
        typography: {
          fontFamily: 'Simplon BP Regular',
          fontSize: 16,
        },
      })}
    >
      <Box
        component="div"
        sx={{
          height: '100%',
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <Header />
        <Home />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
