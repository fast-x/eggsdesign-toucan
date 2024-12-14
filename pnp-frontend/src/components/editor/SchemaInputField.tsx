/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useContext, useEffect, useState, ChangeEvent, ClipboardEvent } from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';
import LanguageContext from '../../contexts/LanguageContext';
import { sanityConfig } from '../../services/sanityConfig';
import { getReferencesOfType, uploadAsset } from '../../utils/api';
import { Button } from '../input/Button';
import { CheckLabel, FieldSection, Input, Select } from '../input/Input';
import { colors } from '../styles';
import { Heading3 } from '../Typography';
import { ExpandedLanguages, LanguageIndicator, LanguageLabel } from './LanguageSelectorTools';
import { LocaleBlockField } from './LocaleBlockField';
import { isHiddenField, isReadonlyField } from './editorConfig';
import { ShowLanguagesButton } from './ShowLanguagesButton';
import Employee from '../../types/Employee';
import {
  Approach,
  ArrayElement,
  ArrayFieldSchema,
  BooleanFieldSchema,
  DateFieldSchema,
  Field as FieldType,
  FieldSchema,
  ImageFieldSchema,
  LocaleStringFieldSchema,
  NumberFieldSchema,
  ObjectFieldSchema,
  PassedArrayValue,
  PassedImageValue,
  PassedLocaleBlockValue,
  PassedLocaleStringValue,
  PassedObjectValue,
  PassedReferenceValue,
  PassedValue,
  ReferenceFieldSchema,
  StringFieldSchema,
} from '../../types/Shared';

export interface FieldResolver {
  fieldSchema: FieldSchema;
  passedValue: PassedValue;
  handleUpdate: (value: unknown) => void;
  documentType: string;
}

export const SchemaInputField = ({ fieldSchema, passedValue, handleUpdate, documentType }: FieldResolver) => {
  if (isHiddenField(fieldSchema.name, documentType)) return null;

  return (
    <FieldSection key={fieldSchema.name}>
      {(fieldSchema.title || fieldSchema.name) && (
        <Heading3 className="label-text" id={fieldSchema.title ?? fieldSchema.name}>
          {fieldSchema.title || fieldSchema.name}
          {isReadonlyField(fieldSchema.name, documentType) && '(not editable)'}
        </Heading3>
      )}
      {fieldSchema.description && <p style={{ whiteSpace: 'pre-line' }}>{fieldSchema.description}</p>}

      <Field {...{ fieldSchema, passedValue, handleUpdate, documentType }} />
    </FieldSection>
  );
};

const Field = ({ fieldSchema, passedValue, handleUpdate, documentType }: FieldResolver) => {
  switch (fieldSchema.type) {
    case 'boolean':
      return (
        <BooleanField
          {...{ fieldSchema, passedValue: passedValue as unknown as boolean, handleUpdate, documentType }}
        />
      );

    case 'string':
      return <TextField {...{ fieldSchema, passedValue: passedValue as string, handleUpdate, documentType }} />;

    case 'number':
      return <NumberField {...{ fieldSchema, passedValue: passedValue as number, handleUpdate, documentType }} />;

    case 'date':
      return <DateField {...{ fieldSchema, passedValue: passedValue as string, handleUpdate, documentType }} />;

    case 'image':
      return (
        <ImageField {...{ fieldSchema, passedValue: passedValue as PassedImageValue, handleUpdate, documentType }} />
      );

    case 'localeBlock':
      return (
        <LocaleBlockField
          {...{
            fieldSchema,
            passedValue: passedValue as unknown as PassedLocaleBlockValue,
            handleUpdate,
            documentType,
          }}
        />
      );

    case 'localeString':
      return (
        <LocaleStringField
          {...{
            fieldSchema,
            passedValue: passedValue as unknown as PassedLocaleStringValue,
            handleUpdate,
            documentType,
          }}
        />
      );

    case 'array':
      return (
        <ArrayField {...{ fieldSchema, passedValue: passedValue as PassedArrayValue, handleUpdate, documentType }} />
      );

    case 'object':
      return (
        <ObjectField {...{ fieldSchema, passedValue: passedValue as PassedObjectValue, handleUpdate, documentType }} />
      );

    case 'reference':
      return (
        <ReferenceField
          {...{ fieldSchema, passedValue: passedValue as unknown as PassedReferenceValue, handleUpdate, documentType }}
        />
      );

    default:
      return <p>No matching field for schema</p>;
  }
};

