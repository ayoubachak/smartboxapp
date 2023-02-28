import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/icons/logo.png';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { resetUsers } from './registration/utils';

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    welcomeText: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 24,
      color: '#BF7A12',
      marginTop: 40,
      textAlign: 'center',
    },
    button: {
      backgroundColor: 'rgba(244, 217, 202, 0.29)',
      padding: 16,
      borderRadius: 8,
      marginTop: 40,
    },
    buttonText: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 18,
      color:"#BF7A12",
      textAlign: 'center',
      width: 250,
    },
  });
  


const WelcomeView = ()=> {
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

    const [resetUsersAction, setResetUsersAction] = useState(false);
    const [usersCleared, setUsersCleared] = useState(false);
    const [controlUsers, setControlUsers] = useState(false);
    const showResetUsersButton = ()=>{
      if(controlUsers){
        return <>
            <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setResetUsersAction(true)
                    console.log("Pressed")
                  }}
                >
                    <Text 
                    style={styles.buttonText}
                    >Reset Users</Text>
                </TouchableOpacity>
                {usersCleared?<Text>Users Cleared</Text>:<Text>Users were not cleared</Text>}
          </>
      }

    } 


    useEffect(() => {
      const reset = async ()=>{
        const result = await resetUsers();  
        if(result){
          setUsersCleared(true);
          setResetUsersAction(false);
        }else{
          setResetUsersAction(false);
          setUsersCleared(false)
        }
      }
      if(resetUsersAction){
        reset();
        console.log("reseting the users");
      }

    },[resetUsersAction])



    if (!fontsLoaded) {
      return <AppLoading />;
    }else{

    return (
        
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.welcomeText}>Get Things Done Smarter</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            {showResetUsersButton()}
        </View>
    );
  }

}


export default WelcomeView;