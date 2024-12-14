import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { PageWidth, AppContainer, Columns } from '../components/Layout';
import { Heading1, Heading3 } from '../components/Typography';
import MainCategoryCard from '../components/cards/MainCategoryCard';
import People from '../assets/img/People.png';
import Projects from '../assets/img/Projects.png';
import Approaches from '../assets/img/Approaches.png';
import Handbook from '../components/Handbook';
import { colors } from '../components/styles';

const Dashboard: React.FunctionComponent = () => {
  return (
    <AppContainer>
      {/* Main categories */}
      <PageWidth>
        <Columns columns={3}>
          <MainCategoryCard
            title="People"
            description="Collection of all employees, their skills, CVs, images and projects"
            link="./people"
            imageURL={People}
          />
          <MainCategoryCard
            title="Projects"
            description="Collection of all project cases"
            link="./projects"
            imageURL={Projects}
          />
          <MainCategoryCard
            title="Approaches"
            description="All EGGS’ ways to provide value to projects something something"
            link="./approaches"
            imageURL={Approaches}
          />
        </Columns>
      </PageWidth>
      <HandbooksSection>
        <PageWidth>
          <Heading1>Handbooks</Heading1>
          <Heading3>Things you need to know</Heading3>
          <BookRow>
            <Handbook title="Office routines" bookColor={colors.secondary2} />
            <Handbook title="Office routines" bookColor={colors.secondary2} />
            <Handbook title="Office routines" bookColor={colors.secondary2} />
            <Handbook title="Office routines" bookColor={colors.secondary2} />
          </BookRow>
        </PageWidth>
      </HandbooksSection>

      {/* Handbooks */}
      {/* Resources */}
      {/* Apps */}
    </AppContainer>
  );
};

export default Dashboard;

const HandbooksSection = styled.div`
  display: flex;
  padding: 20px 0 56px;
  margin-top: 80px;
  background-color: ${transparentize(0.8, colors.neutral3)};
  overflow: scroll;
`;

const BookRow = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
`;
