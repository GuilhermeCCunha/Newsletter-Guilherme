import { typography } from './defaults/typography'; 
import { colors } from './defaults/colors'; 

const theme = {
  typography,
  colors,
};

export type Theme = typeof theme;
export type ThemeTypographyVariants = keyof typeof typography.variants;

export default theme;
