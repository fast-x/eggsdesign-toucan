import React, { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import CardGridUtilities from '../components/cards/CardGridUtilities';
import { CardClientName, CardTag, CardTitle, CaseCard } from '../components/cards/CaseCard';
import MobileNavDrawer from '../components/drawer/mobileNavDrawer';
import { ErrorMessage } from '../components/ErrorMessage';
import Filters from '../components/filters/Filters';
import { urlSearchParamsToFilters } from '../components/filters/helpers';
import { LinkButton } from '../components/input/Button';
import {
  AppContainer,
  CardGrid,
  MobileWindow,
  PageWidth,
  Row,
  Sidebar,
  SidebarSection,
  Stack,
  StickySection,
} from '../components/Layout';
import LoadingIndicator from '../components/LoadingIndicator';
import FeatureContext from '../contexts/FeatureContext';
import LanguageContext from '../contexts/LanguageContext';
import useGetProjects from '../hooks/api/useGetProjects';
import { testFilter } from '../testFilter';
import Project from '../types/Project';
import useTranslation from '../utils/i18n/useTranslation';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import placeholderImg from '../assets/img/placeholder.png';

const labels = {
  projects: {
    en: 'Projects',
    nb: 'Prosjekter',
  },
  search: {
    en: 'Search project',
    nb: 'Søk prosjekt',
  },
  new: {
    en: 'Create new',
    nb: 'Lag ny',
  },
  errorTitle: {
    en: 'Could not load projects',
    nb: 'Kunne ikke hente prosjekter',
  },
  errorDescription: {
    en: 'An error occurred so projects could not be fetched. First try to refresh the page, or file a bug if the problem persists.',
    nb: 'Det oppsto en feil slik at prosjekter ikke kunne hentes. Prøv først å oppdatere siden, eller send en feil hvis problemet vedvarer.',
  },
  noResults: {
    en: 'Sorry, no results matched your search criteria',
    nb: 'Beklager, ingen resultater samsvarte med søkekriteriene dine',
  },
};

export default function ProjectsPage(): React.ReactElement {
  const { currentLanguage } = useContext(LanguageContext);
  const { features } = useContext(FeatureContext);
  const { localeString } = useTranslation();

  const { data: allProjectCases, isLoading, error } = useGetProjects();
  const [searchParams] = useSearchParams();
  const filteredProjectCases = useMemo<Project[]>(() => {
    if (!allProjectCases) return [];

    const filterTypes = urlSearchParamsToFilters(searchParams);
    let newProjectCases = allProjectCases;
    filterTypes.forEach((filter) => {
      if (filter.selectedOptions && filter.selectedOptions.length > 0) {
        newProjectCases = newProjectCases?.filter((item) => testFilter(filter, item));
      }
    });

    return [...new Set(newProjectCases)];
  }, [allProjectCases, searchParams]);

  if (isLoading) {
    return (
      <AppContainer>
        <PageWidth>
          <LoadingIndicator />
        </PageWidth>
      </AppContainer>
    );
  }

  if (error || !allProjectCases) {
    return <ErrorMessage title={localeString(labels.errorTitle)} description={localeString(labels.errorDescription)} />;
  }

  return (
    <AppContainer>
      <Helmet></Helmet>

      <MobileNavDrawer
        label={
          <>
            <span>{currentLanguage === 'en' ? 'Filters' : 'Filtere'}</span>
            <MixerHorizontalIcon />
          </>
        }
        buttonLabel="Apply">
        {allProjectCases && allProjectCases.length > 0 && <Filters data={allProjectCases} usage="projects" />}
      </MobileNavDrawer>

      <PageWidth>
        <Row>
          {features.searchFilters && (
            <Sidebar hideMobile>
              <StickySection>
                {allProjectCases && allProjectCases.length > 0 && <Filters data={allProjectCases} usage="projects" />}

                {features.contentEditing && (
                  <SidebarSection>
                    <LinkButton to="new">{localeString(labels.new)}</LinkButton>
                  </SidebarSection>
                )}
              </StickySection>
            </Sidebar>
          )}

          {filteredProjectCases && filteredProjectCases.length > 0 ? (
            <Stack gap="0px" style={{ flex: '1' }}>
              <CardGridUtilities
                visibleEntries={filteredProjectCases.length}
                totalEntries={allProjectCases?.length || 0}
              />
              {features.contentEditing && (
                <MobileWindow>
                  <LinkButton to="new" style={{ marginBottom: '15px' }}>
                    {localeString(labels.new)}
                  </LinkButton>
                </MobileWindow>
              )}
              <CardGrid>
                <ProjectCardList projects={filteredProjectCases} />
              </CardGrid>
            </Stack>
          ) : (
            <h2>{localeString(labels.noResults)}</h2>
          )}
        </Row>
      </PageWidth>
    </AppContainer>
  );
}

const ProjectCardList = ({ projects }: { projects: Project[] }): React.ReactElement => {
  const { localeString } = useTranslation();
  return (
    <>
      {projects.map((projectCase) => {
        const { title, client, images, competences, _id } = projectCase;
        const hasImages = images && images.length > 0 && images[0];
        const translatedTitle = localeString(title, 'Project without title');

        return (
          <CaseCard
            to={`../projects/project/${projectCase._id ?? ''}`}
            img={hasImages ? `${images[0].url ?? placeholderImg}?h=400` : undefined}
            textColor={(hasImages && images[0]?.color?.foreground) || '#000000'}
            imageColor={(hasImages && images[0]?.color?.background) || '#ffffff'}
            key={`${_id ?? ''}-${translatedTitle}-${client ?? ''}`}>
            <CardClientName>{client}</CardClientName>
            <CardTitle>{translatedTitle}</CardTitle>
            <div>
              {competences &&
                competences.map((competence) => (
                  <CardTag key={`${projectCase._id ?? ''}-${competence?._id || ''}`}>{competence?.name ?? ''}</CardTag>
                ))}
            </div>
          </CaseCard>
        );
      })}
    </>
  );
};
