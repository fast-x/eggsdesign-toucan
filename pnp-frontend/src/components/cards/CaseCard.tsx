import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading1 } from '../Typography';

type Props = {
  to?: string;
  img?: string;
  textColor?: string;
  imageColor?: string;
  style?: { [rule: string]: string };
};

export const CaseCard: React.FC<Props> = ({ to, img, children, textColor, imageColor, style }) => {
  const element = to ? Link : 'section';

  return (
    <Card
      to={to ?? ''}
      style={{ ...style, textShadow: ` 0 1px 4px ${`${imageColor ?? ''}60` || '#00000020'}` }}
      as={element}>
      <div className="image-container">
        <Overlay style={{ background: imageColor || '#fff', border: imageColor ? 'none' : '1px solid #00000040' }} />
        {img && <img src={img} alt="" loading="lazy" />}
      </div>
      <CardContent
        style={{ color: textColor || '#000000', textShadow: imageColor && `text-shadow: 0 2px 8px ${imageColor}` }}>
        {children}
      </CardContent>
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

  &:hover img {
    ${(props) => props.to && 'transform: scale(1.02)'}
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .image-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const Overlay = styled.div`
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  border: 1px solid #00000030;
  border-radius: 8px;
`;

const CardContent = styled.section`
  position: relative;
  padding: 40px;
  z-index: 2;
`;

export const CardTitle = styled(Heading1)`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 2em;

  :before {
    content: '';
    display: block;
    background: currentColor;
    height: 4px;
    border-radius: 2px;
    min-width: 100px;
    width: 30%;
    margin-bottom: 16px;
  }
`;

export const CardClientName = styled.span`
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`;

export const CardTag = styled.div`
  display: inline-block;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 8px;
  font-size: 14px;
`;
