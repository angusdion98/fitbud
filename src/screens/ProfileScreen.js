import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import React from 'react';
import { Auth } from 'aws-amplify';

const ProfileScreen = () => {

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>

        <Pressable onPress={() => Auth.signOut()} style={styles.button} >
         <Text style={styles.text}>Sign Out</Text>
        </Pressable>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1,
        padding: 10,
    },
    container: {
        padding: 10,
        justifyContent: 'center',
    },
    button: {
      backgroundColor: '#c5ff3b',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 20,
    },
    text: {
      fontSize: 16,
      fontWeight: 800,
      color: '#101010',
    },
    input: {
      margin: 10,
      barderBottomColor: '#fefefe',
      borderBottomWidth: 1,
    },
});

export default ProfileScreen;