import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import React from 'react';
import users from '../../assets/data/users';

const MatchesScreen = () => {
  
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 27, color: '#fefefe', marginBottom: 20,}}>
        New Matches
      </Text>
      <View style={styles.users}>
      {users.map(user => (
        <View style={styles.user} key={user.id}>
           <Image source={{uri: user.image}} style={styles.image}/>
        </View>
      ))}
      </View>
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
    },
    users: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    user: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50,

        borderWidth: 2,
        padding: 5,
        borderColor: '#c5ff3b',
    
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
});

export default MatchesScreen;