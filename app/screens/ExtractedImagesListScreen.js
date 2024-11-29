import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";

const extractedImages = [
  { id: '1', imageName: 'Image1.png', extractedText: 'Hello World' },
  { id: '2', imageName: 'Image2.png', extractedText: 'React Native is awesome' },
  { id: '3', imageName: 'Image3.png', extractedText: 'Sample Text from Image' },
];

export default function ExtractedImagesListScreen() {
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("")} />
    <View style={styles.container}>
      <FlatList
        data={extractedImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.imageName}>Image Name: {item.imageName}</Text>
            <Text style={styles.extractedText}>Extracted Text: {item.extractedText}</Text>
          </View>
        )}
      />
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  extractedText: {
    fontSize: 14,
    marginTop: 8,
  },
});
