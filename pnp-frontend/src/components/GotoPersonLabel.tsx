import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from './styles';
interface Props {
  to: string;
  img: string;
  style?: object;
}

export const GotoPersonLabel: React.FC<Props> = ({ to, img, children, style = {} }) => {
  const element = to ? Link : 'section';

  return (
    <Card to={to} as={element} style={style}>
      <div className="image-container">{img && <img src={img} alt="" />}</div>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Card = styled.section<{ to: string }>`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover .image-container img {
    ${(props) => props.to && 'transform: scale(1.02)'};
  }

  .image-container img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: 0.2s;
  }

  .image-container {
    border-radius: 100%;
    overflow: hidden;
    height: 2.5rem;
    width: 2.5rem;
    flex: none;
  }
`;

const CardContent = styled.section`
  padding-left: 1rem;
  color: ${colors.neutral1};
`;
