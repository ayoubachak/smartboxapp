import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import {verifyUser} from './utils';

import {
    useFonts,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  } from '@expo-google-fonts/poppins';
import { AuthProvider } from '../../context/AuthContext';


const showError = (error) => {
    if(error !== ''){

    return <Text 
            style={styles.error}
        > {error}</Text>
    }else{
        return <></>
    }
}  

const LoginView = () => {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_200ExtraLight,
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
        Poppins_900Black,
      });


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAction, setLoginAction] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();

  const handleSubmit = () => {
    setLoginAction(true);
  };
  // this should handle loggin in the user asynchronously
  useEffect(()=>{
    const logUser= async ()=>{
      let credentialsValid = await verifyUser(email, password);
      if (credentialsValid) {
        navigation.navigate('Notifications');
      }else{
          setError('Invalid email or password');
      }
      setLoginAction(false);
    }; 
    if(loginAction){
      logUser();
    }
  },[loginAction])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome back !</Text>
        <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            underlineColor="transparent"
        />
        <TextInput
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            underlineColor="transparent"
        />
        <Text style={styles.hint}>
            <Text 
                style={styles.login_button}
                onPress={() => navigation.navigate('Register')}
            > Forgot Password ?</Text>
        </Text>
        {showError(error)}
        <Button 
            mode="contained" 
            onPress={handleSubmit} 
            style={styles.button}
            buttonColor='rgba(244, 217, 202, 0.29)'
            textColor='#BF7A12'
        >
            Login
        </Button>
        </View>
    );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    color: "#FFD466",
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: "#FFD466",
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFD466",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },  
  button: {
    marginTop: 20,
    paddingVertical: 5,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
  },
  login_button:{
    color: "#AB3300",
    fontFamily: 'Poppins_800ExtraBold',
  },
  error:{
    color: "#FF0000",
    fontFamily: 'Poppins_800ExtraBold',
  }
});

export default LoginView;