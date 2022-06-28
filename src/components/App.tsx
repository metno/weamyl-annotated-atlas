import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, SimplePaletteColorOptions } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  createMetTheme,
  paletteAsString,
  paletteMap,
} from '../utils/metMuiThemes';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';

const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: paletteMap.get('teal_palette'),
          secondary: paletteMap.get('black_palette'),
        },
      })}
    >
      <Box
        component="div"
        sx={{
          height: '100%',
          backgroundImage: 'url(/images/waves.png)',
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
