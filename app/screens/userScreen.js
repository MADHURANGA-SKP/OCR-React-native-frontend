import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { useUser } from '../helpers/UserContext';
import axios from 'axios';

export default function UserProfileScreen() {
  const { user, setUserData } = useUser();
  const [userDetails, setuserDetails] = useState(null); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`http://localhost:8080/ocr/getuser?user_id=${user.user_id}`);
          setuserDetails(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    console.log('User details:', userDetails)
    fetchData();
  }, [user]); 

  const handleInputChange = (field, value) => {
    setuserDetails(prevUser => ({
      ...prevUser,
      [field]: value, 
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch('http://172.25.141.196:8080/ocr/updateuser', {
        user_id: user.user_id,
        user_name: userDetails.username,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        hashed_password: userDetails.password,
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
      <BackButton goBack={() => navigation.navigate("screens/HomeScreen")} />
      <View style={styles.container}>
        <Text style={styles.heading}>Edit User Profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={user.user_name}
            onChangeText={(text) => handleInputChange('user_name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={user.hashed_password}
            onChangeText={(text) => handleInputChange('hashed_password', text)}
            secureTextEntry={true} // Hide password input
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={user.first_name}
            onChangeText={(text) => handleInputChange('first_name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={user.last_name}
            onChangeText={(text) => handleInputChange('last_name', text)}
          />
        </View>
        <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
          >
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
