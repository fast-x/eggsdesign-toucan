import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { CardTag, CardTitle, CaseCard } from '../components/cards/CaseCard';
import { AppContainer, CardGrid, PageWidth, Row } from '../components/Layout';
import LoadingIndicator from '../components/LoadingIndicator';
import useGetApproaches from '../hooks/api/useGetApproaches';
import LanguageContext from '../contexts/LanguageContext';
import { ErrorMessage } from '../components/ErrorMessage';

const ApproachesPage = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { data: allApproaches, error, isLoading } = useGetApproaches();

  if (isLoading) return <LoadingIndicator />;

  if (error || !allApproaches) {
    return <ErrorMessage title="Could not find approaches" description="Sorry but no approaches could be fetched" />;
  }

  return (
    <AppContainer>
      <Helmet>
        <title>Approaches | Yolk Dashboard</title>
      </Helmet>

      <PageWidth>
        <Row>
          <CardGrid>
            {allApproaches.map((approach) => (
              <CaseCard
                to={`../approaches/approach/${approach._id}`}
                key={approach._id}
                img={approach.images?.length > 0 ? approach.images[0].url : undefined}
                imageColor={approach.images && approach.images[0].color.background}
                textColor={approach.images && approach.images[0].color.foreground}>
                <CardTitle>{approach.name[currentLanguage]}</CardTitle>
                {approach?.competence?.map((competence) => (
                  <CardTag key={competence._id}>{competence.name}</CardTag>
                ))}
              </CaseCard>
            ))}
          </CardGrid>
        </Row>
      </PageWidth>
    </AppContainer>
  );
};

export default ApproachesPage;
