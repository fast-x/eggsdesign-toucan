import pdf from '@react-pdf/renderer';
const { StyleSheet } = pdf;

export const projectImagesGridStyles = StyleSheet.create({
  threeImageTopRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    height: '50vh',
    marginBottom: '3vh',
  },
  threeImageTopRowImageContainer: {
    height: '50vh',
    width: '48.5%',
    borderRadius: '2pt',
    overflow: 'hidden',
    marginTop: '-1vh',
  },
  threeImageTopRowImage: {
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
  },
  threeImageBottomContainer: {
    height: '50vh',
    width: '100%',
    borderTopLeftRadius: '2pt',
    overflow: 'hidden',
  },
  threeImageBottomImage: {
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
  },
  twoImageTopContainer: {
    width: '100%',
    height: '49vh',
    borderBottomLeftRadius: '2pt',
    overflow: 'hidden',
    marginBottom: '2vh',
    paddingRight: '142pt',
  },
  twoImageImage: {
    width: '50vw',
    height: '49vh',
    objectFit: 'cover',
  },
  twoImageBottomContainer: {
    width: '100%',
    height: '49vh',
    borderTopLeftRadius: '2pt',
    overflow: 'hidden',
    paddingRight: '142pt',
  },
  oneImageOuterContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '50vw',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '142pt',
  },
  oneImageContainer: {
    width: '100%',
    height: '40vh',
    borderRadius: '2pt',
    overflow: 'hidden',
  },
  oneImageImage: {
    width: '100%',
    height: '40vh',
  },
});
