/* eslint-disable-next-line */
// @ts-nocheck

import BlockContent from '@sanity/block-content-to-react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedText } from '../components/FormattedText';
import { GotoPersonLabel } from '../components/GotoPersonLabel';
import { AppContainer, PageWidth, Row, Sidebar, StickySection } from '../components/Layout';
import { colors } from '../components/styles';
import { TagList } from '../components/TagList';
import { Heading1, Heading2, Heading3, Ingress, Paragraph } from '../components/Typography';
import LanguageContext from '../contexts/LanguageContext';
import { parseTimestamp } from '../helpers';
import { ErrorMessage } from '../components/ErrorMessage';
import useGetApproach from '../hooks/api/useGetApproach';
import LoadingIndicator from '../components/LoadingIndicator';

const labels = {
  content: {
    en: 'Content',
    nb: 'Inhold',
  },
  links: {
    en: 'Links',
    nb: 'Lenker',
  },
  updated: {
    en: 'Updated',
    nb: 'Oppdatert',
  },
  ingress: {
    en: 'Description',
    nb: 'Beskrivelse',
  },
  description: {
    en: 'The approach',
    nb: 'Tilnærmingen',
  },
  gotoPerson: {
    en: 'Go-to person',
    nb: 'Ansvarsperson',
  },
  competence: {
    en: 'Competences',
    nb: 'Kompetanseområder',
  },
};

export default function ApproachPage() {
  const { currentLanguage } = useContext(LanguageContext);
  const { id } = useParams<{ id: string }>();
  const { data: approach, isLoading, error } = useGetApproach(id ?? '');

  if (isLoading) return <LoadingIndicator />;

  if (error || !approach) {
    return <ErrorMessage title="Could not find approach" description="Sorry but no approach could be fetched" />;
  }

  const { name, gotoPerson, competence, images, ingress, description } = approach;

  if (Object.values(approach).length === 0) {
    return (
      <AppContainer>
        <PageWidth>
          <Heading1>Oops</Heading1>
          <Paragraph>Approach does not exist</Paragraph>
        </PageWidth>
      </AppContainer>
    );
  }

  // noinspection HtmlUnknownAnchorTarget
  return (
    <AppContainer>
      <Helmet>
        <title>{name?.[currentLanguage] || 'No title'} | Yolk Dashboard</title>
      </Helmet>
      <PageWidth>
        <Row>
          <Sidebar>
            <StickySection>
              <Heading3 className="index-heading">{labels.content[currentLanguage]}</Heading3>
              <IndexList>
                {ingress && (
                  <li>
                    <a className="index-list-link" href="#ingress">
                      {labels.ingress[currentLanguage]}
                    </a>
                  </li>
                )}
                {description && (
                  <li>
                    <a className="index-list-link" href="#description">
                      {labels.description[currentLanguage]}
                    </a>
                  </li>
                )}
                {competence && (
                  <li>
                    <a className="index-list-link" href="#competence">
                      {labels.competence[currentLanguage]}
                    </a>
                  </li>
                )}
              </IndexList>
              {gotoPerson && (
                <>
                  <Heading3 className="index-heading">{labels.gotoPerson[currentLanguage]}</Heading3>
                  {gotoPerson.image && gotoPerson.image.url && (
                    <GotoPersonLabel
                      to={`../../people/${String(gotoPerson._id)}`}
                      img={gotoPerson.image && `${String(gotoPerson.image.url)}?h=340`}>
                      <Paragraph>
                        {gotoPerson.firstName} {gotoPerson.lastName}
                      </Paragraph>
                    </GotoPersonLabel>
                  )}
                </>
              )}
              {labels.links && <Heading3 className="index-heading">{labels.links[currentLanguage]}</Heading3>}
              <Heading3 className="index-heading">{labels.updated[currentLanguage]}</Heading3>
              <Paragraph>{parseTimestamp(approach._updatedAt, 'eee dd MMM yyyy H:mm')}</Paragraph>
            </StickySection>
          </Sidebar>
          <ApproachContent>
            <Header>
              {images && (
                <MainImageContainer className="main-image-container">
                  <img className="main-image" src={images[0].url} alt="" />
                </MainImageContainer>
              )}
              <IngressSection id="ingress" className="ingress-section">
                <Heading1>{name[currentLanguage] || 'No title in current language'}</Heading1>
                {(ingress && ingress[currentLanguage] && (
                  <Ingress>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <BlockContent blocks={ingress[currentLanguage] || description[0]} />
                  </Ingress>
                )) ||
                  'No text in chosen language'}
              </IngressSection>
            </Header>
            <ApproachSection>
              <Heading2 id="description">{labels.description[currentLanguage]}</Heading2>
              {(description && description[currentLanguage] && (
                <FormattedText>
                  <BlockContent blocks={description[currentLanguage]} />
                </FormattedText>
              )) ||
                'No text in chosen language'}
            </ApproachSection>
            <ApproachSection>
              <Heading2 id="competence">{labels.competence[currentLanguage]}</Heading2>
              <TagList>{competence && competence.map((c) => <li key={c.name}>{c.name}</li>)}</TagList>
            </ApproachSection>
          </ApproachContent>
        </Row>
      </PageWidth>
    </AppContainer>
  );
}

const ApproachContent = styled.div``;

const IndexList = styled.ul`
  list-style: none;
  padding: 0;

  & > li {
    margin-bottom: 0.5rem;
  }

  .index-list-link {
    color: ${colors.neutral1};

    :visited {
      color: ${colors.neutral1};
    }
  }
`;

const ApproachSection = styled.div`
  margin-bottom: 3rem;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;

  .main-image-container {
    flex: 1;
  }

  .ingress-section {
    flex: 2;
  }
`;

const IngressSection = styled.div``;

const MainImageContainer = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  margin-right: 2rem;

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
  }
`;
