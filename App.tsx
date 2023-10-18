import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Pressable } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

Amplify.configure(config);

const  App = () => {

  const [activeScreen, setActiveScreen] = useState('HOME');

  const color = '#b5b5b5';
  const activeColor = '#c5ff3b';

  return(
    <SafeAreaView style={styles.root}>
    <StatusBar backgroundColor="#101010" barStyle='light-content' />
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.topNavigation}>

      <Pressable onPress={() => setActiveScreen('HOME')}>
        <MaterialCommunityIcons name="cards" size={35} color={activeScreen == 'HOME' ? activeColor : color} />
      </Pressable>
        
      <Pressable onPress={() => setActiveScreen('CHAT')}>
        <MaterialCommunityIcons name="star-four-points" size={35} color={activeScreen == 'CHAT' ? activeColor : color} />
      </Pressable>

      <Pressable onPress={() => setActiveScreen('PROFILE')}>
      <FontAwesome name="user" size={35} color={activeScreen == 'PROFILE' ? activeColor : color} />
      </Pressable>

      </View>
      
      {activeScreen == 'HOME' && <HomeScreen />}
      {activeScreen == 'CHAT' && <MatchesScreen />}
      {activeScreen == 'PROFILE' && <ProfileScreen />}
      
    </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#222222',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
    backgroundColor: '#101010',
  }
})

const customTheme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
		backgroundColor: '#101010',
	},
  sectionHeaderText: {
		color: '#c5ff3b',
		fontSize: 24,
		fontWeight: '500',
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#c5ff3b',
    borderRadius: 10,    
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
		color: '#000',
		fontSize: 16,
	},
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
		color: '#c5ff3b',
	},
  input: {
    ...AmplifyTheme.input,
    borderRadius: 10,
		color: '#fefefe',
	},
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
		color: '#fefefe',
	},
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    borderRadius: 10,
		backgroundColor: '#404040',
  },
  linkUnderlay: {
		color: '#fefefe',
	},
  phoneInput: {
    ...AmplifyTheme.phoneInput,
		borderRadius: 10,
		color: '#fefefe',
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    color: '#fefefe',
	},
  signedOutMessage: {
    ...AmplifyTheme.signedOutMessage,
    color: '#fefefe',
	},
  picker: {
    ...AmplifyTheme.picker,
    color: '#fefefe',
	},

};

export default withAuthenticator(App, {theme: customTheme});