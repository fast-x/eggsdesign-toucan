import pdf from '@react-pdf/renderer';
import { blocksToArray, splitStringInHalf } from '../../helpers';
import hafferConcrete from '../../assets/fonts/HafferPrototypo-Concrete.otf';
import { parseTimestamp, chunk } from '../../helpers';
import {
  PDFContentContainer,
  PDFCVImageContainer,
  PDFCVTextContainer,
  PDFLogo,
  PDFPage,
  PDFSubtitle,
  PDFTableDate,
  PDFTableText,
  PDFTagList,
  PDFTagText,
  PDFcvPortraitImage,
  PDFCVTopContentContainer,
  PDFCVTitle,
  PDFCVTopTextAndImageContainer,
  PDFCVTextColumnsContainer,
  PDFCVDescriptionTextCol,
  PDFFlexRow,
  PDFCVApproachesTitle,
  PDFCVBottomContentContainer,
  PDFTitleSmall,
  PDFTableDot,
  PDFTableRow,
  PDFTableCellLeft,
  PDFTableCellMiddle,
  PDFTableCellRight,
} from './PDFStyles';
import { ProjectColumn } from './ProjectColumn';
import Employee from '../../types/Employee';
import { Approach, Language } from '../../types/Shared';
import useTranslation from '../../utils/i18n/useTranslation';
import { ProjectContribution } from '../../types/Project';

const labels = {
  approaches: {
    en: 'Approaches',
    nb: 'Approaches',
  },
  skills: {
    en: 'Skills',
    nb: 'Ferdigheter',
  },
  client: {
    en: 'Client',
    nb: 'Kunde',
  },
  description: {
    en: 'Description',
    nb: 'Beskrivelse',
  },
  education: {
    en: 'Education',
    nb: 'Utdanning',
  },
  workhistory: {
    en: 'Work history',
    nb: 'Arbeidshistorikk',
  },
  today: {
    en: 'Today',
    nb: 'D.d',
  },
  months: {
    en: 'months',
    nb: 'måneder',
  },
};

const { Document, View, Font } = pdf;

interface Props {
  employee: Employee;
  lang: Language;
  fileName: string;
}

