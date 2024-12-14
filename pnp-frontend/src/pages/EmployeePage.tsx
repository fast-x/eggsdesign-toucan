import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import { AppContainer, MainColumn, PageWidth } from '../components/Layout';
import { TagList } from '../components/TagList';
import { Button, LinkButton } from '../components/input/Button';
import { BigParagraph, Heading1, Heading2 } from '../components/Typography';
import { EmployeeContributionList } from '../components/EmployeeContributionList';
import { ErrorMessage } from '../components/ErrorMessage';
import { ModalExportCV } from '../components/modal/ModalExportCV';
import LanguageContext from '../contexts/LanguageContext';
import Table from '../components/Table';
import { Helmet } from 'react-helmet';
import useGetEmployee from '../hooks/api/useGetEmployee';
import LoadingIndicator from '../components/LoadingIndicator';
import { ProjectContribution as ProjectContributionType } from '../types/Project';

const labels = {
  skills: {
    en: 'Personal skills',
    nb: 'Personlige ferdigheter',
  },
  approaches: {
    en: 'Approaches',
    nb: 'Faglige tilnærminger',
  },
  description: {
    en: 'Description',
    nb: 'Beskrivelse',
  },
  education: {
    en: 'Education',
    nb: 'Utdanning',
  },
  workhistory: {
    en: 'Work history',
    nb: 'Arbeidshistorikk',
  },
  projects: {
    en: 'Projects',
    nb: 'Prosjekter',
  },
  edit: {
    en: 'Edit CV',
    nb: 'Rediger CV',
  },
};

export default function EmployeePage() {
  const { id: employeeId } = useParams<{ id: string }>();
  const { currentLanguage } = useContext(LanguageContext);
  const { data: employee, error, isLoading } = useGetEmployee(employeeId ?? '');
  const {
    title,
    image,
    level,
    skills,
    approaches,
    description,
    projects,
    roles,
    firstName,
    lastName,
    offices,
    competences,
    education,
    workHistory,
  } = employee || {};
  const [wizardModalOpen, setWizardModalOpen] = useState(false);

  // Used when creating a new project directly from the Employee page; where it automatically makes the employee part of the project
  const preFilledFields = JSON.stringify({
    employees: [{ participant: { _ref: employeeId }, type: 'object', _key: '0' }],
  });

  const openWizardModal = () => setWizardModalOpen(true);
  const closeWizardModal = () => setWizardModalOpen(false);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return (
      <ErrorMessage
        title="Could not fetch employee"
        description="Please use the Report Bug button to report this, if this is a bug."
      />
    );
  }
  if (employee === null && !isLoading) {
    return (
      <ErrorMessage
        title="Could not find employee"
        description="Sorry but no employee could be found with the given ID."
      />
    );
  }

  const employeeTitle = `${
    title ||
    `${competences ? String(competences?.[0]?.name) : ''} ${String(level?.name?.en)},
      ${roles && roles.length > 0 ? roles.map((role) => ` ${role}`).join(', ') : ''}`
  } ${offices && offices.length > 0 ? `in ${String(offices[0]?.name)}` : ''}`;

  return (
    <AppContainer>
      <Helmet>
        <title>
          {firstName} {lastName} CV
        </title>
      </Helmet>

      <FirstPage>
        <PageHeader>
          <MainColumn>
            <Heading1 style={{ marginTop: '.4em' }}>
              {firstName} {lastName}
            </Heading1>
            <div style={{ marginBottom: '2em' }}>{employeeTitle}</div>
            <ActionRow>
              <LinkButton type="button" title="Edit document" to="edit">
                {labels.edit[currentLanguage]}
              </LinkButton>

              <Button type="button" onClick={openWizardModal} variant="secondary">
                Export to PDF
              </Button>

              {wizardModalOpen && employee && <ModalExportCV employee={employee} closeModal={closeWizardModal} />}
            </ActionRow>

            {description && (
              <BigParagraph>
                <BlockContent blocks={description[currentLanguage]} />
              </BigParagraph>
            )}
          </MainColumn>
          <EmployeeProfilePicture>{image && <img src={image.url} alt="" />}</EmployeeProfilePicture>
        </PageHeader>
      </FirstPage>
      <PageWidth>
        {skills && skills?.length > 0 && (
          <>
            <Heading2>{labels.skills[currentLanguage]}</Heading2>
            <TagList>
              {skills.map((skill) => (
                <li key={skill[currentLanguage]}>{skill[currentLanguage] || 'Untitled'}</li>
              ))}
            </TagList>
          </>
        )}
        {approaches && approaches.length > 0 && (
          <>
            <Heading2>{labels.approaches[currentLanguage]}</Heading2>
            <TagList>
              {approaches.map(
                (approach) =>
                  approach && <li key={approach._id}>{approach.name?.[currentLanguage] || 'No translated name'}</li>,
              )}
            </TagList>
          </>
        )}
        {education && <Table heading={labels.education[currentLanguage]} history={education} />}
        {workHistory && <Table heading={labels.workhistory[currentLanguage]} history={workHistory} />}
      </PageWidth>
      <PageWidth>
        <section
          style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em', alignItems: 'center' }}>
          <Heading2>{labels.projects[currentLanguage]}</Heading2>
          <LinkButton type="button" to={`/projects/new?fields=${preFilledFields}`}>
            Add project
          </LinkButton>
        </section>
        <ProjectWrap>
          {projects && projects.length && <EmployeeContributionList projects={projects as ProjectContributionType[]} />}
        </ProjectWrap>
      </PageWidth>
    </AppContainer>
  );
}

const PageHeader = styled.section`
  display: grid;
  grid-template-columns: 2.1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: 25% 1fr;
    page-break-after: always;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin-right: 1rem;
  }
`;

const FirstPage = styled(PageWidth)`
  margin-bottom: 20px;
`;

const EmployeeProfilePicture = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: min(100vh, 35vw);
  width: min(100vh, 35vw);
  margin-top: 32px;
  position: sticky;
  top: 32px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  @media print {
    height: 70vh;
    min-width: unset;
  }
`;

const ProjectWrap = styled.div`
  padding-bottom: 80px;
`;
