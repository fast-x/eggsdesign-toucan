import { useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '../contexts/LanguageContext';
import { parseTimestamp } from '../helpers';
import { colors } from './styles';
import { Heading2 } from './Typography';

const labels = {
  when: {
    en: 'When',
    nb: 'Tidsrom',
  },
  what: {
    en: 'What',
    nb: 'Hva',
  },
  where: {
    en: 'Where',
    nb: 'Hvor',
  },
};

type Props = {
  heading: string;
  history: any[];
};

export default function Table({ heading, history }: Props): JSX.Element {
  const { currentLanguage } = useContext(LanguageContext);

  // HACK: note special handling of "degree" and "role" attributes on line 58
  return (
    <>
      <Heading2>{heading}</Heading2>
      <TableContainer>
        <SimpleTable>
          <thead>
            <tr>
              <td>{labels.when[currentLanguage]}</td>
              <td>{labels.what[currentLanguage]}</td>
              <td>{labels.where[currentLanguage]}</td>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((entry: { _key: string; [key: string]: string | number }) => (
                <tr key={entry._key}>
                  <td>
                    {(entry.startDate && (
                      <>
                        <span>{parseTimestamp(entry.startDate, 'yyyy')}</span>
                        {' – '}
                        {(entry.endDate && <span>{parseTimestamp(entry.endDate, 'yyyy')}</span>) || 'Today'}
                      </>
                    )) ||
                      ''}
                  </td>
                  <td>{entry.degree || entry.role}</td>
                  <td>{entry.place}</td>
                </tr>
              ))}
          </tbody>
        </SimpleTable>
      </TableContainer>
    </>
  );
}

const TableContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.neutral3}88;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  padding: 32px;
`;

const SimpleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  page-break-inside: avoid;
  break-inside: avoid;
  position: relative;

  tr:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 8px 0;
  }

  thead {
    font-weight: 500;
    text-transform: uppercase;
  }
`;
