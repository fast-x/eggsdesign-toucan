import React from 'react';
import styled from 'styled-components';
import { colors } from './styles';

export const ManagerTag: React.FC = ({ children = {} }) => {
  return <ManagerTagContent>{children}</ManagerTagContent>;
};

const ManagerTagContent = styled.div`
  font-size: 1rem;
  line-height: 24px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
  color: ${colors.neutral1};
`;
