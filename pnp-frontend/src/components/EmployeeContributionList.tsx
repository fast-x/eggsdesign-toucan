import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProjectContribution, ProjectContributionContent } from './Contribution';
import { FormattedText } from './FormattedText';
import useTranslation from '../utils/i18n/useTranslation';
import { ProjectContribution as ProjectContributionType } from '../types/Project';
import WithTranslationView from './layouts/WithTranslationView';
import { Heading2, Heading3, Label } from './Typography';

type Props = {
  projects: ProjectContributionType[];
};

const labels = {
  contribution: {
    en: 'Contribution in project',
    nb: 'Bidrag i prosjekt',
  },
};

export const EmployeeContributionList: React.FC<Props> = ({ projects }) => {
  const { localeString } = useTranslation();

  if (!projects || projects.length === 0) return null;

  // Show projects with contribution text at the top
  const sortedProjects = projects
    .slice() // Returns a new copy
    .sort((a, b) => {
      if (!a._updatedAt && !!b._updatedAt) return -1;
      if (!!a._updatedAt && !b._updatedAt) return 1;
      if (!a._updatedAt || !b._updatedAt) return 0;

      return a._updatedAt > b._updatedAt ? -1 : 1;
    });

  return (
    <List>
      {sortedProjects.map((project) => {
        const coverImageURL = project.images?.[0]?.url && `${project.images[0].url}?h=400`;

        return (
          <ContributionListItem key={project._id}>
            <ProjectContribution
              imageURL={coverImageURL}
              to={project._id ? `/projects/project/${project._id}` : '#'}
              isExternal={project?.isNonCompanyProject || false}>
              <ProjectContributionContent>
                <Label>{project?.client?.name}</Label>
                <label>
                  <ContributionHeader>
                    <Link to={project._id ? `/projects/project/${project._id}` : '#'}>
                      {localeString(project.title)}
                    </Link>
                  </ContributionHeader>
                </label>

                <FormattedText className="contribution-description">
                  <WithTranslationView translation={project.description}>
                    {(description) => (description.length ? <BlockContent blocks={description[0]} /> : null)}
                  </WithTranslationView>
                  <WithTranslationView translation={project.employeeDescription?.contribution}>
                    {(contribution) => (
                      <>
                        <Heading3>{localeString(labels.contribution)}</Heading3>
                        <BlockContent blocks={contribution} />
                      </>
                    )}
                  </WithTranslationView>
                </FormattedText>
              </ProjectContributionContent>
            </ProjectContribution>
          </ContributionListItem>
        );
      })}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 40px;

  @media print {
    position: relative;
    display: block;
    --print-columns: 3;
    --print-rows: 1;

    & > li {
      float: left;
      margin-top: 20pt;
      overflow: hidden;

      width: calc((100% / var(--print-columns)) - 20px);
      height: calc(90vh / var(--print-rows));

      position: relative;
      page-break-inside: avoid;
      break-inside: avoid-page;

      /* Gutter between rows (except for the row furthest to the right) */
      &:not(:nth-of-type(3n)) {
        margin-right: 30px;
      }

      &:nth-of-type(3n + 1) {
        clear: left;
      }
    }
  }

  .contribution-description p {
    @media print {
      font-size: 1rem;
    }
  }

  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContributionHeader = styled(Heading2)`
  margin-top: 0;

  a,
  a:visited {
    text-decoration: inherit;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ContributionListItem = styled.li`
  @media print {
    label,
    input {
      display: none;
    }

    &.no-print {
      display: none;
    }
  }
`;
