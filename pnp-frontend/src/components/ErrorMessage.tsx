import React from 'react';
import { AppContainer, PageWidth } from './Layout';
import { Heading1, Paragraph } from './Typography';

interface Props {
  title: string;
  description: string;
}

export const ErrorMessage: React.FC<Props> = ({ title, description }) => {
  return (
    <AppContainer>
      <PageWidth>
        <Heading1>{title}</Heading1>
        <Paragraph>{description}</Paragraph>
      </PageWidth>
    </AppContainer>
  );
};
