import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeView from './views/WelcomeView.js';
import RegistrationView from './views/registration/RegistrationView.js';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './views/registration/LoginView.js';
import { AuthProvider } from './context/AuthContext.js';
import AppStack from './views/AppStack.js';
import AuthStack from './views/AppStack.js';



const Stack = createStackNavigator();

export default function App() {
  
  
    return (

    <AuthProvider>
        <AppStack/>
    </AuthProvider>
  );
}
