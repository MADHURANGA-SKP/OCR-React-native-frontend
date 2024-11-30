import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView  } from 'react-native';
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import axios from 'axios';
import Header from "../../components/Header";
import { useUser } from '../helpers/UserContext';

export default function ExtractedImagesListScreen({ navigation }) {
  const { user } = useUser();
  const [extractedImages, setExtractedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExtractedImages = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`http://172.25.141.196:8080/ocr/getusers?user_id=${user.user_id}`);
          setExtractedImages(response.data);  
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && user.user_id) {
      fetchExtractedImages();
    }
  }, [user]);

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <Background>
      <Header>View Extracted Data</Header>
      <BackButton goBack={() => navigation.navigate("HometScreen")} />
      {extractedImages.length === 0 ? (
        <Text style={styles.noDataText}>No extracted data available.</Text>
      ) : (
        <FlatList
          data={extractedImages}
          keyExtractor={(item) => item.conversion_id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.imageName}>Image: {item.image_name}</Text>
              <Text style={styles.extractedText}>Extracted Text:</Text>
              <ScrollView style={styles.textBox}>
                <Text style={styles.textContent}>{item.extracted_text}</Text>
              </ScrollView>
            </View>
          )}
        />
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    marginBottom: 16,
    padding: 13,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderColor: '#58d68d',
    borderWidth: 2,
  },
  imageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  extractedText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#555',
  },
  textBox: {
    marginTop: 5,
    maxHeight: 70, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
  },
  textContent: {
    fontSize: 13,
    color: '#666',
    lineHeight: 15,
  },
});