import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import Button from "../../components/Button";
import Profile from "../../components/profile";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import TextInput from "../../components/TextInput";
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
      <BackButton goBack={() => navigation.navigate("HometScreen")} />
        <Profile/>
      <Header>Edit User Profile</Header>
      
          <TextInput
            label="Username"
            value={userDetails?.user_name || ''}
            onChangeText={(text) => handleInputChange('user_name', text)}
          />
       

        
          <TextInput
            label="Email"
            value={userDetails?.email || ''}
            onChangeText={(text) => handleInputChange('email', text)}
          />
       

        
          <TextInput
            label="Password"
            value={userDetails?.hashed_password || ''}
            onChangeText={(text) => handleInputChange('hashed_password', text)}
            secureTextEntry={true}
          />
        

        
          <TextInput
            label="First Name"
            value={userDetails?.first_name || ''}
            onChangeText={(text) => handleInputChange('first_name', text)}
          />
        

        
          <TextInput
            label="Last Name"
            value={userDetails?.last_name || ''}
            onChangeText={(text) => handleInputChange('last_name', text)}
          />

        <Button
        mode="contained"
        onPress={async () => {
          const success = await onSignUpPressed(); 
          if (!success) {
            navigation.reset({
              index: 0,
              routes: [{ name: "RegisterScreen" }],
            });
          }
        }}
        style={{ marginTop: 24 }}
      >
        Save Changes
      </Button>
    
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
