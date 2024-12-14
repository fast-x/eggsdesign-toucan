import pdf from '@react-pdf/renderer';
import hafferConcrete from '../../assets/fonts/HafferPrototypo-Concrete.otf';
import Project from '../../types/Project';
import {
  PDFContentContainer,
  PDFImage,
  PDFImageOverlay,
  PDFLogo,
  PDFPage,
  PDFProjectHeroImageContainer,
  PDFTableTeamMemberColumn,
  PDFTableTeamMemberRow,
  PDFTeamMemberImage,
} from './PDFStyles';
import { Language } from '../../types/Shared';
import useTranslation from '../../utils/i18n/useTranslation';
import { splitEvery } from 'ramda';
import { projectTeamStyles } from './ProjectTeamStyles';

const { View, Font, Text } = pdf;

const labels = {
  people_invoved: {
    en: 'People involved',
    nb: 'Involverte',
  },
};

type Props = {
  project: Project;
  lang: Language;
};

export function ProjectTeamPage({ project, lang }: Props) {
  Font.register({
    family: 'Haffer',
    fonts: [
      { fontWeight: 'normal', src: hafferConcrete },
      { fontWeight: 'bold', src: hafferConcrete },
    ],
  });

  const hyphenationCallback = (word: string) => [word];
  Font.registerHyphenationCallback(hyphenationCallback);

  return (
    <PDFPage bgColor="#000000">
      <PDFContentContainer verticalStack>
        <View style={projectTeamStyles.contentContainer}>
          <View>
            <Text style={projectTeamStyles.heading}>{labels.people_invoved[lang]}</Text>
            <PDFTeamTable project={project} />
          </View>
        </View>
      </PDFContentContainer>
      <PDFLogo color="#FFFFFF" fixed />
    </PDFPage>
  );
}

function PDFTeamTable({ project }: { project: Project }) {
  const chunkedEmployees = splitEvery(2, project?.employees ?? []);
  return (
    <View style={projectTeamStyles.teamTable}>
      {chunkedEmployees.map(([employee1, maybeEmployee2], index) => (
        <PDFTableTeamMemberRow key={employee1?.participant?._id ?? index} firstRow={index === 0}>
          <PDFTableTeamMemberColumn>
            <PDFTeamMemberImage src={(employee1?.participant?.imageURL ?? '') + '?h=600'} />
            <View style={{ color: '#FFFFFF' }}>
              {employee1?.memberRole && <Text style={projectTeamStyles.roleText}>{employee1.memberRole}</Text>}
              <Text style={projectTeamStyles.nameText}>
                {employee1?.participant?.firstName ?? ''} {employee1?.participant?.lastName ?? ''}
              </Text>
              <Text style={projectTeamStyles.levelText}>{employee1?.participant?.title}</Text>
            </View>
          </PDFTableTeamMemberColumn>
          <PDFTableTeamMemberColumn>
            {maybeEmployee2 && (
              <>
                <PDFTeamMemberImage src={(maybeEmployee2?.participant?.imageURL ?? '') + '?h=600'} />
                <View style={{ color: '#FFFFFF' }}>
                  {maybeEmployee2?.memberRole && (
                    <Text style={projectTeamStyles.roleText}>{maybeEmployee2.memberRole}</Text>
                  )}
                  <Text style={projectTeamStyles.nameText}>
                    {maybeEmployee2?.participant?.firstName ?? ''} {maybeEmployee2?.participant?.lastName ?? ''}
                  </Text>
                  <Text style={projectTeamStyles.levelText}>{maybeEmployee2?.participant?.title}</Text>
                </View>
              </>
            )}
          </PDFTableTeamMemberColumn>
        </PDFTableTeamMemberRow>
      ))}
    </View>
  );
}
