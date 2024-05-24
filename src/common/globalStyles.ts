import { StyleSheet } from 'react-native';
import { isIos } from './utils';
import { Colors } from './colors';

const globalStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  primaryButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Agrandir, sans-serif',
  },
  header: {
    backgroundColor: Colors.LIGHT_GREEN,
    height: isIos ? 100 : 50,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Agrandir, sans-serif',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'Agrandir, sans-serif',
    color: Colors.LIGHTER_GREY_60,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  mT20: { marginTop: 20 },
  mL10: { marginLeft: 10 },
  mB20: { marginBottom: 20 },
  mR10: { marginLeft: 10 },
});

export default globalStyles;
