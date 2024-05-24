import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#067A46',
    padding: 10,
    borderRadius: 5,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Agrandir, sans-serif',
  },
  header: {
    backgroundColor: '#F6FDE9',
    height: 100,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'Agrandir, sans-serif',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'Agrandir, sans-serif',
    fontWeight: 700,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mT20: { marginTop: 20 },
  mL10: { marginLeft: 10 },
  mB20: { marginBottom: 20 },
  mR10: { marginLeft: 10 },
});

export default globalStyles;