const BooleanField = ({
  passedValue,
  handleUpdate,
  fieldSchema,
  documentType,
}: FieldType<BooleanFieldSchema, boolean>) => {
  return (
    <CheckLabel htmlFor={fieldSchema.name} className={passedValue ? 'checked' : ''}>
      <input
        disabled={isReadonlyField(fieldSchema.name, documentType)}
        id={fieldSchema.name}
        type="checkbox"
        checked={passedValue}
        onChange={(e) => {
          handleUpdate(Boolean(e.target.checked));
        }}
        style={{ marginRight: '8px' }}
      />
      {fieldSchema.title}
    </CheckLabel>
  );
};

const LocaleStringField = ({
  passedValue,
  handleUpdate,
  fieldSchema,
  documentType,
}: FieldType<LocaleStringFieldSchema, PassedLocaleStringValue>) => {
  const { currentLanguage, availableLanguages } = useContext(LanguageContext);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <LanguageLabel>
        <LanguageIndicator language={currentLanguage} />
        <Input
          disabled={isReadonlyField(fieldSchema.name, documentType)}
          fullwidth
          value={passedValue?.[currentLanguage]}
          style={{ paddingRight: '3.5em' }}
          onChange={(e) => handleUpdate({ ...passedValue, [currentLanguage]: e.target.value })}
        />
      </LanguageLabel>

      <ShowLanguagesButton expanded={expanded} setExpanded={setExpanded}></ShowLanguagesButton>

      {expanded && (
        <ExpandedLanguages>
          {Object.values(availableLanguages)
            .filter((language) => language !== currentLanguage)
            .map((language) => (
              <LanguageLabel key={language}>
                <LanguageIndicator language={language} />

                <Input
                  disabled={isReadonlyField(fieldSchema.name, documentType)}
                  style={{ display: 'flex', width: '100%', paddingRight: '3.5em' }}
                  value={passedValue?.[language]}
                  onChange={(e) => handleUpdate({ ...passedValue, [language]: e.target.value })}
                />
              </LanguageLabel>
            ))}
        </ExpandedLanguages>
      )}
    </>
  );
};

