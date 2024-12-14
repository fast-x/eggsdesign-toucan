import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  @keyframes hovering {
    0% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(10px);
    }
  }

  background-color: rgba(200, 200, 200, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: hovering 3s ease-in-out infinite;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 32px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

type Props = {
  title?: string;
  text?: string;
  children?: React.ReactNode;
};

export default function LoadingOverlay({
  title = 'Loading',
  text = 'Your project is being added',
  children,
}: Props): JSX.Element {
  return (
    <Overlay>
      <LoadingText>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </LoadingText>
    </Overlay>
  );
}
