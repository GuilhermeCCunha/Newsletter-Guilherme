import React from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useThemeStyled,
} from 'styled-components';
import theme, { Theme } from "./theme";

export function useTheme(): Theme {
  return useThemeStyled() as unknown as any;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  )
}
