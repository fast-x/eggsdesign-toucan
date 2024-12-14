import React, { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import CardGridUtilities from '../components/cards/CardGridUtilities';
import { EmployeeCard } from '../components/cards/EmployeeCard';
import { ErrorMessage } from '../components/ErrorMessage';
import Filters from '../components/filters/Filters';
import { urlSearchParamsToFilters } from '../components/filters/helpers';
import { AppContainer, CardGrid, PageWidth, Row, Sidebar, Stack, StickySection } from '../components/Layout';
import LoadingIndicator from '../components/LoadingIndicator';
import { Heading1, Paragraph } from '../components/Typography';
import FeatureContext from '../contexts/FeatureContext';
import LanguageContext from '../contexts/LanguageContext';
import useGetEmployees from '../hooks/api/useGetEmployees';
import { testFilter } from '../testFilter';
import Employee from '../types/Employee';
import MobileNavDrawer from '../components/drawer/mobileNavDrawer';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import placeholderImg from '../assets/img/placeholder.png';
import useTranslation from '../utils/i18n/useTranslation';

const labels = {
  noResults: {
    en: 'Sorry, no results matched your search criteria',
    nb: 'Beklager, ingen resultater samsvarte med søkekriteriene dine',
  },
};

const EmployeesPage = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { localeString } = useTranslation();
  const { features } = useContext(FeatureContext);
  const { data: allEmployeeProfiles, isLoading, error } = useGetEmployees();
  const [searchParams] = useSearchParams();
  const filteredProfiles = useMemo<Employee[]>(() => {
    if (!allEmployeeProfiles) return [];

    const filterTypes = urlSearchParamsToFilters(searchParams);

    let newEmployeeProfiles = allEmployeeProfiles;
    filterTypes.forEach((filter) => {
      if (filter.selectedOptions && filter.selectedOptions.length > 0) {
        newEmployeeProfiles = newEmployeeProfiles?.filter((item) => testFilter(filter, item));
      }
    });

    return [...new Set(newEmployeeProfiles)];
  }, [allEmployeeProfiles, currentLanguage, searchParams]);

  const employeeProfiles = filteredProfiles !== undefined ? filteredProfiles : allEmployeeProfiles;

  if (isLoading) {
    return (
      <AppContainer>
        <PageWidth>
          <LoadingIndicator />
        </PageWidth>
      </AppContainer>
    );
  }

  if (!allEmployeeProfiles || error) {
    return (
      <ErrorMessage
        title="Could not fetch employees"
        description="Please use the Report Bug button to report this, if this is a bug."
      />
    );
  }

  return (
    <AppContainer>
      <Helmet>
        <title>People | Yolk Dashboard</title>
      </Helmet>

      <MobileNavDrawer
        label={
          <>
            <span>{currentLanguage === 'en' ? 'Filters' : 'Filtere'}</span>
            <MixerHorizontalIcon />
          </>
        }
        buttonLabel="Apply">
        {features.searchFilters && (allEmployeeProfiles as Employee[]).length > 0 && (
          <Filters data={allEmployeeProfiles} usage="people" />
        )}
      </MobileNavDrawer>

      <PageWidth>
        <Row>
          {features.searchFilters && (
            <Sidebar hideMobile>
              <StickySection>
                {(allEmployeeProfiles as Employee[]).length > 0 && (
                  <Filters data={allEmployeeProfiles} usage="people" />
                )}
              </StickySection>
            </Sidebar>
          )}

          {employeeProfiles && employeeProfiles.length > 0 ? (
            <Stack gap="0px" style={{ flex: '1' }}>
              <CardGridUtilities
                visibleEntries={employeeProfiles.length}
                totalEntries={(allEmployeeProfiles as Employee[]).length}
              />
              <CardGrid>{employeeProfiles && <EmployeeCardsList employees={employeeProfiles} />}</CardGrid>
            </Stack>
          ) : (
            <h2>{localeString(labels.noResults)}</h2>
          )}
        </Row>
      </PageWidth>
    </AppContainer>
  );
};

export default EmployeesPage;

const EmployeeCardsList = ({ employees }: { employees: Employee[] }): React.ReactElement => (
  <>
    {employees.length > 0 &&
      employees.map((employee) => {
        const { title, roles, image, _id, firstName, lastName, level, offices, competences } = employee;

        return (
          <EmployeeCard to={`../people/${_id ?? ''}`} img={`${image?.url ?? placeholderImg}?h=340`} key={_id}>
            <Heading1>
              {firstName} {lastName}
            </Heading1>
            <Paragraph>
              {`${
                title ||
                `
                ${competences?.[0]?.name ?? ''} 
                ${level?.name?.en ?? ''} 
                ${roles?.reduce((acc, role) => `${acc} ${role}`, '') ?? ''}
                `
              } 
              ${offices?.length ? `in ${offices[0]?.name ?? ''}` : ''}`}
            </Paragraph>
          </EmployeeCard>
        );
      })}
  </>
);
