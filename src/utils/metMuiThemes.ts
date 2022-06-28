/**
 * Main Colors
 * These are the main color combinations to be used for met web applications
 * for more info see: https://blest.met.no/intranett/_attachment/1712?_ts=1490d5de31a
 */

import { SimplePaletteColorOptions, Theme } from '@mui/material';

export const teal_palette: SimplePaletteColorOptions = {
  light: '#BADEE4',
  main: '#0090A8',
  dark: '#74C4D7',
};

export const black_palette: SimplePaletteColorOptions = {
  light: '#E9E9E9',
  main: '#496C80',
  dark: '#323232',
};

/**
 * Secondary Colors
 * There are the main addition colors to be used for met web applications
 */

export const green_palette: SimplePaletteColorOptions = {
  light: '#B9DABB',
  main: '#54AB54',
  dark: '#1D6936',
};

export const yellow_palette: SimplePaletteColorOptions = {
  light: '#FFEAB0',
  main: '#FFD255',
  dark: '#8D6F1A',
};

export const purple_palette: SimplePaletteColorOptions = {
  light: '#BEB9D7',
  main: '#7974AF',
  dark: '#464769',
};

export const brown_palette: SimplePaletteColorOptions = {
  light: '#C4B2A1',
  main: '#7B5947',
  dark: '#513829',
};

export const red_palette: SimplePaletteColorOptions = {
  light: '#CFA9B8',
  main: '#A24E75',
  dark: '#712C56',
};

export const pageSpacing = (theme: Theme) => {
  return {
    margin: 0,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 1,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  };
};
