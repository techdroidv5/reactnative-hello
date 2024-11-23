import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, World!</Text>
      <Text style={styles.subtitle}>Welcome to KSoft's first React Native app. With Change 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', 
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4b0082', // Indigo color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#556b2f', // Dark olive green
    textAlign: 'center',
  },
});

export default App;
