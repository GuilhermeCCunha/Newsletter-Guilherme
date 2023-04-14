import { Theme } from "@src/theme/theme";

export type ColorVariant = 'primary' | 'accent' | 'positive' | 'negative' | 'warning' | 'neutral';
export type Variant = 'ghost' | 'contained' | 'outlined';

function createVariant(theme: Theme, colorVariant) {
  return {
    contained: {
      backgroundColor: theme.colors[colorVariant].x500,
      color: theme.colors.neutral.x000,
      hover: {
        backgroundColor: theme.colors[colorVariant].x400,
      },
      focus: {
        backgroundColor: theme.colors[colorVariant].x600,
      },
    },
    outlined: {
      border: '1px solid',
      backgroundColor: 'transparent',
      color: theme.colors[colorVariant].x500,
      borderColor: theme.colors[colorVariant].x400,
      hover: {
        backgroundColor: theme.colors[colorVariant].x050,
      },
      focus: {
        backgroundColor: theme.colors[colorVariant].x100,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors[colorVariant].x500,
      hover: {
        backgroundColor: theme.colors[colorVariant].x050,
      },
      focus: {
        backgroundColor: theme.colors[colorVariant].x100,
      },
    },
  };
}

export function colorVariantBy(theme: Theme, colorVariant, variant) {
  const styles = {
    // [primary]
    primary: createVariant(theme, 'primary'),
    accent: createVariant(theme, 'accent'),
    positive: createVariant(theme, 'positive'),
    negative: createVariant(theme, 'negative'),
    warning: createVariant(theme, 'warning'),
    neutral: createVariant(theme, 'neutral'),
  };

  return styles[colorVariant][variant];
}
