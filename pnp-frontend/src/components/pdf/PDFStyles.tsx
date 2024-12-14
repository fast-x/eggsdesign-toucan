import pdf, { G, Polygon } from '@react-pdf/renderer';
import React from 'react';

const { Page, Text, View, Image, StyleSheet, Svg, Rect, Path } = pdf;

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Haffer',
    paddingTop: '0',
    paddingLeft: '539pt',
    paddingRight: '539pt',
    display: 'flex',
    alignItems: 'flex-start',
  },
  pageNoPadding: {
    fontFamily: 'Haffer',
  },

  pageLogo: {
    position: 'absolute',
    width: '200pt',
    height: '70pt',
    top: '15pt',
    left: '-10.5pt',
    transform: 'scale(0.49)',
  },

  teamMemberImage: {
    width: '100pt',
    height: '100pt',
    borderRadius: '50pt',
    objectFit: 'cover',
    marginRight: '32pt',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'flex-start',
  },

  contentContainerVerticalStacked: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    paddingTop: '89pt',
    paddingBottom: '37pt',
    height: '100%',
    width: '33.33vw',
    overflow: 'hidden',
  },
  projectMainGrid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '8pt 39pt 32pt 39pt',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '4pt',
    marginBottom: '12pt',
  },
  columnImageContainer: {
    height: '30vh',
    backgroundColor: '#BEC6CB',
    borderRadius: '2pt',
    overflow: 'hidden',
  },

  cvTopContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: '72pt',
  },
  cvTopTextAndImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    paddingLeft: '142pt',
    paddingRight: '142pt',
  },
  cvImageContainer: {
    height: '290pt',
    width: '290pt',
    flex: 4,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
    overflow: 'hidden',
    paddingLeft: '20pt',
  },
  cvBottomContentContainer: {
    width: '100%',
    flex: 1,
    paddingTop: '24pt',
    paddingLeft: '39pt',
    paddingRight: '39pt',
    marginTop: 'auto',
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: '44pt',
  },

  projectImageContainer: {
    width: '55%',
    height: '490pt',
    borderRadius: '2pt',
    overflow: 'hidden',
    marginTop: 'auto',
    marginLeft: 'auto',
  },

  projectHeroImageContainer: {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: '0pt',
    left: '0pt',
  },

  longCaseImageContainer: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    flex: 1,
  },

  cvImage: {
    objectFit: 'cover',
    height: '290pt',
    width: '290pt',
    flex: 1,
    borderTopLeftRadius: '150pt',
    borderTopRightRadius: '150pt',
    borderBottomLeftRadius: '150pt',
    borderBottomRightRadius: '150pt',
  },

  projectTextContainer: {
    width: '40%',
    padding: '0 18pt 8pt 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  projectHeroTextContainer: {
    width: '42%',
    padding: '32pt',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: '110pt',
    bottom: '64pt',
    borderRadius: '10pt',
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  projectHeroTitle: {
    width: '100%',
    height: 'auto',
    fontFamily: 'Haffer',
    fontSize: '60pt',
    marginTop: '24pt',
    lineHeight: '1.2',
  },
  projectDetailsGrid: {
    width: '100%',
    height: 'auto',
    marginTop: '32pt',
    paddingRight: '39pt',
    paddingBottom: '26pt',
    minHeight: '94pt',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
  },

  cvTextContainer: {
    flex: 9,
    selfAlign: 'flex-start',
    color: 'black',
    flexWrap: 'wrap',
  },
  cvTextColumnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '18pt',
  },
  longCaseTextContainer: {
    flex: 1,
    selfAlign: 'center',
    paddingLeft: '64pt',
    paddingRight: '64pt',
    color: 'black',
  },

  columnTextContainer: {
    flex: 2,
    overflow: 'hidden',
    marginTop: '20pt',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'column',
  },

  client: {
    marginBottom: '4pt',
  },

  title: {
    fontFamily: 'Haffer',
    fontSize: '60pt',
    marginBottom: '8pt',
    marginTop: '0',
  },
  cvTitle: {
    fontFamily: 'Haffer',
    fontSize: '60pt',
    paddingLeft: '142pt',
    paddingRight: '142pt',
    marginBottom: '8pt',
    marginTop: '0',
    width: '100%',
  },
  projectTitle: {
    width: '100%',
    height: 'auto',
    fontFamily: 'Haffer',
    fontSize: '50pt',
    marginTop: '24pt',
    marginBottom: '32pt',
    lineHeight: '1.2',
  },
  projectDescription: {
    fontSize: '20pt',
    lineHeight: '1.3',
  },
  titleSmall: {
    fontFamily: 'Haffer',
    fontSize: '28pt',
    marginTop: '8pt',
    marginBottom: '16pt',
    width: '100%',
  },

  subtitle: {
    fontSize: '24pt',
    marginBottom: '18pt',
    marginTop: '4pt',
  },

  clientName: {
    fontSize: '30pt',
    marginLeft: '8pt',
  },

  description: {
    fontSize: '16pt',
    lineHeight: '1.3',
    paddingBottom: '12pt',
    width: '100%',
  },

  cvDescriptionCol: {
    fontSize: '16pt',
    lineHeight: '1.3',
    marginBottom: '12pt',
    width: '48%',
  },
  cvApproachesTitle: {
    fontSize: '24pt',
    marginTop: '6pt',
    marginRight: '22pt',
    paddingRight: '18pt',
    alignSelf: 'flex-start',
  },

  line: {
    marginTop: '8pt',
    marginBottom: '8pt',
    width: '100',
    height: '6',
  },

  tagList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tagText: {
    fontSize: '12pt',
    letterSpacing: '1pt',
    padding: '8pt',
    lineHeight: 1,
    minHeight: '28pt',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #D9D9D9',
    borderRadius: '32pt',
    marginRight: '8pt',
    marginTop: '8pt',
  },

  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8pt 0pt',
    flexWrap: 'nowrap',
    marginLeft: '-200pt',
  },

  tableText: {
    flex: 2,
    fontSize: '12pt',
    lineHeight: '1.4',
    flexWrap: 'wrap',
  },

  tableTeamMemberRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tableTeamMemberColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1 0 50%',
    padding: '12pt 16pt 12pt 0pt',
  },

  tableTextShort: {
    flex: 1,
    fontSize: '12pt',
    lineHeight: '1.4',
    fontWeight: 500,
  },

  tableCell: {
    padding: '8pt',
  },

  tableCellLeft: {
    padding: '8pt',
    textAlign: 'right',
    width: '40%',
  },
  tableCellMiddle: {
    padding: '8pt 2pt',
    width: '5%',
    display: 'flex',
    alignItems: 'center',
  },
  tableCellRight: {
    padding: '8pt',
    textAlign: 'left',
    width: '55%',
  },
  tableDate: {
    fontSize: '12pt',
    lineHeight: '1.4',
  },
  detailsBlock: {
    minWidth: '150pt',
    minHeight: '94pt',
    paddingRight: '22pt',
  },
  detailsHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '14pt',
  },
  detailsEntriesWrapper: {
    height: '90pt',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  detailsText: {
    fontSize: '12pt',
    lineHeight: '1.2',
    margin: '6pt 12pt 0pt 8pt',
  },

  secondaryImageContainer: {
    height: '60%',
    flex: '1 1 auto',
  },

  contributionTextContainer: {
    flex: '1 1 auto',
    selfAlign: 'center',
    paddingLeft: '64pt',
    paddingRight: '64pt',
    color: 'black',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export const PDFPage: React.FC<Omit<pdf.PageProps, 'bgColor'> & { bgColor?: string }> = ({
  children,
  bgColor = '#FFFFFF',
}) => (
  <Page size={{ width: 1280, height: 720 }} style={{ ...styles.page, backgroundColor: bgColor }}>
    {children}
  </Page>
);

export const PDFNoPaddingPage: React.FC<pdf.PageProps> = ({ children }) => (
  <Page size={{ width: 1280, height: 720 }} style={styles.pageNoPadding}>
    {children}
  </Page>
);

export const PDFContentContainer: React.FC<Omit<pdf.ViewProps, 'verticalStack'> & { verticalStack?: boolean }> = ({
  children,
  verticalStack = false,
  ...props
}) => (
  <View style={verticalStack ? styles.contentContainerVerticalStacked : styles.contentContainer} {...props}>
    {children}
  </View>
);

export const PDFProjectMainGrid: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.projectMainGrid} {...props}>
    {children}
  </View>
);

