import React, { useState } from 'react';
import { Card } from 'react-native-elements';
import {ScrollView, Text, StyleSheet, Button, View, Image } from 'react-native';
import { Dimensions } from "react-native";

const apikey = 'fb18ffc599aa5ac4e5873598551876ea'; // taken from developer.marvel.com
const hash = '05f1f52658705d5a70dbf8ba3efaeb9a'; //md5((ts+apikey+secretapikey))
const baseURL = 'http://gateway.marvel.com';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

var comicContainerList = [_comicObject];

//for listing comics of the selected hero. Each comic item in the list should display cover, issue number, name and price. I want to be able to change my favorite hero
function _comicObject(name, displayCoverImg, issueNumber, price)
{
        this.name = name;
        this.displayCoverImg = displayCoverImg;
        this.issueNumber = issueNumber;
        this.price = price;
}
    
    

function comicsFinder (characterName)
{
    //Makes api requests, first with character name, second with the returned character ID. Updates the comic list for requested character 
    const  character  = characterName;
    var firstShot = handleSubmit(character);
    function handleSubmit(character) 
    {
        // First request to the interface. Calls the handleID response on returned characterID.
        fetch(`${baseURL}/v1/public/characters?name=${character}&ts=1&apikey=${apikey}&hash=${hash}`)
        .then((response) => response.json())
        .then((responseJson) => {
            id = responseJson.data.results[0].id;
            return handleIdResponse(id);
      }).catch((error) => {
          console.error(error);
      });
    }

    function handleIdResponse(characterId)
    {
        // Requests comics from the interface. Modifies comicContainerList;
        fetch(`${baseURL}/v1/public/characters/${characterId}/comics?&ts=1&apikey=${apikey}&hash=${hash}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var N = responseJson.data.results.length;
            var c = 0;
            for (var i = 0; i < N; i++)
            {
                if (responseJson.data.results[i].images.length != 0)
                //Some comics don't have display cover.
                {
                    var newComic = new _comicObject;
                    newComic.name =  responseJson.data.results[i].title;
                    newComic.displayCoverImg = `${responseJson.data.results[i].images[0].path}.${responseJson.data.results[i].images[0].extension}`;
                    newComic.issueNumber = responseJson.data.results[i].issueNumber;
                    newComic.price = responseJson.data.results[i].prices[0].price;
                    comicContainerList[c] = {newComic};
                    c++;
                }
            }
        })
        .catch((error) => 
        {
            console.error(error);
        });

        
    }
if(comicContainerList.length > 1)
{
    // Request succesful.
    console.log(comicContainerList.length)
}
else
{
    console.log("NO")
}

}

function ComicCardMaker () {    
    // renders a card list which taken from global comicObject array.
    var listItems ;

   if ( comicContainerList.length < 2)
   // If comicObject array is not completed or request returned unsuccesful
   {
    () => navigation.navigate('Comics', {
        character: character
      })
       listItems = comicContainerList.map((comic, i) =>
       <View style={styles.notFound}>
           <Image
            style = {{height:150,width:250,justifyContent:'center'}}
            source = {require ('../images/Marvel-Logo.jpg')}
            />  
       </View>
       );
   }
   else
   {
       if ( comicContainerList[2].newComic )
       //second check
       {
        listItems = comicContainerList.map((comic, i) =>

        <View key = {i}
        style=
        {{
        backgroundColor: '#98955c',
        color : '#fff',
        }}>
            <Card   key = {i} 
            containerStyle={{
                borderColor: '#12354',
                color : '#fff',
                shadowColor: '#470000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                elevation: 1,
                borderRadius: 4,
                overflow: 'hidden',
            }}>
                <Card.Title>{comic.newComic.name}</Card.Title>
                
                <View key={i}>
                    <Image
                    style = {styles.stretch}
                    source={{uri: `${comic.newComic.displayCoverImg}`}}
                    />
                    <Text style={styles.text}>{comic.newComic.price}$ Issue Number = {comic.newComic.issueNumber}</Text>
                </View>            
            </Card>
        </View>
        );
       }
   }
   return (
    <View>
        {listItems}
    </View>
   );
}



export default function Comics ({route, navigation}) {
    // send the character name to comicFinder to update the global comics array.
    // Renders the comics page. If no comic array received, displays MARVEL LOGO.
    const { character } = route.params;
   comicsFinder(character);
   return (
   <ScrollView style={styles.general}>
       <ComicCardMaker/>
       <Button
       style = {styles.buttons}
       title = "refresh"
       onPress = {() => navigation.navigate('Comics', {
           character: character
           })}/>
        
    </ScrollView>
)
}

const styles = StyleSheet.create({
    bgImg:
    {
        width: width,
        backgroundColor: '#98955c',
        flex:1
    },
    buttons:{
        color: 'red',
    },
    card:
    {
        borderRadius: 10,
        backgroundColor: '#000',
    },
    text:
    {
        flexWrap: 'wrap',
        alignContent: 'space-between',
    },
    stretch: 
    {
        minWidth: '80%',
        maxWidth: 500,
        minHeight: 150,
        maxHeight: 400,
        
    },
    cover: 
    {
        minWidth: '80%',
        maxWidth: 300,
        minHeight: 150,
        maxHeight: 100,
        flex:1,
        resizeMode: 'stretch',
    },
    general:
    {
        width: width,
        height: 100
    },
    notFound:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    }


})

