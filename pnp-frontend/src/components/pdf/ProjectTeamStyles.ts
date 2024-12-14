import pdf from '@react-pdf/renderer';
const { StyleSheet } = pdf;

export const projectTeamStyles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    width: '100%',
    fontFamily: 'Haffer',
    paddingLeft: '142pt',
    paddingRight: '142pt',
    color: '#FFFFFF',
  },
  teamTable: {
    width: '100vw',
    marginTop: '12pt',
    paddingLeft: '142pt',
    paddingRight: '142pt',
    display: 'flex',
    flexDirection: 'column',
  },
  roleText: {
    fontSize: '17pt',
    textTransform: 'uppercase',
  },
  nameText: {
    maxWidth: '380pt',
    fontSize: '43pt',
  },
  levelText: {
    fontSize: '15pt',
  },
});
