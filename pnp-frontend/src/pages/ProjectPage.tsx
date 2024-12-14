// noinspection HtmlUnknownAnchorTarget

import BlockContent from '@sanity/block-content-to-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AwardLabel from '../components/AwardLabel';
import { EmployeeContribution, EmployeeContributionContent } from '../components/Contribution';
import { ErrorMessage } from '../components/ErrorMessage';
import { FormattedText } from '../components/FormattedText';
import { ImageSlider, isValidImageForSlider } from '../components/ImageSlider';
import { Button, LinkButton } from '../components/input/Button';
import { AppContainer, MainColumn, PageWidth, Row, Sidebar, SidebarSection, Stack } from '../components/Layout';
import WithTranslationView from '../components/layouts/WithTranslationView';
import LoadingIndicator from '../components/LoadingIndicator';
import { ManagerTag } from '../components/ManagerTag';
import { ModalExportProject } from '../components/modal/ModalExportProject';
import { colors } from '../components/styles';
import { TagList } from '../components/TagList';
import { BigParagraph, Heading1, Heading2, Heading3, Label, Paragraph } from '../components/Typography';
import { parseTimestamp } from '../helpers';
import useGetProject from '../hooks/api/useGetProject';
import useTranslation from '../utils/i18n/useTranslation';

const labels = {
  content: {
    en: 'Content',
    nb: 'Innhold',
  },
  links: {
    en: 'Links',
    nb: 'Lenker',
  },
  updated: {
    en: 'Updated',
    nb: 'Oppdatert',
  },
  description: {
    en: 'Description',
    nb: 'Beskrivelse',
  },
  theproject: {
    en: 'The project',
    nb: 'Om prosjektet',
  },
  theteam: {
    en: 'The team',
    nb: 'Prosjektdeltakere',
  },
  domains: {
    en: 'Domains',
    nb: 'Domener',
  },
  approaches: {
    en: 'Approaches',
    nb: 'Tilnærminger',
  },
  edit: {
    en: 'Edit project',
    nb: 'Rediger prosjekt',
  },
  visibility: {
    en: 'Visibility',
    nb: 'Synlighetsnivå',
  },
  resources: {
    en: 'Resources',
    nb: 'Ressurser',
  },
  projectManager: {
    en: 'Project manager',
    nb: 'Prosjektleder',
  },
  budget: {
    en: 'Budget',
    nb: 'Budsjett',
  },
  period: {
    en: 'Period',
    nb: 'Perioden',
  },
  awards: {
    en: 'Awards',
    nb: 'Priser',
  },
  missingName: {
    en: 'No title has been filled in',
    nb: 'Ingen tittel er fylt ut',
  },
  noSpecifiedContribution: {
    en: 'No specified contribution',
    nb: 'Ingen spesifisert bidrag',
  },
  errorTitle: {
    en: 'Could not fetch project',
    nb: 'Kunne ikke hente prosjektet',
  },
  errorDescription: {
    en: 'Please use the Report Bug button to report this, if this is a bug.',
    nb: 'Vennligst bruk Rapporter feil-knappen for å rapportere dette, hvis dette er en feil.',
  },
  externalTitle: {
    en: 'External project',
    nb: 'Eksternt prosjekt',
  },
  externalDescription: {
    en: 'This is a project done outside of EGGS employment',
    nb: 'Dette er et prosjekt gjort utenfor EGGS-ansettelse',
  },
  exportPDF: {
    en: 'Export PDF',
    nb: 'Eksporter PDF',
  },
};

