import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../common/globalStyles';
import { isAndroid } from '../common/utils';

type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  ContactDetails: { contact: Contact };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    requestContactsPermission();
  }, []);

  const requestContactsPermission = async () => {
    if (isAndroid) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,

        {
          title: 'Contacts Permission',
          message: 'This app would like to view/edit your contacts.',
          buttonPositive: 'Accept',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loadContacts();
      }
    } else {
      loadContacts();
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('');
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={[globalStyles.primaryButton, globalStyles.mB20]}
        onPress={() => navigation.navigate('AddContact')}>
        <Text style={globalStyles.primaryButtonText}>Add Contact</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() =>
              navigation.navigate('ContactDetails', { contact: item })
            }>
            <View style={styles.contactInfo}>
              {item.thumbnailPath ? (
                <Image
                  source={{ uri: item.thumbnailPath }}
                  style={styles.contactPhoto}
                />
              ) : (
                <View style={styles.contactPhotoPlaceholder}>
                  <Text style={styles.contactInitials}>
                    {getInitials(item.givenName)}
                  </Text>
                </View>
              )}
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>
                  {item.givenName} {item.familyName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
  },
  contactText: {
    fontSize: 18,
    paddingVertical: 5,
    color: '#067A46',
    fontFamily: 'Agrandir, sans-serif',
  },
  contactItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   fontFamily: 'Agrandir, sans-serif',
  // },
  // contactItem: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#ccc',
  //   paddingVertical: 10,
  // },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactPhotoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInitials: {
    fontSize: 20,
    color: '#fff',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    color: '#067A46',
    fontFamily: 'Agrandir, sans-serif',
  },
});

export default HomeScreen;
