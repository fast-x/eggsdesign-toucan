import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  to?: string;
  img?: string;
  small?: boolean;
  style?: object;
};

export const EmployeeProfileCard: React.FC<Props> = ({ to, img, children, style, small }) => {
  const element = to ? Link : 'section';

  return (
    <Card to={to} as={element} style={style} small={small}>
      <div className="image-container">{img && <img src={img} alt="" />}</div>
      <CardContent small={small || false}>{children}</CardContent>
    </Card>
  );
};

const Card = styled.section<Props>`
  display: flex;
  align-items: flex-end;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  min-height: ${(props): string => (props.small ? 'auto' : '400px')};

  :hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.24);
  }

  &:hover img {
    ${(props): string => (props.to ? 'transform: scale(1.02)' : '')};
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    opacity: 70%;
    transition: 0.2s;
  }

  .image-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #031029;
  }
`;

const CardContent = styled.section<{ small: boolean }>`
  position: relative;
  padding: ${(props): string => (props.small ? '16px' : '40px')};
  width: 70%;

  h1 {
    font-size: ${(props): string => (props.small ? '20px' : '48px')};
    font-weight: ${(props): string => (props.small ? '400' : '200')};
    position: relative;
    margin: ${(props): string => (props.small ? '48px 0 4px' : '8px 0 24px')};
    color: white;
  }

  p {
    color: white;
  }
`;
