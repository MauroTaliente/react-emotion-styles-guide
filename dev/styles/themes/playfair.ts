import { themeBuilder } from "../../../src";

const colors = {
  acent: '#ff4e30',
  primary: '#020202',
  secondary: '#747474',
  ngAcent: '#f0f0f0',
  bgPrimary: '#f0f0f0',
  bgSecondary: '#ffffff',
};

const fonts = {
  primary: 'Playfair Display',
  secondary: 'IBM Plex Sans',
};

const playfair = themeBuilder({
  base: { breakPoints: [360] },
  name: 'playfair',
  colors,
  fonts,
})(({ colors, fonts }) => {
  return {
    h1: {
      color: colors.primary,
      fontFamily: fonts.primary,
      fontSize: '3em',
      fontWeight: 300,
    },
    p: {
      color: colors.secondary,
      fontFamily: fonts.secondary,
      fontSize: '1em',
      fontWeight: 300,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      width: 'auto',
      display: 'flex',
      backgroundColor: colors.acent,
      fontFamily: fonts.secondary,
      color: colors.ngAcent,
      fontSize: '0.75em',
      padding: '1em 2em',
      border: `0.16em solid ${fonts.primary}03`,
      borderRadius: '0.25em',
      cursor: 'pointer',
    },
  };
});

// console.log(playfair);

export default playfair;
