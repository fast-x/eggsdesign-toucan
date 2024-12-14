import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const LoadingIndicator: React.FC<Props> = ({ className = '' }) => (
  <Container className={className}>
    <StyledSpinner viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </StyledSpinner>
  </Container>
);

const Container = styled.div`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: 0;
  width: 50px;
  height: 50px;
  pointer-events: none;

  & .path {
    stroke: #c3c3c3;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default LoadingIndicator;
