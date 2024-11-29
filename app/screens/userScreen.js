import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

export default function UserProfileScreen() {
  const [user, setUser] = useState(null); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dummy user data (replace with real API response later)
        const dummyUser = {
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: '********', // For security, avoid displaying passwords
          firstName: 'John',
          lastName: 'Doe',
        };
        setUser(dummyUser); // Set dummy data
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once

  const handleInputChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value, // Dynamically update the user data
    }));
  };

  const handleSave = () => {
    // Implement save functionality, e.g., save to an API or local storage
    alert('User data saved!');
  };

  if (isLoading) {
    return <Text>Loading user data...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("")} />
    <View style={styles.container}>
      <Text style={styles.heading}>Edit User Profile</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={(text) => handleInputChange('username', text)}
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
          value={user.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry={true} // Hide password input
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={user.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={user.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
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
