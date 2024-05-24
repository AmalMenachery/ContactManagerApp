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
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../common/globalStyles';
import { Colors } from '../common/colors';

type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  ContactDetails: { contact: Contact };
};

type AddContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddContact'
>;

const AddContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const navigation = useNavigation<AddContactScreenNavigationProp>();

  const addContact = () => {
    const newContact = {
      givenName: name,
      emailAddresses: [{ label: 'work', email }],
      phoneNumbers: [{ label: 'mobile', number: phone }],
      thumbnailPath: photo,
      hasThumbnail: photo ? true : false,
    };

    Contacts.addContact(newContact)
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

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={Colors.LIGHTER_GREY_60}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={Colors.LIGHTER_GREY_60}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor={Colors.LIGHTER_GREY_60}
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
        onPress={addContact}>
        <Text style={globalStyles.primaryButtonText}>Add Contact</Text>
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

export default AddContactScreen;
