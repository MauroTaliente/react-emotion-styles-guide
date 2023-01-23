import createStyleGuide from "../src";


const ligth = {
  colors: {
    acent: '#ff4e30',
    primary: '#020202',
    secondary: '#747474',
    bgPrimary: '#f0f0f0',
    bgSecondary: '#ffffff',
  },
  fonts: {
    primary: 'Playfair Display',
    secondary: 'IBM Plex Sans',
  },
  get texts() {
    return {
      h1: {
        
        color: this.colors,
        fontFamily: this.fonts.primary,
        fontSize: '3em',
        fontWeight: 700,
      }
    }
  },
  get atoms() {
    return {
      card: {
        display: 'flex',
        color: this.colors.secondary,
      },
      button: {
        display: 'flex',
        backgroundColor: this.colors.acent,
      },
    }
  },
};

const dark = {
  colors: {
    acent: '#D9D9D9',
    primary: '#94A890',
    secondary: '#1F1F29',
  },
};

const config = {
  activeTheme: 'ligth',
  baseTheme: 'ligth',
  breakPoints: [640, 1140],
  colors: {
    brand: '#A67458',
  },
  themes: {
    ligth,
    dark,
  },
};

const {
  StyleGuideProvider,
  useStyleGuide,
} = createStyleGuide(config);

export {
  StyleGuideProvider,
  useStyleGuide,
};