export const PDFFlexRow: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.flexRow} {...props}>
    {children}
  </View>
);

export const PDFCVTopContentContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvTopContentContainer} {...props}>
    {children}
  </View>
);

export const PDFCVBottomContentContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvBottomContentContainer} {...props}>
    {children}
  </View>
);

export const PDFCVTopTextAndImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvTopTextAndImageContainer} {...props}>
    {children}
  </View>
);

export const PDFCVImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvImageContainer} {...props}>
    {children}
  </View>
);

export const PDFProjectHeroImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.projectHeroImageContainer} {...props}>
    {children}
  </View>
);

export const PDFProjectImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.projectImageContainer} {...props}>
    {children}
  </View>
);

export const PDFSecondaryImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.secondaryImageContainer} {...props}>
    {children}
  </View>
);

export const PDFImage: React.FC<Omit<pdf.ImageWithSrcProp, 'src'> & { src: string }> = ({ src, ...props }) => (
  <Image {...props} style={styles.image} src={src} />
);

export const PDFcvPortraitImage: React.FC<Omit<pdf.ImageWithSrcProp, 'src'> & { src: string }> = ({
  src,
  ...props
}) => <Image {...props} style={styles.cvImage} src={src} />;

export const PDFImageOverlay: React.FC<pdf.ViewProps & { color: string }> = ({ color, ...props }) => (
  <View style={{ ...styles.imageOverlay, backgroundColor: color }} {...props} />
);

