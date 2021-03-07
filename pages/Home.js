import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ImageBackground, Button, Text, View } from 'react-native';


export default function Home({ navigation }) {
  //  Onboard Page. Renders welcome text and button to navigate.
  
    var welcomeTextTitle = 'Hero Comics';
    var welcomeText = 'Use this app to search your favorite super hero\'s comics.';
    var bgImg = require ('../images/background.png');

    return (
    <ImageBackground source={bgImg} style = {styles.bgImg} imageStyle= {{opacity:0.4}}>
        <View style = {styles.textContainer}>
          <Text style = {styles.titles}>{welcomeTextTitle}</Text>
          <Text style = {styles.text}>{welcomeText}</Text>
        </View>
        <Button style = {styles.buttons} title = "Let's Go!" onPress={() => navigation.navigate('HeroSearch')}/>       
        <StatusBar style="auto" />
    </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    bgImg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      backgroundColor: '#98955c'
    },
    buttons:{
      width: '50%',
      marginTop: '50',
      padding: 120,
    },
    text:{
      fontSize: 16,
      textAlign: 'center',
      color: '#fff',
      marginTop: 40
    },
    titles: {
      color: '#fff',
      fontSize :30,
      textAlign: 'center',
    },
    textContainer:{
      padding: 50,
    }
  });
  