import { themeBuilder } from "../../../src";

const colors = {
  acent: '#9e8de5',
  primary: '#0f0f11',
  secondary: '#393e43',
  ngAcent: '#ffffff',
  bgPrimary: '#ffffff',
  bgSecondary: '#edf0fa',
};

const fonts = {
  primary: 'Unbounded',
  secondary: 'Raleway',
};

const raleway = themeBuilder({
  base: { breakPoints: [360] },
  name: 'raleway',
  colors,
  fonts,
})(({ colors, fonts }) => {
  return {
    h1: {
      color: colors.primary,
      background: `-webkit-linear-gradient(30deg, ${colors.primary}, ${colors.secondary})`,
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
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
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      backgroundColor: colors.bgSecondary,
      padding: '4em 2em 2em 2em',
      borderRadius: '1em',
    },
    button: {
      width: '25em',
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: colors.acent,
      fontFamily: fonts.secondary,
      color: colors.ngAcent,
      fontSize: '0.75em',
      padding: '1em 2em',
      borderRadius: '1em',
      borderColor: 'transparent',
      cursor: 'pointer',
    },
  };
});


export default raleway;
