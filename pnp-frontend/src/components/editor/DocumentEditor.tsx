import { ReactElement, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SchemaInputField } from './SchemaInputField';
import Employee from '../../types/Employee';
import Project from '../../types/Project';
import { DocumentSchema, PassedValue } from '../../types/Shared';

interface Props {
  schema: DocumentSchema;
  updatedValues: Employee | Project | null;
  rawFields: Employee | Project | null;
  updateValues: (value: any) => void;
}

function DocumentEditor({ schema, updatedValues, updateValues, rawFields }: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  function getInitialDocumentValues(query: URLSearchParams): Record<string, any> | null {
    try {
      const queryFields = query.get('fields');
      if (!queryFields) {
        return null;
      }
      return JSON.parse(queryFields) as Record<string, any>;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const fieldsFromURL = getInitialDocumentValues(searchParams);
    if (!updateValues || !fieldsFromURL) return;
    updateValues({ ...updateValues, ...fieldsFromURL });
    setSearchParams({ search: new URLSearchParams().toString() });
  }, []);

  function hasValue(value: unknown): boolean {
    return value !== null && value !== undefined;
  }

  return (
    <StyledForm>
      {schema.fields.map((field) => {
        let updatedValue: string | unknown = '';
        if (updatedValues && hasValue(updatedValues[field.name])) {
          updatedValue = updatedValues[field.name];
        } else if (rawFields && hasValue(rawFields[field.name])) {
          updatedValue = rawFields[field.name];
        }

        return (
          <SchemaInputField
            key={field.name}
            documentType={schema.name}
            fieldSchema={field}
            passedValue={updatedValue as PassedValue}
            handleUpdate={(v) => {
              updateValues({ ...updatedValues, [field.name]: v });
            }}
          />
        );
      })}
    </StyledForm>
  );
}

export default DocumentEditor;

// --- Styled components ---

const StyledForm = styled.form`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  .form-row {
    margin-bottom: 1rem;
  }
  .form-column {
    display: flex;
    flex-direction: column;
  }
  .label-text {
    text-transform: uppercase;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.15em;
    display: flex;
  }
`;
