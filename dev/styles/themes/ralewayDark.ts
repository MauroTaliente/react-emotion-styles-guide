import { themeBuilder } from "../../../src";
import { emptyTheme } from "../../../src/model";
import raleway from "./raleway";

const colors = {
  acent: '#9e8de5',
  primary: '#ffffff',
  secondary: '#edf0fa',
  ngAcent: '#0f0f11',
  bgPrimary: '#0f0f11',
  bgSecondary: '#393e43',
};


const ralewayDark = themeBuilder({
  base: raleway,
  name: 'ralewayDark',
  colors,
  fonts: {},
})(({ colors, fonts }) => {
  return {
  };
});

export default ralewayDark;
