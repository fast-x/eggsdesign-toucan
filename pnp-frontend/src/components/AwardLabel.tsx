import React from 'react';
import styled from 'styled-components';
import { colors } from './styles';
import { Paragraph } from './Typography';

interface Props {
  imageURL: string;
}

const AwardLabel: React.FC<Props> = ({ imageURL, children, ...props }) => {
  return (
    <Label {...props}>
      <div className="image-container">{imageURL && <img src={imageURL} alt="" />}</div>
      <Paragraph>{children}</Paragraph>
    </Label>
  );
};

export default AwardLabel;

const Label = styled.section`
  display: flex;
  align-items: center;
  text-decoration: none;

  .image-container img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: scale-down;
  }

  .image-container {
    overflow: hidden;
    height: 3.25rem;
    width: 3.25rem;
    flex: none;
    padding: 0.5rem;
    border-radius: 100%;
    border: 1px solid ${colors.neutral3};
    margin-right: 1rem;
  }
`;
