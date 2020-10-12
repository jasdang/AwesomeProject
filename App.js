import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const handleClick = () => {
    console.log('Clicked');
  }
  return (
    <View style={styles.container}>
      <Text style={{color: '#888', fontSize: 18}}>To share a photo from your phone with a friend, just press the button below!</Text>
      <Button title='Click me' onPress={handleClick}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
