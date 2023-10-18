import React from "react";
import { Text, ImageBackground, View, StyleSheet } from 'react-native';

const Card = props => {
    const {name, image, bio} = props.user;

    return (
    <View style={styles.card}>
     <ImageBackground
     source={{
      uri: image,
    }}
      style={styles.image}>
      <View style={styles.cardInner}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.bio}>{bio}</Text>
      </View>
      </ImageBackground>
    </View>
    )
}

const styles= StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#101010',
    
        shadowColor: '#858585',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.55,
        shadowRadius: 6.68,
    
        elevation: 11,
    },
    cardInner: {
      padding: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    name: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 15,
    },
    bio: {
      fontSize: 18,
      color: 'white',
      fontWeight: '400',
      lineHeight: 25,
      textShadowColor: 'rgba(0, 0, 0, 0.8)', 
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 15,
    },
    
  })

export default Card;