export const PDFProjectTextContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.projectTextContainer} {...props}>
    {children}
  </View>
);

export const PDFProjectHeroTextContainer: React.FC<pdf.ViewProps & { background?: string; color?: string }> = ({
  children,
  background = 'transparent',
  color = '#ffffff',
  ...props
}) => (
  <View style={{ ...styles.projectHeroTextContainer, backgroundColor: background, color }} {...props}>
    {children}
  </View>
);

export const PDFProjectDetails: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.projectDetailsGrid} {...props}>
    {children}
  </View>
);

export const PDFCVTextContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvTextContainer} {...props}>
    {children}
  </View>
);

export const PDFCVTextColumnsContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.cvTextColumnsContainer} {...props}>
    {children}
  </View>
);

export const PDFCVTitle: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.cvTitle} {...props}>
    {children}
  </Text>
);

export const PDFCVDescriptionTextCol: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.cvDescriptionCol} {...props}>
    {children}
  </Text>
);

export const PDFCVApproachesTitle: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.cvApproachesTitle} {...props}>
    {children}
  </Text>
);

export const PDFContributionTextContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.contributionTextContainer} {...props}>
    {children}
  </View>
);

export const PDFTitle: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.title} {...props}>
    {children}
  </Text>
);

export const PDFTitleSmall: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.titleSmall} {...props}>
    {children}
  </Text>
);

export const PDFSubtitle: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

export const PDFDescriptionText: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.description} {...props}>
    {children}
  </Text>
);

export const PDFTagText: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.tagText} {...props}>
    {children}
  </Text>
);

export const PDFTagList: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tagList} {...props}>
    {children}
  </View>
);

export const PDFTableRow: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableRow} {...props}>
    {children}
  </View>
);

export const PDFTableCell: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableCell} {...props}>
    {children}
  </View>
);

export const PDFTableCellLeft: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableCellLeft} {...props}>
    {children}
  </View>
);

export const PDFTableCellMiddle: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableCellMiddle} {...props}>
    {children}
  </View>
);

export const PDFTableCellRight: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableCellRight} {...props}>
    {children}
  </View>
);

export const PDFTableDot: React.FC<pdf.ViewProps & { size?: number; color?: string }> = ({
  size = 12,
  color = '#000000',
  ...props
}) => (
  <View
    style={{
      width: `${size}pt`,
      height: `${size}pt`,
      borderRadius: `${size / 2}pt`,
      backgroundColor: color,
    }}
    {...props}
  />
);

export const PDFTableText: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.tableText} {...props}>
    {children}
  </Text>
);