export default function ProjectPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const { localeString } = useTranslation();
  const [showExportModal, setShowExportModal] = useState(false);
  const { data: project, error, isLoading } = useGetProject(projectId ?? '');

  const {
    images,
    title,
    client,
    employees,
    description,
    longtext,
    approaches,
    domains,
    visibility,
    links,
    monetaryBudget,
    hourBudget,
    startYear,
    endYear,
    awards,
  } = project || {};

  if (isLoading) {
    return (
      <AppContainer>
        <PageWidth>
          <LoadingIndicator />
        </PageWidth>
      </AppContainer>
    );
  }

  if (error || !project) {
    return <ErrorMessage title={localeString(labels.errorTitle)} description={localeString(labels.errorDescription)} />;
  }

  const updatedTimestamp = project.lastUpdated?.timestamp || project._updatedAt;
  const updatedUsername = project.lastUpdated?.username;

  return (
    <AppContainer>
      <Helmet>
        <title>{localeString(title, 'Project')} | Yolk Dashboard</title>
      </Helmet>

      <PageWidth>
        <Row>
          <Sidebar>
            <SidebarSection>
              <Stack gap="8px">
                <LinkButton type="button" to="edit">
                  {localeString(labels.edit)}
                </LinkButton>
                <Button type="button" variant="secondary" onClick={() => setShowExportModal(true)}>
                  {localeString(labels.exportPDF)}
                </Button>
                {showExportModal && (
                  <ModalExportProject project={project} closeModal={() => setShowExportModal(false)} />
                )}
              </Stack>
            </SidebarSection>

            <SidebarSection>
              <Heading3 className="index-heading">{localeString(labels.updated)}</Heading3>
              <Paragraph>
                {updatedTimestamp && <span>{parseTimestamp(updatedTimestamp, 'eee dd MMM yyyy H:mm')}</span>}
                {updatedUsername && <UpdateAuthor title={updatedUsername}>by {updatedUsername}</UpdateAuthor>}
              </Paragraph>

              <Heading3 className="index-heading">{localeString(labels.content)}</Heading3>
              <IndexList>
                {description && (
                  <li key="description">
                    <a href="#description">{localeString(labels.description)}</a>
                  </li>
                )}
                {longtext && (
                  <li key="longtext">
                    <a href="#the-project">{localeString(labels.theproject)}</a>
                  </li>
                )}
                {approaches && (
                  <li key="approaches">
                    <a href="#approaches">{localeString(labels.approaches)}</a>
                  </li>
                )}
                {employees && (
                  <li key="employees">
                    <a href="#the-team">{localeString(labels.theteam)}</a>
                  </li>
                )}
              </IndexList>

              {awards && (
                <>
                  <Heading3 className="index-heading">{localeString(labels.awards)}</Heading3>
                  <AwardsList>
                    {awards.map((award, index) => {
                      if (!award) {
                        return (
                          <li key={`award-${index + 1 ?? ''}`} className="award-list-item">
                            {localeString(labels.missingName)}
                          </li>
                        );
                      }
                      if (award.image) {
                        return (
                          <li key={award._id} className="award-list-item">
                            <AwardLabel imageURL={`${award.image.url ?? ''}?h=340`}>{award.name}</AwardLabel>
                          </li>
                        );
                      }
                      return (
                        <li key={award._id} className="award-list-item">
                          {award.name}
                        </li>
                      );
                    })}
                  </AwardsList>
                </>
              )}

              {visibility && (
                <>
                  <Heading3 className="index-heading">{localeString(labels.visibility)}</Heading3>
                  <Paragraph>{visibility}</Paragraph>
                </>
              )}

              {(monetaryBudget || hourBudget) && (
                <>
                  <Heading3 className="index-heading">{localeString(labels.budget)}</Heading3>
                  {monetaryBudget && monetaryBudget?.amount > 0 && (
                    <Paragraph>{`${monetaryBudget?.amount} ${
                      monetaryBudget.currency && monetaryBudget.currency
                    } excl. VAT`}</Paragraph>
                  )}
                  {hourBudget && <Paragraph>{`${hourBudget} hours`}</Paragraph>}
                </>
              )}

              {(startYear || endYear) && (
                <>
                  <Heading3 className="index-heading">{localeString(labels.period)}</Heading3>
                  <Paragraph>
                    {(startYear && <span>{parseTimestamp(startYear, 'MMM yyyy')}</span>) || '...'} -{' '}
                    {(endYear && <span>{parseTimestamp(endYear, 'MMM yyyy')}</span>) || '...'}
                  </Paragraph>
                </>
              )}

              {links && (
                <>
                  <Heading3 className="index-heading">{localeString(labels.links)}</Heading3>
                  <LinkList>
                    {links.map((link, key) =>
                      !link ? null : (
                        <li key={typeof link?._key === 'string' ? link._key : `link-${key}`} className="link-list-item">
                          <a href={link.URL}>
                            <Paragraph>{link.name}</Paragraph>
                          </a>
                        </li>
                      ),
                    )}
                  </LinkList>
                </>
              )}
            </SidebarSection>
          </Sidebar>

          <MainColumn>
            {project.isNonCompanyProject && (
              <WarningBox>
                <Heading3>{localeString(labels.externalTitle)}</Heading3>
                <Paragraph>{localeString(labels.externalDescription)}</Paragraph>
              </WarningBox>
            )}

            {images && images.length > 0 && (
              <Header>
                <ImageSlider images={images.filter(isValidImageForSlider)} />
              </Header>
            )}

            <ProjectSection id="description">
              <Label>{client}</Label>
              <Heading1>{localeString(title, 'No title in current language')}</Heading1>

              <WithTranslationView translation={description}>
                {(translatedDescription) => (
                  <BigParagraph>
                    <BlockContent blocks={translatedDescription} />
                  </BigParagraph>
                )}
              </WithTranslationView>

              {domains && (
                <TagList>
                  {domains
                    .filter((domain) => !!domain)
                    .map((domain, index) => (
                      <li key={domain?._id ?? `tag-${index}`}>{domain?.name ?? '-'}</li>
                    ))}
                </TagList>
              )}
            </ProjectSection>

            <WithTranslationView translation={longtext}>
              {(translatedLongtext) => (
                <ProjectSection>
                  <FormattedText>
                    <BlockContent blocks={translatedLongtext} />
                  </FormattedText>
                </ProjectSection>
              )}
            </WithTranslationView>

            {approaches && approaches?.length > 0 && (
              <ProjectSection>
                <Heading2 id="approaches">{localeString(labels.approaches)}</Heading2>
                <TagList>
                  {approaches.map((approach, index) => {
                    if (!approach) return <li key={`appro-${index}`}>{localeString(labels.missingName)}</li>;
                    return <li key={approach?._id ?? `appro-${index}`}>{localeString(approach.name)}</li>;
                  })}
                </TagList>
              </ProjectSection>
            )}

            <ProjectSection>
              <Heading2 id="the-team">{localeString(labels.theteam)}</Heading2>
              <EmployeeContributionList>
                {employees &&
                  employees
                    .sort((employee) => (!employee ? 0 : employee.memberRole === 'project-manager' ? -1 : 1))
                    .map((employee, index) => {
                      if (!employee || !employee.participant) return false;
                      const { participant, _key = null, contribution = null, memberRole = null } = employee;
                      return (
                        <li key={typeof _key === 'string' ? _key : `emp-${index}`}>
                          <EmployeeContribution
                            imageURL={`${participant.imageURL ?? ''}?h=400`}
                            to={`/people/${participant._id ?? ''}`}>
                            <EmployeeContributionContent>
                              {memberRole === 'project-manager' && (
                                <ManagerTag>{localeString(labels.projectManager)}</ManagerTag>
                              )}
                              <Heading1 style={{ margin: '0px' }}>
                                {participant.firstName} {participant.lastName}
                              </Heading1>
                              <Heading3>
                                {participant?.type && participant.type !== 'employee' && (
                                  <AlumniText>{`${participant.type} | `}</AlumniText>
                                )}
                                {participant.title}
                              </Heading3>
                              <WithTranslationView translation={contribution}>
                                {(translatedContribution) =>
                                  translatedContribution.length > 0 ? (
                                    <BlockContent className="contribution-text" blocks={translatedContribution} />
                                  ) : (
                                    <Paragraph className="contribution-placeholder">
                                      {localeString(labels.noSpecifiedContribution)}
                                    </Paragraph>
                                  )
                                }
                              </WithTranslationView>
                            </EmployeeContributionContent>
                          </EmployeeContribution>
                        </li>
                      );
                    })}
              </EmployeeContributionList>
            </ProjectSection>
          </MainColumn>
        </Row>
      </PageWidth>
    </AppContainer>
  );
}

const WarningBox = styled.div`
  padding: 0.8em 0.8em;
  margin-bottom: 1em;
  border-radius: 8px;
  background: ${colors.secondary3}22;
  color: ${colors.secondary3};
  border: 1px solid ${colors.secondary3}33;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 0;
    line-height: 1;
  }
`;

const IndexList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${colors.neutral1};

    :visited {
      color: ${colors.neutral1};
    }
  }
`;

const AwardsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  .award-list-item {
    margin-bottom: 0.5rem;
  }
`;

export const UpdateAuthor = styled.span`
  word-break: keep-all;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  .link-list-item {
    margin-bottom: 0.5rem;
  }

  .link-list-item a {
    color: ${colors.primary4};
  }
`;

const ProjectSection = styled.div`
  margin-bottom: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2rem;
`;

const EmployeeContributionList = styled.ul`
  display: flex;
  flex-direction: column;

  list-style: none;
  padding: 0;
  margin: 0;

  /* To make sure children are equal height */

  li > * {
    height: 100%;
  }
`;

const AlumniText = styled.span`
  text-transform: capitalize;
`;
