import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import globalStyles from '../common/globalStyles';
import { isAndroid } from '../common/utils';
import ContactListItem from '../components/molecules/ContactListItem';
import { ContactsAccessPermissionsAndroid } from '../common/constants';
import { Colors } from '../common/colors';

type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  ContactDetails: { contact: Contact };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    requestContactsPermission();
  });

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, []),
  );

  const requestContactsPermission = async () => {
    if (isAndroid) {
      const granted = await PermissionsAndroid.requestMultiple(
        ContactsAccessPermissionsAndroid,
      );
      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        loadContacts();
      }
    } else {
      loadContacts();
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then(phoneContacts => {
        setContacts(phoneContacts);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={[globalStyles.primaryButton, globalStyles.mB20]}
        onPress={() => navigate('AddContact')}>
        <Text style={globalStyles.primaryButtonText}>Add Contact</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            onPress={() => navigate('ContactDetails', { contact: item })}
          />
        )}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No contacts available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Agrandir, sans-serif',
    color: Colors.LIGHTER_GREY_60,
  },
  emptyMessage: {
    fontSize: 16,
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Agrandir, sans-serif',
  },
});

export default HomeScreen;
