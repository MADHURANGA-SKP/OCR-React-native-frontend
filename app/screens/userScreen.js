import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import Button from "../../components/Button";
import { useUser } from '../helpers/UserContext';
import axios from 'axios';

export default function UserProfileScreen({ navigation }) {
  const { user } = useUser(); // Use only user from context
  const [userDetails, setUserDetails] = useState(null); // Bind form to userDetails
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and populate userDetails
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(
            `http://localhost:8080/ocr/getuser?user_id=${user.user_id}`
          );
          setUserDetails(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (field, value) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      [field]: value, // Update the corresponding field
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch('http://localhost:8080/ocr/updateuser', {
        user_id: userDetails.user_id, // Use userDetails for the updated data
        user_name: userDetails.user_name,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email,
        hashed_password: userDetails.hashed_password,
      });
      if (response.status === 200) {
        alert('User data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('There was an error saving the user data');
    }
  };

  if (isLoading) {
    return <Text>Loading user data...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Background>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.button}
      >
        <Text style={styles.topButtonText}>Home</Text>
      </Button>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit User Profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={userDetails?.user_name || ''}
            onChangeText={(text) => handleInputChange('user_name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={userDetails?.email || ''}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={userDetails?.hashed_password || ''}
            onChangeText={(text) => handleInputChange('hashed_password', text)}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={userDetails?.first_name || ''}
            onChangeText={(text) => handleInputChange('first_name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={userDetails?.last_name || ''}
            onChangeText={(text) => handleInputChange('last_name', text)}
          />
        </View>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          <Text style={styles.topButtonText}>Save Changes</Text>
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});
