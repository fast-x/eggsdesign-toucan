/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import toMarkdown from '@sanity/block-content-to-markdown';
import blockTools from '@sanity/block-tools';
import { marked } from 'marked';
import { ChangeEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import LanguageContext from '../../contexts/LanguageContext';
import { compiledSchemas } from '../../schemas/schemas';
import { Textarea } from '../input/Input';
import { colors } from '../styles';
import { Heading3 } from '../Typography';
import { ExpandedLanguages, LanguageIndicator, LanguageLabel } from './LanguageSelectorTools';
import { ShowLanguagesButton } from './ShowLanguagesButton';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { DocumentSchema, Field, LocaleBlockFieldSchema, PassedLocaleBlockValue } from '../../types/Shared';

const markdownSyntaxHint = `
# Heading 1 (big)
## Heading 2 (medium)
### Heading 3 (smaller)

**bold text**
~strike-through~
_italic_

[Text link](http://url-to-link.com)

* A bullet point
* Another bullet point

1. Numbered list item
2. Numbered list item

> Quoted text
`;

// If field is localeBlock
export function LocaleBlockField({ passedValue, handleUpdate }: Field<LocaleBlockFieldSchema, PassedLocaleBlockValue>) {
  // Since languages use the same blocktype, just fetch the first item (out of "en", "nb", etc...)
  const [bufferValues, setBufferValues] = useState<{ [key: string]: any } | null>(null);
  const compiledSchema = compiledSchemas.get('localeBlock') as unknown as DocumentSchema;
  const blocktype =
    compiledSchema && compiledSchema.fields && compiledSchema.fields && compiledSchema.fields.length > 0
      ? compiledSchema.fields[0].type
      : null;
  const { availableLanguages, currentLanguage } = useContext(LanguageContext);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    /*
      Operate on buffer instead of directly with doc state to prevent
      aggressive formatting from markdown -> html -> markdown conversion loop.
    */
    setBufferValues({ ...bufferValues, [currentLanguage]: event.target.value });
    handleUpdate({
      ...passedValue,
      [currentLanguage]: blockTools.htmlToBlocks(marked(event.target.value), blocktype),
    });
  };

  return (
    <div>
      <LanguageLabel>
        <LanguageIndicator language={currentLanguage} anchor="bottom" />
        <Textarea
          style={{ display: 'flex', width: '100%', minHeight: '200px', resize: 'vertical' }}
          value={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            bufferValues && bufferValues[currentLanguage]
              ? bufferValues[currentLanguage]
              : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                toMarkdown(passedValue?.[currentLanguage])
          }
          onChange={handleOnChange}
        />
      </LanguageLabel>

      <FieldHelpers>
        <ShowLanguagesButton expanded={expanded} setExpanded={setExpanded}></ShowLanguagesButton>

        <FieldHint>
          <FieldHintTitle tabIndex={0} className="markdown-title">
            <FieldHintIcon aria-hidden="true" viewBox="0 0 16 16" style={{ marginRight: '4px' }}>
              <InfoCircledIcon />
            </FieldHintIcon>
            <span>Markdown syntax</span>
          </FieldHintTitle>
          <FieldExplanation>
            <Heading3 style={{ margin: '0 0 0.1em' }}>Markdown syntax</Heading3>
            <pre style={{ fontFamily: 'monospace' }}>{markdownSyntaxHint}</pre>
          </FieldExplanation>
        </FieldHint>

        {typeof passedValue === 'string' && (
          <FieldHint>
            <FieldHintTitle>{String(passedValue).length} characters</FieldHintTitle>
          </FieldHint>
        )}
      </FieldHelpers>

      {expanded && (
        <ExpandedLanguages>
          {Object.values(availableLanguages)
            .filter((language) => language !== currentLanguage)
            .map((language) => {
              return (
                <LanguageLabel key={language}>
                  <LanguageIndicator language={language} anchor="bottom" />

                  <Textarea
                    style={{ display: 'flex', width: '100%', minHeight: '200px', resize: 'vertical' }}
                    value={bufferValues?.[language] || toMarkdown(passedValue?.[language])}
                    onChange={(e) => {
                      setBufferValues({ ...bufferValues, [language]: e.target.value });
                      handleUpdate({
                        ...passedValue,
                        [language]: blockTools.htmlToBlocks(marked(e.target.value), blocktype) as object,
                      });
                    }}
                  />
                </LanguageLabel>
              );
            })}
        </ExpandedLanguages>
      )}
    </div>
  );
}

const FieldHelpers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .markdown-title {
    color: ${colors.neutral2};
  }
`;

const FieldExplanation = styled.div`
  display: flex;
  flex-direction: column;
  visibility: hidden;
  position: absolute;
  bottom: calc(100%);
  right: -4px;
  padding: 16px;
  background: black;
  border-radius: 8px;
  color: ${colors.neutral3};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
`;

const FieldHint = styled.div`
  display: flex;
  position: relative;

  &:hover,
  &:focus,
  &:focus-within {
    ${FieldExplanation} {
      visibility: visible;
    }
  }
`;

const FieldHintTitle = styled.div`
  display: flex;
  color: ${colors.neutral2};
`;

const FieldHintIcon = styled.svg`
  height: 1em;
  width: 1em;
  display: inline-block;
  color: inherit;
  fill: currentColor;
  line-height: 1;
  flex-shrink: 0;
  max-width: initial;
`;
