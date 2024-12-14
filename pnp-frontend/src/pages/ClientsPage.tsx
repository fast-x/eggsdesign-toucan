import { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CardGridUtilities from '../components/cards/CardGridUtilities';
import ClientCard, { ClientCardContact, ClientCardTitle } from '../components/cards/ClientCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppContainer, CardGrid, PageWidth, Row, Sidebar, Stack, StickySection } from '../components/Layout';
import LoadingIndicator from '../components/LoadingIndicator';
import SimpleSearch from '../components/SimpleSearch';
import { Paragraph } from '../components/Typography';
import useGetClients from '../hooks/api/useGetClients';
import useDebounce from '../hooks/use-debounce';

export default function ClientsPage(): JSX.Element {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query ?? '', 500);
  const { data, error, isLoading } = useGetClients(debouncedQuery);
  const clients = data ?? [];
  const total = clients.length;

  function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  if (isLoading) return <LoadingIndicator />;

  if (error || !data) {
    return <ErrorMessage title="Could not find clients" description="Sorry but no clients could be fetched" />;
  }

  return (
    <AppContainer>
      <Helmet>
        <title>Clients | Yolk Dashboard</title>
      </Helmet>
      <PageWidth>
        <Row>
          <Sidebar mobileStickToBottom>
            <StickySection>
              <SimpleSearch onChange={handleSearch} />

              <Paragraph>
                <strong>Want to add a client?</strong> We are working on implementing that. In the mean time, please
                refer to Eline or Malin.
              </Paragraph>
              {/* <LinkButton to="./clients/new">Create new</LinkButton> */}
            </StickySection>
          </Sidebar>
          {clients && (
            <Stack gap="0px" style={{ flex: '1' }}>
              <CardGridUtilities visibleEntries={clients.length} totalEntries={total ?? 0} />
              <CardGrid>
                {clients.map((client) => (
                  <ClientCard key={client._id}>
                    <ClientCardTitle>{client.name}</ClientCardTitle>
                    {client.clientDJ && (
                      <ClientCardContact>
                        DJ:&nbsp;
                        <Link to={`/people/${String(client.clientDJ._id)}`}>{client.clientDJ.firstName}</Link>
                      </ClientCardContact>
                    )}
                  </ClientCard>
                ))}
              </CardGrid>
            </Stack>
          )}
        </Row>
      </PageWidth>
    </AppContainer>
  );
}
