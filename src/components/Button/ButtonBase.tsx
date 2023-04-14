import React from "react";
import styled from 'styled-components';
import { useRipple } from "react-use-ripple";
import { ThemeTypographyVariants } from "@src/theme/theme";
import Text from "../Text";
import { StyleSheet } from "@src/theme/StyleSheet";
import { useRouter } from "next/router";

// [Composição Atual]
// Button: tag
// Text: tag
// BaseComponent: tag
// StyledComponent

const StyledButton = styled(Text)<any>``;

export interface ButtonBaseProps {
  href?: string;
  children: React.ReactNode;
  textVariant?: ThemeTypographyVariants;
  styleSheet?: StyleSheet;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ButtonBase({
  children,
  textVariant,
  styleSheet,
  href,
  ...props
}: ButtonBaseProps) {
  const router = useRouter();
  const ref = React.useRef();
  const isLink = Boolean(href);
  const Tag = isLink ? 'a' : 'button';
  
  useRipple(ref, {
    animationLength: 600,
    rippleColor: 'rgba(255,255,255,0.7)',
  });


  return (  
    <StyledButton
      ref={ref}
      tag={Tag}
      href={href}
      styleSheet={{
        border: '0',
        backgroundColor: 'transparent',
        color: 'inherit',
        outline: '0',
        cursor: 'pointer',
        textDecoration: 'none',
        ...styleSheet
      }}
      onClick={(event) => {
        isLink && event.preventDefault();
        isLink && router.push(href);
        !isLink && props.onClick && props.onClick(event);
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