export const PDFTableTeamMemberRow: React.FC<pdf.ViewProps & { firstRow?: boolean }> = ({
  children,
  firstRow,
  ...props
}) => (
  <View style={styles.tableTeamMemberRow} {...props}>
    {children}
  </View>
);

export const PDFTableTeamMemberColumn: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.tableTeamMemberColumn} {...props}>
    {children}
  </View>
);

export const PDFTeamMemberImage: React.FC<Omit<pdf.ImageWithSrcProp, 'src'> & { src: string }> = ({
  src,
  style,
  ...props
}) => {
  return <Image style={{ ...style, ...styles.teamMemberImage }} src={src} {...props} />;
};

export const PDFTableDate: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={styles.tableDate} {...props}>
    {children}
  </Text>
);

export const PDFLogo: React.FC<Omit<pdf.SVGProps, 'color'> & { color?: string }> = ({ style, color, ...props }) => {
  return (
    <Svg height="40pt" width="80pt" style={{ ...style, ...styles.pageLogo }} {...props}>
      <G transform="translate(-80 -65)">
        <G>
          <G>
            <G>
              <G>
                <Path
                  d="M25.5036 23.66 11.3927 23.66 11.3927 18.46 22.4782 18.46 22.4782 11.9364 11.3927 11.9364 11.3927 7.68182 25.2436 7.68182 25.2436 1.18182 3.73455 1.18182 3.73455 30.1836 25.5036 30.1836 25.5036 23.66Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M53.1818 36.7073C51.0073 34.9818 48.1236 34.1309 44.6018 34.1309 42.6164 34.1309 40.7727 34.5091 39.0709 35.2418 37.3691 35.9982 36.0455 37.0382 35.0527 38.4091 34.0836 39.78 33.5873 41.3164 33.5873 43.0418 33.5873 45.1691 34.0836 46.8473 35.1 48.0764 36.1164 49.3291 37.2982 50.2509 38.6455 50.8182 39.9927 51.4091 41.7182 51.9764 43.7982 52.52 45.0745 52.8509 46.0673 53.1582 46.7291 53.3945 47.4145 53.6309 47.9818 53.9618 48.4545 54.3873 48.9273 54.8127 49.1636 55.3091 49.1636 55.9 49.1636 56.42 48.9982 56.8691 48.6673 57.2473 48.3364 57.6491 47.8873 57.9327 47.32 58.1218 46.7527 58.3109 46.0909 58.4291 45.3582 58.4291 44.46 58.4291 43.6564 58.2636 42.9 57.9564 42.1673 57.6491 41.5527 57.1764 41.08 56.5382 40.6073 55.9236 40.3 55.1436 40.1582 54.1982L32.7836 55.7345C33.1145 57.3418 33.7291 58.7364 34.5564 59.9418 35.6673 61.5255 37.1564 62.7309 39.0236 63.5818 40.8909 64.4091 42.9945 64.8345 45.3818 64.8345 47.7455 64.8345 49.6364 64.4564 51.4091 63.7 53.1582 62.9436 54.5291 61.8564 55.5455 60.4145 56.5382 58.9727 57.0345 57.3182 57.0345 55.4273 57.0345 53.2055 56.5145 51.4091 55.4273 50.0855 54.3636 48.7618 53.1109 47.7927 51.6691 47.1782 50.2273 46.5636 48.4309 45.9964 46.3036 45.4527 45.1691 45.1691 44.2945 44.9091 43.6564 44.72 43.0182 44.5309 42.4982 44.2473 42.0727 43.8927 41.6473 43.5618 41.4582 43.1127 41.4582 42.5927 41.4582 42.1673 41.6 41.7891 41.86 41.4582 42.12 41.1273 42.4982 40.8673 42.9709 40.7018 43.4436 40.5364 43.9873 40.4418 44.6255 40.4418 45.8545 40.4418 46.8709 40.7491 47.7218 41.3636 48.5727 41.9782 49.1164 42.8055 49.3527 43.8455L49.6127 43.8455 56.7273 42.3564C56.1836 40.0164 55.0255 38.1255 53.1818 36.7073Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M42.1673 31.1764C43.7036 31.1764 45.1218 30.8927 46.4455 30.3255 47.9582 29.6873 49.6127 28.5055 50.5109 27.4418L50.5109 30.5145 56.4436 30.5145 56.4436 14.1109 41.7418 14.1109 41.7418 20.0436 49.2818 20.0436C49.14 20.9655 48.7618 21.7691 48.1473 22.4782 47.5327 23.1636 46.7764 23.7073 45.8309 24.1091 44.8855 24.5109 43.8218 24.7 42.64 24.7 41.1036 24.7 39.7564 24.3218 38.5509 23.5891 37.3455 22.8564 36.4236 21.8164 35.7382 20.4455 35.0764 19.0982 34.7218 17.4909 34.7218 15.6709 34.7218 13.8509 35.0527 12.2909 35.7145 10.92 36.3764 9.54909 37.2982 8.48545 38.4327 7.75273 39.5909 7.02 40.9145 6.64182 42.4273 6.64182 44.1291 6.64182 45.5236 7.09091 46.6109 7.96545 47.6982 8.84 48.3127 9.97455 48.4782 11.3218L55.9473 9.73818C55.6164 8.20182 55.0018 6.80727 54.1036 5.53091 52.8982 3.82909 51.2673 2.52909 49.2345 1.56 47.2018 0.614545 44.9327 0.141818 42.4273 0.141818 39.4255 0.141818 36.7545 0.78 34.4145 2.08 32.0745 3.35636 30.2782 5.17636 28.9782 7.51636 27.7018 9.85636 27.04 12.5745 27.04 15.6709 27.04 18.9564 27.7255 21.7691 29.0964 24.1091 30.4673 26.4491 32.3109 28.1982 34.58 29.4036 36.8964 30.5855 39.4018 31.2 42.1673 31.1764Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M26.4491 40.7018 29.7109 40.7018 29.7109 34.7691 13.4964 34.7691 13.4964 49.8491 19.4291 49.8491 19.4291 42.5218C21.6036 43.0891 23.8964 45.3818 23.8964 48.9509 23.8964 50.4873 23.5182 52.1891 22.7855 53.3709 22.0527 54.5764 21.0127 55.4982 19.6418 56.1836 18.2945 56.8691 16.8764 57.2 15.0564 57.2 13.2364 57.2 12.1964 56.8691 10.8255 56.2073 9.45455 55.5455 8.39091 54.6236 7.68182 53.4655 6.94909 52.3073 6.57091 50.6527 6.57091 49.14 6.57091 47.4382 7.02 45.7127 7.89455 44.6255 8.76909 43.5382 9.90364 42.9236 11.2509 42.7345L9.66727 35.2418C8.13091 35.5727 6.73636 36.1873 5.46 37.0855 3.78182 38.2909 2.45818 39.9218 1.51273 41.9545 0.567273 43.9873 0.0945455 46.5873 0.0945455 49.1164 0.0945455 52.1182 0.732727 55.12 2.03273 57.46 3.30909 59.8 5.12909 61.62 7.46909 62.8964 9.80909 64.1727 12.0073 64.8345 15.1036 64.8345 18.3891 64.8345 21.0364 64.1491 23.3527 62.7782 25.6691 61.4073 27.4418 59.5636 28.6236 57.2709 29.8291 54.9782 30.42 52.1182 30.42 49.3764 30.42 47.84 29.8764 45.6655 29.2855 44.3891 28.6 43.0182 27.56 41.6 26.4491 40.7018Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M72.5636 28.4345 72.5636 15.1745 77.8818 15.1745C80.4818 15.1745 82.1836 16.7582 82.1836 19.1218 82.1836 21.5327 80.4818 23.0927 77.8818 23.0927L74.7855 23.0927 74.7855 28.4582 72.5636 28.4582ZM77.6455 21.1782C79.04 21.1782 79.9618 20.3509 79.9618 19.1218 79.9618 17.8927 79.04 17.0891 77.6455 17.0891L74.7855 17.0891 74.7855 21.1782 77.6455 21.1782Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M86.2964 28.6C84.2636 28.6 82.9636 27.4891 82.9636 25.8345 82.9636 23.9436 84.2636 22.9509 87.2418 22.62L89.18 22.4309 89.18 22.1945C89.18 21.0836 88.3764 20.4218 87.1709 20.4218 86.0364 20.4218 85.28 21.0364 85.1145 22.1473L83.0345 22.1473C83.2945 20.28 84.8073 18.7436 87.1709 18.7436 89.5582 18.7436 91.26 20.0909 91.26 22.4309L91.26 28.4345 89.18 28.4345 89.18 27.04C88.7545 27.8909 87.5964 28.6 86.2964 28.6ZM85.02 25.74C85.02 26.4964 85.6345 26.9455 86.6273 26.9455 88.14 26.9455 89.1564 25.74 89.1564 24.2273L89.1564 23.9673 87.3127 24.2036C85.7055 24.3927 85.02 24.7945 85.02 25.74Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M98.7527 20.8C98.6582 20.7527 98.3982 20.7291 98.1618 20.7291 96.6727 20.7291 95.5145 21.9582 95.5145 24.8418L95.5145 28.4345 93.4582 28.4345 93.4582 18.8855 95.5145 18.8855 95.5145 20.3509C96.0818 19.3345 97.2164 18.7436 98.2564 18.7436 98.54 18.7436 98.6818 18.7909 98.7527 18.7909L98.7527 20.8Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M104.071 28.6C102.251 28.6 100.904 27.4891 100.904 25.4091L100.904 20.5873 99.3436 20.5873 99.3436 18.8855 100.904 18.8855 100.904 16.5218 102.984 16.5218 102.984 18.8855 105.324 18.8855 105.324 20.5873 102.984 20.5873 102.984 25.2436C102.984 26.26 103.504 26.78 104.331 26.78 104.662 26.78 105.064 26.7091 105.395 26.5909L105.395 28.3636C104.993 28.5291 104.52 28.6 104.071 28.6Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M115.345 28.6C112.485 28.6 110.405 26.5436 110.405 23.66 110.405 20.7764 112.462 18.7436 115.345 18.7436 118.205 18.7436 120.285 20.7764 120.285 23.66 120.262 26.5436 118.205 28.6 115.345 28.6ZM115.345 26.8036C117.024 26.8036 118.182 25.5036 118.182 23.6364 118.182 21.7927 117.024 20.5164 115.345 20.5164 113.691 20.5164 112.509 21.7927 112.509 23.6364 112.509 25.5273 113.691 26.8036 115.345 26.8036Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M122.578 17.9636C122.578 15.8127 123.949 14.7255 125.745 14.7255 126.195 14.7255 126.667 14.7964 126.998 14.9382L126.998 16.7345C126.715 16.5927 126.336 16.5218 125.982 16.5218 125.178 16.5218 124.658 17.0418 124.658 18.0818L124.658 18.8855 126.998 18.8855 126.998 20.5873 124.658 20.5873 124.658 28.4345 122.578 28.4345 122.578 20.5873 121.018 20.5873 121.018 18.8855 122.602 18.8855 122.602 17.9636Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M77.0073 50.8891C74.1236 50.8891 72.0436 49.2818 71.7836 46.3036L73.9582 46.3036C74.1473 48.1 75.3764 48.9745 76.9836 48.9745 78.4491 48.9745 79.4655 48.2655 79.4655 47.1309 79.4655 44.0109 72.1855 45.7364 72.1855 40.9382 72.1855 38.74 74.1 37.2982 76.6527 37.2982 79.4418 37.2982 81.2382 38.7873 81.5455 41.2455L79.3709 41.2455C79.1345 39.9691 78.0945 39.2127 76.6527 39.2127 75.2818 39.2127 74.4073 39.8273 74.4073 40.8436 74.4073 43.5382 81.7109 41.86 81.7109 46.9891 81.7345 49.3527 79.7727 50.8891 77.0073 50.8891Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M87.9036 50.8891C85.0436 50.8891 82.9636 48.8327 82.9636 45.9491 82.9636 43.0655 85.02 41.0327 87.9036 41.0327 90.7636 41.0327 92.8436 43.0655 92.8436 45.9491 92.8436 48.8327 90.7636 50.8891 87.9036 50.8891ZM87.9036 49.0927C89.5818 49.0927 90.74 47.7927 90.74 45.9255 90.74 44.0818 89.5818 42.8055 87.9036 42.8055 86.2491 42.8055 85.0673 44.0818 85.0673 45.9255 85.0673 47.8164 86.2491 49.0927 87.9036 49.0927Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M94.5927 54.1745 94.5927 41.1509 96.6727 41.1509 96.6727 42.4745C97.2164 41.5764 98.4455 40.9855 99.7455 40.9855 102.582 40.9855 104.473 42.9236 104.473 45.9255 104.473 48.9273 102.605 50.8655 99.7455 50.8655 98.4455 50.8655 97.2164 50.2745 96.6727 49.3764L96.6727 54.1745 94.5927 54.1745ZM99.5327 49.0927C101.187 49.0927 102.369 47.7927 102.369 45.9491 102.369 44.0818 101.164 42.8055 99.5327 42.8055 97.8545 42.8055 96.6964 44.0818 96.6964 45.9491 96.6964 47.7927 97.8545 49.0927 99.5327 49.0927Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M106.245 50.7236 106.245 41.1745 108.302 41.1745 108.302 42.64C108.845 41.6709 109.98 41.0327 111.185 41.0327 111.587 41.0327 111.965 41.08 112.273 41.2218L112.273 43.2073C111.847 43.0182 111.375 42.9709 110.996 42.9709 109.507 42.9709 108.302 44.2945 108.302 47.06L108.302 50.7473 106.245 50.7473Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M116.244 50.8891C114.211 50.8891 112.911 49.7782 112.911 48.1236 112.911 46.2327 114.211 45.24 117.189 44.9091L119.127 44.72 119.127 44.4836C119.127 43.3727 118.324 42.7109 117.118 42.7109 115.984 42.7109 115.227 43.3255 115.062 44.4364L112.982 44.4364C113.242 42.5691 114.755 41.0327 117.118 41.0327 119.505 41.0327 121.207 42.38 121.207 44.72L121.207 50.7236 119.127 50.7236 119.127 49.3291C118.725 50.18 117.544 50.8891 116.244 50.8891ZM114.991 48.0291C114.991 48.7855 115.605 49.2345 116.598 49.2345 118.111 49.2345 119.127 48.0291 119.127 46.5164L119.127 46.2564 117.284 46.4927C115.653 46.6818 114.991 47.06 114.991 48.0291Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M132.104 50.8891C129.22 50.8891 127.14 49.2818 126.88 46.3036L129.055 46.3036C129.244 48.1 130.473 48.9745 132.08 48.9745 133.545 48.9745 134.562 48.2655 134.562 47.1309 134.562 44.0109 127.282 45.7364 127.282 40.9382 127.282 38.74 129.196 37.2982 131.749 37.2982 134.538 37.2982 136.335 38.7873 136.642 41.2455L134.467 41.2455C134.231 39.9691 133.191 39.2127 131.749 39.2127 130.378 39.2127 129.504 39.8273 129.504 40.8436 129.504 43.5382 136.807 41.86 136.807 46.9891 136.807 49.3527 134.845 50.8891 132.104 50.8891Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M142.362 50.8891C140.542 50.8891 139.195 49.7782 139.195 47.6982L139.195 42.8764 137.635 42.8764 137.635 41.1745 139.195 41.1745 139.195 38.8109 141.275 38.8109 141.275 41.1745 143.615 41.1745 143.615 42.8764 141.275 42.8764 141.275 47.5327C141.275 48.5491 141.795 49.0691 142.622 49.0691 142.953 49.0691 143.355 48.9982 143.685 48.88L143.685 50.6527C143.307 50.8182 142.835 50.8891 142.362 50.8891Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M149.358 50.8891C146.427 50.8891 144.489 48.8327 144.489 45.9491 144.489 43.0655 146.498 41.0091 149.24 41.0091 152.265 41.0091 154.133 43.3727 153.755 46.3273L146.569 46.3273C146.711 48.1 147.775 49.14 149.311 49.14 150.516 49.14 151.32 48.5491 151.58 47.6509L153.66 47.6509C153.305 49.5655 151.675 50.8891 149.358 50.8891ZM146.664 44.7673 151.604 44.7673C151.58 43.4909 150.611 42.7109 149.24 42.7109 147.893 42.6873 146.971 43.3964 146.664 44.7673Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M155.575 50.7236 155.575 41.1745 157.631 41.1745 157.631 42.64C158.175 41.6709 159.309 41.0327 160.515 41.0327 160.916 41.0327 161.295 41.08 161.602 41.2218L161.602 43.2073C161.176 43.0182 160.704 42.9709 160.325 42.9709 158.836 42.9709 157.631 44.2945 157.631 47.06L157.631 50.7473 155.575 50.7473Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M162.878 50.7236 162.878 41.1745 164.935 41.1745 164.935 50.7236 162.878 50.7236ZM163.918 39.5909C163.162 39.5909 162.595 39.0473 162.595 38.2909 162.595 37.5582 163.162 36.9909 163.918 36.9909 164.675 36.9909 165.242 37.5345 165.242 38.2909 165.242 39.0473 164.675 39.5909 163.918 39.5909Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
                <Path
                  d="M170.205 50.8891C168.173 50.8891 166.873 49.7782 166.873 48.1236 166.873 46.2327 168.173 45.24 171.151 44.9091L173.089 44.72 173.089 44.4836C173.089 43.3727 172.285 42.7109 171.08 42.7109 169.945 42.7109 169.189 43.3255 169.024 44.4364L166.944 44.4364C167.204 42.5691 168.716 41.0327 171.08 41.0327 173.467 41.0327 175.169 42.38 175.169 44.72L175.169 50.7236 173.089 50.7236 173.089 49.3291C172.664 50.18 171.482 50.8891 170.205 50.8891ZM168.929 48.0291C168.929 48.7855 169.544 49.2345 170.536 49.2345 172.049 49.2345 173.065 48.0291 173.065 46.5164L173.065 46.2564 171.222 46.4927C169.615 46.6818 168.929 47.06 168.929 48.0291Z"
                  fill="#030303"
                  fill-rule="nonzero"
                  fill-opacity="1"
                  transform="matrix(1.00217 0 0 1 80 66)"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export const PDFDivider: React.FC<{ color: string }> = ({ color }) => (
  <Svg style={styles.line}>
    <Rect x="0" y="0" width="100" height="4" rx="2" ry="2" fill={color} />
  </Svg>
);

const getColumnPadding = (index: number) => {
  if (index === 0) {
    return {
      paddingLeft: '30pt',
      paddingRight: '15pt',
    };
  }
  if (index === 2) {
    return {
      paddingRight: '30pt',
      paddingLeft: '15pt',
    };
  }
  return {
    paddingLeft: '15pt',
    paddingRight: '15pt',
  };
};
export const PDFColumnContainer: React.FC<Omit<pdf.ViewProps, 'index'> & { index: number }> = ({
  children,
  index,
  ...props
}) => (
  <View style={{ ...styles.columnContainer, ...getColumnPadding(index) }} {...props}>
    {children}
  </View>
);

export const PDFColumnTextContainer: React.FC<{ wrap?: boolean }> = ({ children, ...props }) => (
  <View style={styles.columnTextContainer} {...props}>
    {children}
  </View>
);

export const PDFColumnImageContainer: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.columnImageContainer} {...props}>
    {children}
  </View>
);

export const PDFTableTextShort: React.FC<pdf.TextProps> = ({ ...props }) => (
  <Text style={styles.tableTextShort} {...props}>
    {props.children}
  </Text>
);

export const PDFDetailsHeading: React.FC<pdf.TextProps> = ({ ...props }) => (
  <View style={styles.detailsHeading}>
    <PDFTableDot size={4} />
    <Text {...props}> {props.children}</Text>
  </View>
);

const basicTextStyle = {
  fontSize: '12pt',
  lineHeight: '1.4',
};

export const PDFBasicBoldText: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text
    style={{
      ...basicTextStyle,
      fontWeight: 500,
    }}
    {...props}>
    {children}
  </Text>
);

export const PDFBasicText: React.FC<pdf.TextProps> = ({ children, ...props }) => (
  <Text style={basicTextStyle} {...props}>
    {children}
  </Text>
);

export const PDFRow: React.FC<pdf.ViewProps> = ({ children, ...props }) => (
  <View style={styles.row} {...props}>
    {children}
  </View>
);
