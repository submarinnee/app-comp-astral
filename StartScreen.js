/*
  Contém a tela de início do aplicativo. 
  Trainee: Marina Hermógenes Siqueira - CompJunior;
  Tema: App de streaming de música.
*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('./src/logo.png')} style={styles.logo} />
        <Image source={require('./src/astronauta_app.png')} style={styles.astronaut} />
      </View>
      <View style={styles.bottomContainer}>
        <Image source={require('./src/yourMusicApp.png')} style={styles.textImage} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('App')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },

    topContainer: {
      flex: 1,
      backgroundColor: 'red',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    bottomContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      position: 'absolute',
      top: 0,
      left: '30%',
      width: 150,
      resizeMode: 'contain', 
    },
      
    astronaut: {
      marginTop: 161, 
      width: 250, 
      height: 250, 
      resizeMode: 'contain', 

    },
         
    button: {
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      backgroundColor: 'red',
      borderRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 40,
    },

    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    textImage: {
      marginTop: -60,
      width: 320, 
      height: 200,
      left: -15,
      resizeMode: 'contain', 
    }
});
  
export default StartScreen;
