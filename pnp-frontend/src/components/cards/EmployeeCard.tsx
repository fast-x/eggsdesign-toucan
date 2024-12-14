import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../styles';

interface Props {
  to: string;
  img: string;
  style?: CSSProperties;
}

export const EmployeeCard: React.FC<Props> = ({ to, img, children, style = {} }) => {
  const element = to ? Link : 'section';

  return (
    <Card to={to} as={element} style={style}>
      <div className="image-container">{img && <img src={img} alt="" loading="lazy" />}</div>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Card = styled.section<{ to: string }>`
  display: flex;
  align-items: flex-end;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  min-height: 296px;

  :hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.24);
  }

  &:hover img {
    ${({ to }) => to && 'transform: scale(1.02)'};
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    opacity: 64%;
    transition: 0.2s;
  }

  .image-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${colors.secondary1};
  }
`;

const CardContent = styled.section`
  position: relative;
  padding: 40px;
  color: ${colors.white};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
    font-size: 3rem;
  }
`;
