import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeView from './WelcomeView.js';
import RegistrationView from './registration/RegistrationView.js';
import LoginView from './registration/LoginView.js';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notifications from './content/Notifications.js';



const Stack = createStackNavigator();

export default function AppStack() {
  return (

    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
      >

        <Stack.Screen
          name="Welcome"
          component={WelcomeView}
        />
        <Stack.Screen 
        name="Register" 
        component={RegistrationView} 
        />
        <Stack.Screen 
        name="Login" 
        component={LoginView} 
        />
        <Stack.Screen 
        name="Notifications" 
        component={Notifications} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
