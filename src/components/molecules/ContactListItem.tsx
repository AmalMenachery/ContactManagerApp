import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Contact } from 'react-native-contacts';
import { Colors } from '../../common/colors';

interface ContactListItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  onPress,
}) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('');
  };

  return (
    <TouchableOpacity style={styles.contactItem} onPress={onPress}>
      <View style={styles.contactInfo}>
        {contact.thumbnailPath ? (
          <Image
            source={{ uri: contact.thumbnailPath }}
            style={styles.contactPhoto}
          />
        ) : (
          <View style={styles.contactPhotoPlaceholder}>
            <Text style={styles.contactInitials}>
              {getInitials(contact.givenName)}
            </Text>
          </View>
        )}
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>
            {contact.givenName} {contact.familyName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
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
    color: Colors.WHITE,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontFamily: 'Agrandir, sans-serif',
  },
});

export default React.memo(ContactListItem);
