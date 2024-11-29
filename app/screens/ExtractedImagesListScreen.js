import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView  } from 'react-native';
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import axios from 'axios';
import { useUser } from '../helpers/UserContext';

export default function ExtractedImagesListScreen() {
  const { user } = useUser();
  const [extractedImages, setExtractedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExtractedImages = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`http://localhost:8080/ocr/getusers?user_id=${user.user_id}`);
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
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />
      <ScrollView style={styles.container}>
        {extractedImages.length === 0 ? (
          <Text style={styles.noDataText}>No extracted data available.</Text>
        ) : (
          <FlatList
            data={extractedImages}
            keyExtractor={(item) => item.conversion_id.toString()}  // Ensure correct key extraction
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.imageName}>Image: {item.image_name}</Text>
                <Text style={styles.extractedText}>Extracted Text:</Text>
                <Text style={styles.textContent}>{item.extracted_text}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
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
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
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
  textContent: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
    lineHeight: 20,
  },
});
