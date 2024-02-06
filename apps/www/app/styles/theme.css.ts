import { createTheme } from '@vanilla-extract/css';

const black = (opacity: number = 1) => `hsla(0, 0%, 7%, ${opacity})`;
const white = (opacity: number = 1) => `hsla(0, 0%, 96%, ${opacity})`;
const gray = (opacity: number = 1) => `hsla(0, 0%, 93%, ${opacity})`;
const darkGray = (opacity: number = 1) => `hsla(0, 0%, 67%, ${opacity})`;
// const blue = (opacity: number = 1) => `rgba(41, 85, 113, ${opacity})`;
const blue = (opacity: number = 1) => `rgba(0, 79, 113, ${opacity})`;
const cyan = (opacity: number = 1) => `hsla(194, 99%, 58%, ${opacity})`;
// const cyan = (opacity: number = 1) => `rgba(136, 206, 254, ${opacity})`;
const yellow = (opacity: number = 1) => `hsla(47, 100%, 58%, ${opacity})`;

// $orange: hsl(14, 100%, 53%);
// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;

export const [themeClass, vars] = createTheme({
  color: {
    neutral: black(),
    background: white(),
    highlight: gray(),
    shadow: darkGray(),
    primary: cyan(),
    primaryDark: blue(),
    secondry: yellow(),
  },
});

export const darkThemeClass = createTheme(vars, {
  color: {
    neutral: white(),
    background: black(),
    highlight: gray(),
    primary: yellow(),
    primaryDark: blue(),
    secondry: yellow(),
    shadow: gray(),
  },
});