// If field is image
const ImageField = ({
  passedValue,
  handleUpdate,
  fieldSchema,
  documentType,
}: FieldType<ImageFieldSchema, PassedImageValue>) => {
  const [assetPreview, setAssetPreview] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const sanityAssetUrl = (value: { asset: { _ref: string } }, params: string): string => {
    if (!value.asset?._ref?.split('-')) return '';

    const [, filename, size, filetype] = value.asset._ref.split('-');
    return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${filename}-${size}.${filetype}?${params}`;
  };

  const uploadImage = (file: Blob) => {
    setIsUploading(true);
    setError('');

    uploadAsset(file)
      .then((res: { data: { uploadId: string; name: string; _id: string } }) => {
        setIsUploading(false);

        handleUpdate({
          _type: 'image',
          _key: res.data.uploadId,
          name: res.data.name,
          asset: {
            _type: 'reference',
            _ref: res.data._id,
          },
        });
      })
      .catch((e: Error) => {
        setIsUploading(false);
        if (e) {
          setError(e.toString());
          console.error(e);
        }
      });
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const file = e.clipboardData.files[0];
    if (file?.type?.includes('image')) uploadImage(file);
  };

  const createFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e && e.target && e.target.files && e.target.files.length ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const image = new Blob([new Uint8Array(reader.result as ArrayBuffer)], { type: file.type });
        const imageFile = new File([image], file.name);
        uploadImage(imageFile);
        setAssetPreview(reader.result);
      };
    }
  };

  if (isUploading) {
    return (
      <ImageContainer>
        <span className="hint-text">Image is uploading...</span>
      </ImageContainer>
    );
  }

  return (
    <>
      <ImageContainer tabIndex={0} onPaste={handlePaste} role="button">
        {passedValue?.asset?._ref && (
          <div className="image-scale-container">
            <img
              height="140"
              src={passedValue?.asset?._ref ? sanityAssetUrl(passedValue, 'h=140') : String(assetPreview)}
              alt=""
            />
          </div>
        )}
        {!passedValue?.asset?._ref && (
          <>
            <input className="upload-input" type="file" onChange={createFileUpload} accept="image/*" />
            <span className="hint-text">Hint: you can select this area and paste (cmd+v)</span>
          </>
        )}
      </ImageContainer>
      {!!error && <ErrorContainer>{error}</ErrorContainer>}
      {fieldSchema.fields?.map((field) => (
        <SchemaInputField
          key={`key-${field.name}`}
          passedValue={field && field.name ? (passedValue[field.name] as PassedValue) : ''}
          fieldSchema={field}
          documentType={documentType}
          handleUpdate={(value): void => {
            handleUpdate({
              ...passedValue,
              [field.name]: value,
            });
          }}
        />
      ))}
    </>
  );
};

const ErrorContainer = styled.div`
  color: ${colors.secondary3};
`;

const ImageContainer = styled.div`
  border: 1px solid ${colors.neutral3};
  padding: 8px;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  align-items: center;

  &:hover {
    border: 1px solid ${colors.neutral2};
  }

  .image-scale-container {
    width: 140px;
    height: 140px;
    background: #eee;
    padding: 4px;
    border-radius: 2px;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }

  & ~ * {
    margin-top: 16px;
  }

  .hint-text {
    padding: 8px 0;
  }

  .upload-input {
    display: flex;
    font-size: inherit;
    background: ${colors.neutral3};
    border: none;
    padding: 8px 16px;
    max-width: 10em;
    cursor: pointer;
    margin-right: 16px;

    &:hover {
      background: ${colors.neutral2};
    }

    &::-webkit-file-upload-button {
      display: none;
      background: ${colors.neutral3};
      border: none;
      padding: 8px 16px;
    }
  }
`;

type OptionsType = {
  _id: string;
  [key: string]: PassedValue;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name: {
    _type: string;
    [key: string]: PassedValue;
  };
};

// If field is reference
const ReferenceField = ({
  fieldSchema,
  passedValue,
  handleUpdate,
  documentType,
}: FieldType<ReferenceFieldSchema, PassedReferenceValue>) => {
  const [options, setOptions] = useState<OptionsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentLanguage } = useContext(LanguageContext);

  const updateRefId = (refId: string) => {
    handleUpdate({ ...passedValue, _ref: refId });
  };

  useEffect(() => {
    const getNameField = (f: Employee | Approach | FieldSchema): string => {
      if ((f as Employee).firstName) {
        return String((f as Employee).firstName);
      }
      if ((f as Approach).name?._type === 'localeString') {
        return String((f as Approach).name[currentLanguage]);
      }
      return String(f.name);
    };
    const fetchReferenceTypes = async () => {
      setLoading(true);
      const refObjects = await getReferencesOfType(fieldSchema.to[0].type);
      setOptions(
        refObjects && Array.isArray(refObjects)
          ? refObjects.sort((a, b) => {
              const nameA = getNameField(a as unknown as Employee | Approach | FieldSchema)
                ? getNameField(a as unknown as Employee | Approach | FieldSchema).toUpperCase()
                : '';
              const nameB = getNameField(a as unknown as Employee | Approach | FieldSchema)
                ? getNameField(b as unknown as Employee | Approach | FieldSchema).toUpperCase()
                : '';
              return nameA > nameB ? 1 : -1;
            })
          : [],
      );
      setLoading(false);
    };
    if (options.length === 0) {
      fetchReferenceTypes();
    }
  }, [fieldSchema, currentLanguage]);

  return (
    <Select
      disabled={isReadonlyField(fieldSchema.name, documentType)}
      fullwidth
      value={loading || !passedValue?._ref ? 'none' : passedValue?._ref}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => updateRefId(e.target.value)}
      style={{ flex: '1' }}>
      <option value="none" disabled>
        {loading ? 'Loading...' : 'Select...'}
      </option>
      {options.map((opt) => {
        let value = '';
        if (opt.name?._type === 'localeString') {
          value = String(opt.name[currentLanguage]);
        } else if (opt.firstName && opt.lastName) {
          value = `${String(opt.firstName)} ${String(opt.lastName)}`;
        } else if (opt.name) {
          value = String(opt.name);
        }

        return (
          <option key={opt._id} value={opt._id}>
            {value}
          </option>
        );
      })}
    </Select>
  );
};

// If field is object
const ObjectField = ({
  fieldSchema,
  passedValue,
  handleUpdate,
  documentType,
}: FieldType<ObjectFieldSchema, PassedObjectValue>) => {
  if (!fieldSchema.fields) {
    return <p>No fields in object</p>;
  }
  return (
    <>
      {fieldSchema.fields?.map((field: FieldSchema) => {
        return (
          <SchemaInputField
            key={field.name}
            fieldSchema={field}
            passedValue={passedValue?.[field.name]}
            documentType={documentType}
            handleUpdate={(v) => handleUpdate({ ...passedValue, [field.name]: v })}
          />
        );
      })}
    </>
  );
};

// If field is array
const ArrayField = ({
  fieldSchema,
  passedValue,
  handleUpdate,
  documentType,
}: FieldType<ArrayFieldSchema, PassedArrayValue>) => {
  const shiftFromTo = (fromPosition: number, toPosition: number, arr: any[]): any[] => {
    const bufferedArray = [...arr];
    bufferedArray.splice(fromPosition, 1); // remove entry from original position
    bufferedArray.splice(toPosition, 0, arr[fromPosition]); // Insert entry at new position
    return bufferedArray;
  };

  const addArrayItem = (type: string): void => {
    const typeKey = type === 'reference' ? '_type' : 'type';
    handleUpdate([...(passedValue || []), { [typeKey]: type, _key: uuid() }]);
  };

  const removeArrayItem = (key: string): void => {
    if (window.confirm('Remove item?')) {
      handleUpdate([...passedValue].filter((value) => value._key !== key));
    }
  };

  const moveItemUp = (i: number): void => {
    if (i > 0 || passedValue.length - 1 >= i) {
      // Shift the item at position i to position i-1
      handleUpdate(shiftFromTo(i, i - 1, passedValue));
    }
  };

  const moveItemDown = (i: number): void => {
    if (i > 1 || passedValue.length - 1 > i) {
      // Shift the item at position i to position i+1
      handleUpdate(shiftFromTo(i, i + 1, passedValue));
    }
  };

  return (
    <>
      <div>
        {Array.isArray(passedValue) &&
          passedValue?.map((pv, i) => (
            <div key={pv._key} style={{ marginBottom: '16px' }}>
              <SchemaInputField
                key={pv._key}
                fieldSchema={fieldSchema.of[0]}
                passedValue={pv}
                documentType={documentType}
                handleUpdate={(v) => {
                  const arrVal = [...passedValue];
                  arrVal[i] = v as PassedValue & ArrayElement;
                  handleUpdate(arrVal);
                }}
              />

              {isReadonlyField(fieldSchema.name, documentType) ? null : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="compact" variant="primary" onClick={() => removeArrayItem(pv._key)}>
                    Remove
                  </Button>
                  <Button size="compact" variant="primary" disabled={i <= 0} onClick={() => moveItemUp(i)}>
                    Move up
                  </Button>
                  <Button
                    size="compact"
                    variant="primary"
                    disabled={i >= passedValue.length - 1}
                    onClick={() => moveItemDown(i)}>
                    Move down
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div style={{ marginTop: '20px', paddingTop: '8px', borderTop: `1px solid ${colors.neutral3}` }}>
        {fieldSchema.of.map((o) => (
          <Button variant="primary" size="compact" key={o.type} onClick={() => addArrayItem(o.type)}>
            Add entry
          </Button>
        ))}
      </div>
    </>
  );
};

// If field is string
const TextField = ({ fieldSchema, passedValue, handleUpdate, documentType }: FieldType<StringFieldSchema, string>) => {
  return (
    <>
      {/* Render a text input or a dropdown */}
      {(fieldSchema.options?.list && (
        <Select
          fullwidth
          name={fieldSchema.name}
          value={passedValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleUpdate(e.target.value)}>
          {fieldSchema.options.list.map((listItem) => (
            <option key={listItem}>{listItem}</option>
          ))}
        </Select>
      )) || (
        <Input
          fullwidth
          id={fieldSchema.name}
          value={passedValue}
          onChange={(e) => handleUpdate(e.target.value)}
          type="text"
          disabled={isReadonlyField(fieldSchema.name, documentType)}
        />
      )}
    </>
  );
};

const DateField = ({ fieldSchema, passedValue, handleUpdate, documentType }: FieldType<DateFieldSchema, string>) => {
  /**
   * Returns true if the browser supports the specified date input type, typically 'month' or 'year'
   */
  function browserSupportsDateType(type: string): boolean {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    return input.type == type;
  }

  /**
   * Returns an input type string based on date format
   */
  function resolveDateFormat(format: string): 'date' | 'month' {
    if ((format === 'YYYY-MM' || format === 'YYYY') && browserSupportsDateType('month')) return 'month';
    return 'date';
  }

  function formatDateValue(date: string | number, format: 'date' | 'month'): string | number {
    if (typeof date !== 'string') return date;

    const [year, month] = date.split('-');
    if (format === 'month') return `${year}-${month}`;
    return date;
  }

  const type = resolveDateFormat(fieldSchema.options.dateFormat);
  const formattedValue = formatDateValue(passedValue, type);

  return (
    <Input
      fullwidth
      id={fieldSchema.name}
      value={passedValue && formattedValue}
      onChange={(e) => handleUpdate(e.target.value)}
      type={type}
      disabled={isReadonlyField(fieldSchema.name, documentType)}
    />
  );
};

const NumberField = ({
  fieldSchema,
  passedValue,
  handleUpdate,
  documentType,
}: FieldType<NumberFieldSchema, number>) => {
  return (
    <Input
      fullwidth
      id={fieldSchema.name}
      value={passedValue}
      onChange={(e) => handleUpdate(Number(e.target.value))}
      type="number"
      disabled={isReadonlyField(fieldSchema.name, documentType)}
    />
  );
};
