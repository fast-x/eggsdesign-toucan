import { useMsal } from '@azure/msal-react';
import React, { useCallback, useEffect, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { createGlobalStyle } from 'styled-components';
import DocumentEditor from '../components/editor/DocumentEditor';
import { Button } from '../components/input/Button';
import {
  AppContainer,
  MainColumn,
  PageWidth,
  Row,
  Sidebar,
  SidebarSection,
  Stack,
  StickySection,
} from '../components/Layout';
import FullPageWarningMessage from '../components/layouts/FullPageWarningMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import { Heading3 } from '../components/Typography';
import { DocumentType } from '../config';
import { parseTimestamp } from '../helpers';
import useGetFilters from '../hooks/api/useGetFilters';
import useScrollToLocation from '../hooks/use-scroll-to-location';
import Employee from '../types/Employee';
import Project from '../types/Project';
import { createDocument, deleteDocument, getDocument, updateDocument } from '../utils/api';
import useTranslation from '../utils/i18n/useTranslation';
import { UpdateAuthor } from './ProjectPage';
import { DocumentSchema } from '../types/Shared';

interface Props {
  schema: DocumentSchema;
  backUrl: string;
}

const labels = {
  lastEdit: {
    en: 'Last edited',
    nb: 'Siste redigering',
  },
  by: {
    en: 'by',
    nb: 'av',
  },
  done: {
    en: 'Done',
    nb: 'Ferdig',
  },
  save: {
    en: 'Save',
    nb: 'Lagre',
  },
  delete: {
    en: 'Delete',
    nb: 'Slett',
  },
};

const EditPage = ({ schema, backUrl }: Props): React.FunctionComponentElement<Props> | null => {
  useScrollToLocation();
  const { localeString } = useTranslation();
  const [rawFields, setRawFields] = useState<Project | Employee | null>();
  const [updatedFields, setUpdatedFields] = useState<Project | Employee | null>();
  const navigate = useNavigate();
  const { data: filterObjects } = useGetFilters();
  const [type, setType] = useState<'project' | 'employee'>();
  const { accounts } = useMsal();

  const { id: documentId } = useParams<{ id: string }>();

  const username = accounts?.length > 0 ? accounts[0].username : '';

  const fetchDocument = useCallback(async () => {
    if (!documentId) return;

    const res = await getDocument<Project | Employee>(documentId);

    if (!res) return;
    setRawFields(res || {});
    setType(res._type);
    setUpdatedFields(null);
  }, [documentId, getDocument]);

  useEffect(() => {
    if (documentId) {
      fetchDocument();
      return;
    }

    setRawFields(null);
    setType(schema.name as unknown as 'project' | 'employee');
  }, [documentId, fetchDocument, schema.name]);

  const onConfirm = (): void => {
    fetchDocument();
  };

  /**
   * Checks document fields for logical errors. For example, a Project Case must contain an employee entry if 'nonCompanyEntry' is set to true.
   *
   * @returns `true` if document fields are valid
   */
  function documentValid(): boolean {
    // TODO: give proper feedback to user when document is invalid.e

    if (updatedFields?._type === DocumentType.PROJECT) {
      const nonCompanyProject =
        updatedFields?.isNonCompanyProject !== undefined
          ? updatedFields?.isNonCompanyProject === true
          : (rawFields as Project)?.isNonCompanyProject === true;
      const hasNoEmployees = !updatedFields?.employees?.[0]?.participant;

      if (nonCompanyProject && hasNoEmployees) {
        window.alert(
          'Missing employees entries – you are trying to add a non-company project, but to do that you also need to add an employee who worked with this project',
        );
        return false;
      }
    }

    return true;
  }

  function handleSave(): void {
    // Validate the updated document
    if (!documentValid()) return;

    const timestamp = new Date().getTime();

    if (documentId) {
      updateDocument(documentId, { ...updatedFields, lastUpdated: { username, timestamp } }).then(() => onConfirm());
    } else {
      // The second "type" parameter refers to employment status, which can also be "alumni" or "associate"
      const employeeType = type === DocumentType.EMPLOYEE ? { type: DocumentType.EMPLOYEE } : null;
      const id = uuid();

      createDocument({ ...updatedFields, _type: type, ...employeeType, _id: id }).then(() => {
        navigate(`/${String(type)}s/${String(type)}/${id}/edit`);
      });
    }
  }

  function handleDelete(): void {
    if (window.confirm('Are you sure you wish to delete this document? It can not be undone.')) {
      deleteDocument(documentId ?? '').then(() => {
        navigate(`/${String(type)}s`);
      });
    }
  }

  if (!filterObjects || !type || !schema) {
    return (
      <FullPageWarningMessage>
        <LoadingIndicator />
      </FullPageWarningMessage>
    );
  }

  const updatedTimestamp =
    rawFields && (rawFields.lastUpdated || rawFields._updatedAt)
      ? String(rawFields?.lastUpdated?.timestamp || rawFields?._updatedAt)
      : undefined;
  const updatedUsername = rawFields?.lastUpdated?.username;

  return (
    <AppContainer>
      <GlobalStyle />
      <PageWidth>
        <Row>
          <Sidebar>
            <StickySection>
              <SidebarSection>
                <Heading3>{localeString(labels.lastEdit)}</Heading3>
                {updatedTimestamp && <span>{parseTimestamp(updatedTimestamp, 'eee dd MMM yyyy H:mm')}</span>}
                {updatedUsername && (
                  <UpdateAuthor title={updatedUsername}>
                    {localeString(labels.by)} {updatedUsername}
                  </UpdateAuthor>
                )}
              </SidebarSection>
              <SidebarSection>
                <Stack gap="16px">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={(): void => {
                      if (!updatedFields) {
                        navigate(generatePath(backUrl, { id: documentId }));
                      } else if (
                        window.confirm('You still have unsaved edits in this document. Are you sure you want to close?')
                      ) {
                        navigate(generatePath(backUrl, { id: documentId }));
                      }
                    }}>
                    {localeString(labels.done)}
                  </Button>
                  <Button disabled={!updatedFields} variant="primary" type="button" onClick={handleSave}>
                    {localeString(labels.save)}
                  </Button>
                  {schema && schema.name !== DocumentType.EMPLOYEE && (
                    <Button variant="alert" type="button" onClick={handleDelete}>
                      {localeString(labels.delete)}
                    </Button>
                  )}
                </Stack>
              </SidebarSection>
            </StickySection>
          </Sidebar>

          <MainColumn>
            <DocumentEditor
              schema={schema}
              updatedValues={updatedFields || {}}
              rawFields={rawFields || {}}
              updateValues={setUpdatedFields}
            />
          </MainColumn>
        </Row>
      </PageWidth>
    </AppContainer>
  );
};

export default EditPage;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F9F9F9;
  }
`;
