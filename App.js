import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform} from 'react-native';
import logo from './assets/logo.png'; 
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

const Stack = createStackNavigator();

export default function App() {
  return (    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen} options={{title:'Welcome'}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
)
}
export function HomeScreen() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({localUri: pickerResult.uri, remoteUri});
    } else {
      setSelectedImage({localUri: pickerResult.uri, remoteUri: null});
    }
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Sharing is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: selectedImage.localUri }} 
          style={styles.thumbnail}
        />

        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.button}>
          <Text style={styles.buttonText}>Clear photo</Text>
        </TouchableOpacity>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={ styles.logo}/>
      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
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
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: { 
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  }
});
