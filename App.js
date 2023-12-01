/* Arquivo Principal. Contém a Header do app e o Carrossel de Cards.
  Trainee: Marina Hermógenes Siqueira - Comp Junior;
  Tema: App de streaming de música.
*/

import { View, StatusBar, Text, FlatList, StyleSheet, Animated, Image, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen'; 
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Stack = createNativeStackNavigator();
const { width: screenWidth } = Dimensions.get('window');
const sliderWidth = screenWidth;
const itemWidth = screenWidth - 30;


const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const App = () => {
  const data = [];

  const carouselItems = [
    { title: "Lorde", text: "Melodrama", image: require('./src/lorde_card1.png') },
    { title: "Lana del Rey", text: "Norman f****** Rockwell", image: require('./src/lanadelrey_card2.jpg') },
    { title: "Nirvana", text: "Nevermind", image: require('./src/nirvana_card3.jpg') },
  ];
 
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [headerVisible, setHeaderVisible] = useState(true);
  
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp'
  })
  
  const imageScaleHeight = scrollOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [80, 34],
    extrapolate: 'clamp'
  })

  const buttonOpacity = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });
  
  const renderItem = ({item, index}) => {
    //.
  };

  const renderCarouselItem = ({item, index}) => {
    return (
      <ImageBackground source={item.image} style={styles.card}>
        <Text style={styles.title}>{ item.title }</Text>
        <Text style={styles.text}>{ item.text }</Text>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1  }}>
      <StatusBar backgroundColor={"#121212"} barStyle="light-content" translucent={false} />
      
      <Animated.View
        style={{
          opacity: buttonOpacity,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          width: '100%',
          height: headerScrollHeight,
          padding: 10,
          backgroundColor: "#c90000",
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
          
      <Animated.Image
        source={require("./src/logo.png")}
        style={{
          width: 100,
          height: imageScaleHeight,
          position: 'absolute',
          left: 15,
          top: 5,
        }}
        resizeMode="contain"
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, marginTop: 10 }}>
        <Animated.View style={{ opacity: buttonOpacity }}>
          <Image
            source={require('./src/profile.jpg')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              right: -170,
            }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
        
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 5 }}>
          <TouchableOpacity style={[styles.button, { width: 95 }]}>
            <Text style={styles.buttonText}>Descobrir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width:90 }]}>
            <Text style={styles.buttonText}>Procurar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: 140 }]}>
            <Text style={styles.buttonText}>Minhas Playlists</Text>
          </TouchableOpacity>
      </View>


      </Animated.View>

      <FlatList
        style={{ paddingTop: H_MAX_HEIGHT }}
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={ ({ item}) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}

        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollOffsetY } } },
        ], { useNativeDriver: false } )}
        scrollEventThrottle={16}
      />


      <Carousel
        data={carouselItems}
        renderItem={renderCarouselItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={{ marginTop: -300 }}
        swipeThreshold={-9} 
        loop={true}
        enableMomentum={false} 
      />

    </SafeAreaView>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

//ESTILOS (CONFIGURAÇÃO DE COR, FONTE, LARGURA, ETC)

const styles = StyleSheet.create({
  contentHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFF"
  },

  item: {
    height: 350,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  button: {
    height: 28,
    marginLeft: 20,
    padding: 5,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  buttonText: {
    color: '#c90000',
    fontFamily: 'Cantarell',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center', 
  },

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 250,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10, 
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },

  text: {
    fontSize: 15,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },

  image: {
    width: '100%',
    height: 100,
    borderRadius: 30,
  },
});