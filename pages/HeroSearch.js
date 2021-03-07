import React, { useState } from 'react';
import { TextInput, StyleSheet, ImageBackground, Button, View } from 'react-native';

export default function HeroSearch({ navigation }) {
  //SearchPage. Takes input and send input as props to {Comics}
  //Navigates to {Comics}

    var bgImg = require ('../images/background.png');
    const [character, setcharacter] = useState('');
    
    return (
    <ImageBackground source={bgImg} style = {styles.bgImg} imageStyle= {{opacity:0.4}}>
      <View style = {styles.textContainer}>
        <TextInput
        style={styles.inputText}
        underlineColorAndroid = "transparent"
        placeholder = "Hulk, Thor.."
        placeholderTextColor = "#404040"
        autoCapitalize = "none"
        onChangeText = {text => setcharacter(text)}
        />
        <Button
        style = {styles.buttons}
        title = "Show the comics!"
        onPress = {() => navigation.navigate('Comics', {
          character: character
        })}
        />
      </View>
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
      fontSize: 10,
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
      padding: 50
    },
    inputText: {
      color: '#fff',
      borderColor:'#2296f3',
      borderWidth:4,
      fontSize: 22,
      marginBottom: 10,
      padding:5,
    }
  });
  