export function EmployeePDF({ employee, lang, fileName }: Props) {
  Font.register({
    family: 'Haffer',
    fonts: [
      { fontWeight: 'normal', src: hafferConcrete },
      { fontWeight: 'bold', src: hafferConcrete },
    ],
  });
  const { localeBlocks } = useTranslation();
  const { firstName, lastName, description, image, approaches, skills, education, workHistory, projects } = employee;
  const descriptionParagraphs = description?.[lang] ? blocksToArray(description?.[lang]) : [];

  const projectTriplets: (ProjectContribution | null)[][] = chunk(
    projects ?? [],
    3,
  ) as unknown as (ProjectContribution | null)[][];

  const descriptionString = descriptionParagraphs.length > 0 ? descriptionParagraphs.join(' ') : '';
  const descriptionArray = descriptionString.length > 0 ? splitStringInHalf(descriptionString) : [];

  const filteredApproaches =
    approaches && approaches.length > 0
      ? approaches.reduce((acc: (Approach | null)[], current: Approach | null) => {
          const asString = acc.map((approach) => (approach && approach.name ? approach.name?.[lang] : '')).join('');
          if (current && asString.length + current.name?.[lang].length < 228) {
            acc.push(current);
          }
          return acc;
        }, [])
      : [];
  const renderDate = (isLastIndex: boolean, startDate: string, endDate?: string) => {
    const startYear = parseTimestamp(startDate, 'yyyy');
    const endYear = endDate ? parseTimestamp(endDate, 'yyyy') : labels.today[lang];
    if (isLastIndex && endDate && startYear === endYear) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      return `${date2.getMonth() - date1.getMonth()} ${labels.months[lang]}`;
    }
    return `${startYear} – ${endYear}`;
  };

  return (
    <Document language={lang} title={fileName}>
      <PDFPage bgColor="#FFFFFF">
        <PDFContentContainer verticalStack>
          <PDFCVTopContentContainer>
            <PDFCVTitle>
              {firstName} {lastName}
            </PDFCVTitle>
            <PDFCVTopTextAndImageContainer>
              <PDFCVTextContainer>
                <PDFSubtitle>{employee.title}</PDFSubtitle>
                {descriptionArray.length > 0 ? (
                  <PDFCVTextColumnsContainer>
                    {descriptionArray.map((descriptionCol, index) => (
                      <PDFCVDescriptionTextCol key={`col-${index}`}>{descriptionCol}</PDFCVDescriptionTextCol>
                    ))}
                  </PDFCVTextColumnsContainer>
                ) : (
                  <View style={{ height: '64px' }} />
                )}
              </PDFCVTextContainer>
              <PDFCVImageContainer>
                <PDFcvPortraitImage src={`${image?.url ?? ''}?w=800`} />
              </PDFCVImageContainer>
            </PDFCVTopTextAndImageContainer>
          </PDFCVTopContentContainer>
          <PDFCVBottomContentContainer>
            {filteredApproaches.length > 0 && (
              <PDFFlexRow>
                <PDFCVApproachesTitle>{labels.approaches[lang]}</PDFCVApproachesTitle>
                <PDFTagList>
                  {filteredApproaches.map(
                    (approach) =>
                      approach && (
                        <PDFTagText key={approach._id}>{approach.name?.[lang] || 'No translated name'}</PDFTagText>
                      ),
                  )}
                </PDFTagList>
              </PDFFlexRow>
            )}
          </PDFCVBottomContentContainer>
        </PDFContentContainer>
        <PDFLogo />
      </PDFPage>
      <PDFPage>
        <PDFContentContainer verticalStack>
          <PDFCVTextContainer
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              marginTop: '92pt',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '0 100pt 0 145pt',
            }}>
            {workHistory && workHistory.length > 0 && (
              <View style={{ width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                {<PDFTitleSmall>{labels.workhistory[lang]}</PDFTitleSmall>}
                {workHistory.slice(0, 8).map(
                  (entry, index) =>
                    entry && (
                      <PDFTableRow>
                        <PDFTableCellLeft>
                          {entry.startDate ? (
                            <PDFTableDate>{renderDate(index === 0, entry.startDate, entry.endDate)}</PDFTableDate>
                          ) : (
                            <PDFTableDate> - </PDFTableDate>
                          )}
                        </PDFTableCellLeft>
                        <PDFTableCellMiddle>
                          <PDFTableDot />
                        </PDFTableCellMiddle>
                        <PDFTableCellRight>
                          <PDFTableText style={{ fontSize: '18pt' }}>{entry.role}</PDFTableText>
                          <PDFTableText>{entry.place}</PDFTableText>
                        </PDFTableCellRight>
                      </PDFTableRow>
                    ),
                )}
              </View>
            )}
            {education && education.length > 0 && (
              <View style={{ width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <PDFTitleSmall>{labels.education[lang]}</PDFTitleSmall>
                {education.slice(0, 9).map(
                  (eduEntry) =>
                    eduEntry && (
                      <PDFTableRow>
                        <PDFTableCellLeft>
                          {(eduEntry.startDate && (
                            <PDFTableDate>
                              {parseTimestamp(eduEntry.startDate, 'yyyy')}
                              {' - '}
                              {eduEntry.endDate &&
                                (<PDFTableText>{parseTimestamp(eduEntry.endDate, 'yyyy')}</PDFTableText> || (
                                  <PDFTableText> - </PDFTableText>
                                ))}
                            </PDFTableDate>
                          )) || <PDFTableDate> - </PDFTableDate>}
                        </PDFTableCellLeft>
                        <PDFTableCellMiddle>
                          <PDFTableDot />
                        </PDFTableCellMiddle>
                        <PDFTableCellRight>
                          {eduEntry.degree && (
                            <PDFTableText style={{ fontSize: '18pt' }}>{eduEntry.degree}</PDFTableText>
                          )}
                          <PDFTableText>{eduEntry.place}</PDFTableText>
                        </PDFTableCellRight>
                      </PDFTableRow>
                    ),
                )}
              </View>
            )}
          </PDFCVTextContainer>
          <PDFCVBottomContentContainer>
            {skills && skills.length > 0 && (
              <PDFFlexRow>
                <PDFCVApproachesTitle>{labels.skills[lang]}</PDFCVApproachesTitle>
                <PDFTagList>
                  {skills.map(
                    (skill) =>
                      skill && <PDFTagText key={skill[lang]}>{skill[lang] || 'No translated name'}</PDFTagText>,
                  )}
                </PDFTagList>
              </PDFFlexRow>
            )}
          </PDFCVBottomContentContainer>
        </PDFContentContainer>
        <PDFLogo />
      </PDFPage>

      {projectTriplets.map((projects) => {
        let projectsArray = JSON.parse(JSON.stringify(projects)) as unknown as (ProjectContribution | null)[];
        if (projects.length < 3) {
          const emptyDivsCount = Math.max(3 - projects.length, 0);
          const emptyDivs = Array(emptyDivsCount).fill(null);
          projectsArray = [...projectsArray, ...(emptyDivs as (ProjectContribution | null)[])];
        }

        return (
          <PDFPage key={projects.map((project) => project?._id ?? 'i').join('-')}>
            <PDFContentContainer>
              {projectsArray.map((project, index) => {
                if (!project) return <View style={{ width: '33.33vw', height: '100%' }}></View>;
                const employeeContribution =
                  project.employeeDescription && project.employeeDescription.contribution
                    ? blocksToArray(localeBlocks(project.employeeDescription?.contribution))
                    : [];
                return (
                  <ProjectColumn
                    key={`project_${String(project._id)}_${index}`}
                    project={project}
                    contribution={employeeContribution}
                    index={index}
                  />
                );
              })}
            </PDFContentContainer>
            <PDFLogo />
          </PDFPage>
        );
      })}
    </Document>
  );
}
