import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import globalStyles from '../common/globalStyles';
import { Colors } from '../common/colors';

type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  ContactDetails: { contact: Contact };
};

type ContactDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactDetails'
>;
type ContactDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ContactDetails'
>;

const ContactDetailsScreen: React.FC = () => {
  const route = useRoute<ContactDetailsScreenRouteProp>();
  const navigation = useNavigation<ContactDetailsScreenNavigationProp>();
  const { contact } = route.params;
  const [name, setName] = useState(contact.givenName);
  const [email, setEmail] = useState(contact.emailAddresses[0]?.email || '');
  const [phone, setPhone] = useState(contact.phoneNumbers[0]?.number || '');
  const [photo, setPhoto] = useState<string | undefined>(
    contact.thumbnailPath || undefined,
  );

  const updateContact = () => {
    const updatedContact = {
      ...contact,
      givenName: name,
      emailAddresses: [{ label: 'work', email }],
      phoneNumbers: [{ label: 'mobile', number: phone }],
      thumbnailPath: photo,
      hasThumbnail: photo ? true : false,
    };
    Contacts.updateContact(updatedContact)
      .then(() => {
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const choosePhoto = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  // As this is an MVP, I did not bother to create Text, Button & Image Components in the components folder.
  // I would have created separate files for styles, and created a Theme for production codebase.
  // We don't have time in the 2 hours estimation given for the Task.
  // Updating the contact photo doesn't work due to the package, shortcomings.
  // We could patch the npm package in the real use-case, however that would too much in this context

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={Colors.LIGHTER_GREY}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={Colors.LIGHTER_GREY}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <View style={styles.photoButtonsContainer}>
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={choosePhoto}>
          <Text style={globalStyles.primaryButtonText}>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.primaryButton, globalStyles.mL10]}
          onPress={takePhoto}>
          <Text style={globalStyles.primaryButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      {photo && <Image source={{ uri: photo }} style={styles.imageStyle} />}
      <TouchableOpacity
        style={[globalStyles.primaryButton, globalStyles.mT20]}
        onPress={updateContact}>
        <Text style={globalStyles.primaryButtonText}>Update Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  photoButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  imageStyle: { width: 100, height: 100, marginTop: 20 },
});

export default ContactDetailsScreen;
