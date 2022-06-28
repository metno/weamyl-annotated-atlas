import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import React from 'react';
import { paletteMap } from '../utils/metMuiThemes';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import bgImage from '../images/waves.png';

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
