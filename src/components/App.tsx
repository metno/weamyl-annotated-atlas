import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import React from 'react';
import { black_palette, teal_palette } from '../utils/metMuiThemes';
import Footer from './main/Footer';
import Header from './main/Header';
import Home from './main/Home';
import bgImage from '../images/waves.png';

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
