import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../styles';

type ButtonSize = 'compact' | 'normal';
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'simple';
  size?: ButtonSize;
  type?: 'button' | 'submit';
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  ...props
}) => {
  switch (variant) {
    case 'primary':
      return (
        <Primary size={size} type={type} {...props}>
          {children}
        </Primary>
      );
    case 'secondary':
      return (
        <Secondary size={size} type={type} {...props}>
          {children}
        </Secondary>
      );
    case 'tertiary':
      return (
        <Tertiary size={size} type={type} {...props}>
          {children}
        </Tertiary>
      );
    case 'alert':
      return (
        <Alert size={size} type={type} {...props}>
          {children}
        </Alert>
      );
    case 'simple':
      return (
        <Simple size={size} type={type} {...props}>
          {children}
        </Simple>
      );
    default:
      return (
        <Primary size={size} type={type} {...props}>
          {children}
        </Primary>
      );
  }
};

const buttonSize = (size?: ButtonSize) => {
  return size === 'compact'
    ? css`
        padding: 6px 10px;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1;
      `
    : css`
        padding: 10px 22px;
      `;
};

const baseStyles = css`
  margin: 0;
  border: none;
  font-family: 'Haffer', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  text-align: center;
  line-height: 1.5;
  color: ${colors.primary.white};
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  transition: all 0.3s ease;

  &:active {
    transform: translateY(1px);
  }

  :hover {
    transform: scale(102%);
  }

  &:disabled {
    color: #999;
    opacity: 0.3;
    filter: grayscale(1);
    cursor: not-allowed;
  }
`;

const primaryStyles = css`
  background-color: ${colors.primary.black};
`;

const secondaryStyles = css`
  background-color: transparent;
  border: 1px solid ${colors.primary.black};
  color: ${colors.primary.black};

  :hover {
    background-color: ${colors.primary.white};
  }
`;

const Primary = styled.button<{ size: ButtonSize }>`
  ${baseStyles}
  ${primaryStyles}
  ${({ size }) => buttonSize(size)}
`;

const Secondary = styled.button<{ size: ButtonSize }>`
  ${baseStyles}
  ${secondaryStyles}
  ${({ size }) => buttonSize(size)}
`;

const Tertiary = styled.button<{ size: ButtonSize }>`
  ${baseStyles}
  ${({ size }) => buttonSize(size)}
`;

const Alert = styled.button<{ size: ButtonSize }>`
  ${baseStyles}
  ${({ size }) => buttonSize(size)}
  background-color: ${colors.tertiary.humanRed};
  color: ${colors.primary.black};

  :hover {
    background-color: ${colors.tertiary.humanRed};
  }
`;

const Simple = styled.button<{ size: ButtonSize }>`
  ${baseStyles}
  ${({ size }) => buttonSize(size)}
  
  background-color: transparent;
  color: ${colors.neutral2};
  box-shadow: none;
  font: inherit;

  :hover {
    color: ${colors.neutral1};
    background-color: ${colors.neutral3}55;
  }
`;

export const LinkButton = styled(Link)<ButtonProps>`
  ${baseStyles};
  ${({ variant = 'primary' }) => (variant === 'primary' && primaryStyles) || secondaryStyles}
  ${({ size }) => buttonSize(size)}
  text-decoration: none;
`;

export const AnchorButton = styled.a<ButtonProps>`
  ${baseStyles};
  ${({ variant = 'primary' }) => (variant === 'primary' && primaryStyles) || secondaryStyles}
  ${({ size }) => buttonSize(size)}
  text-decoration: none;
`;
