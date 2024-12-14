import React from 'react';
import styled from 'styled-components';

export const ClientCardTitle = styled.h1`
  margin: 0;
  padding: 0;
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

export const ClientCardContact = styled.section`
  color: #00000060;
  & a {
    color: #00000060;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Container = styled.article`
  border: 1px solid #00000030;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

type Props = {
  children: React.ReactNode;
};

export default function ClientCard({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
