import { createTheme } from '@vanilla-extract/css';

const black = (opacity: number = 1) => `hsla(0, 0%, 7%, ${opacity})`;
const white = (opacity: number = 1) => `hsla(0, 0%, 96%, ${opacity})`;
const gray = (opacity: number = 1) => `hsla(0, 0%, 93%, ${opacity})`;
const darkGray = (opacity: number = 1) => `hsla(0, 0%, 67%, ${opacity})`;
// const blue = (opacity: number = 1) => `rgba(41, 85, 113, ${opacity})`;
const blue = (opacity: number = 1) =>
  `hsl(204.38, 69.388%, 47.914%, ${opacity})`;
const cyan = (opacity: number = 1) =>
  `hsl(204.38, 69.388%, 47.914%, ${opacity})`;
// const cyan = (opacity: number = 1) => `rgba(136, 206, 254, ${opacity})`;
const yellow = (opacity: number = 1) =>
  `hsl(63.442, 100%, 48.348%, ${opacity})`;
const orange = (opacity: number = 1) => `hsla(14, 100%, 53%, ${opacity})`;

// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;

export const [themeClass, vars] = createTheme({
  color: {
    /**
     * Black
     */
    neutral: black(),
    'neutral-60': black(0.6),
    'neutral-40': black(0.4),
    /**
     * White
     */
    background: white(),
    'background-10': white(0.1),
    'background-20': white(0.2),
    /**
     * Gray
     */
    highlight: gray(),
    /**
     * Dark gray
     */
    shadow: darkGray(),
    'shadow-20': darkGray(0.2),
    'shadow-40': darkGray(0.4),
    'shadow-60': darkGray(0.6),
    'shadow-80': darkGray(0.8),
    /**
     * Cyan
     */
    primary: cyan(),
    /**
     * Dark blue
     */
    primaryDark: blue(),
    /**
     * Yellow
     */
    secondry: yellow(),
    /**
     * Orange
     */
    warning: orange(),
  },
});

export const darkThemeClass = createTheme(vars, {
  color: {
    neutral: white(),
    'neutral-60': white(0.6),
    'neutral-40': white(0.4),
    background: black(),
    'background-10': black(10),
    'background-20': black(20),
    highlight: gray(),
    primary: yellow(),
    primaryDark: blue(),
    secondry: yellow(),
    shadow: gray(),
    'shadow-20': gray(0.2),
    'shadow-40': gray(0.4),
    'shadow-60': gray(0.6),
    'shadow-80': gray(0.8),
    warning: orange(),
  },
});
