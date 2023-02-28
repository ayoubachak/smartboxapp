import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import {addUser} from './utils';

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


const showError = (error) => {
    if(error !== ''){

    return <Text 
            style={styles.error}
        > {error}</Text>
    }else{
        return <></>
    }
}  

const RegistrationView = () => {
    
    const navigation = useNavigation();

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

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registerAction, setRegisterAction] = useState(false);
  

  const handleSubmit = () => {
    setRegisterAction(true);
  };

  useEffect(()=>{
    console.log("Entered the use effect hook for register action")
    const registerUser = async ()=>{
      if(fullName === '' || email === '' || password === '' || confirmPassword === '') {
        setError('Please fill in all fields');
      }else if(confirmPassword !== password) {
        setError('Passwords do not match');
      }else{
          setError('');
          let user = {fullName:fullName, email:email, password:password};
          console.log('Adding the user',user);
          let userAdded = await addUser(user);
          if(userAdded){
              navigation.navigate('Notifications');
          }else{
            setError('User already exists');
          }
      }
      setRegisterAction(false);
    }
    if(registerAction){
      registerUser();
    }
  }, [registerAction])

  if (!fontsLoaded) {
    return <AppLoading />;
    }else{
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome into your box !</Text>
        <Text style={styles.subtitle}>Let's help you meet your tasks</Text>
        <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            underlineColor="transparent"
        />
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
        <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            underlineColor="transparent"
        />
        
        {showError(error)}
        <Button 
        mode="contained" 
        onPress={handleSubmit} 
        style={styles.button}
        buttonColor='rgba(244, 217, 202, 0.29)'
        textColor='#BF7A12'
        >
            Register
        </Button>
        
        <Text style={styles.hint}>
            Already have an account? 
            <Text 
                style={styles.signin_button}
                onPress={() => navigation.navigate('Login', )}
            > Sign in</Text>
        </Text>
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
  signin_button:{
    color: "#AB3300",
    fontFamily: 'Poppins_800ExtraBold',
  },
  error:{
    color: "#FF0000",
    fontFamily: 'Poppins_800ExtraBold',
  }
});

export default RegistrationView;