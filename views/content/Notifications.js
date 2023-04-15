import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StatusBar, View } from 'react-native';
import { getUsers } from '../registration/utils';
import WifiNotEnabled from './WifiNotEnabled';
import * as Network from 'expo-network';
import SocketTest from './SocketTest';

const showUser = (user, index) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        color: '#ffffff',
      }}
      key={index}>
      {user.fullName} {user.email}
    </Text>
  );
};

const Notifications = () => {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(true); // assuming initially connected to Wi-Fi

  useEffect(() => {
    const getAllUsers = async () => {
      let AllUsers = await getUsers();
      setUsers(AllUsers);
    };
    getAllUsers();

    // check if the wifi is connected or not
    // const unsubscribe = Network.addIpAddressListener((ipAddress) => {
    //   setIsConnected(true);
    //   console.log('IP address:', ipAddress);
    // });
    return () => {
      // unsubscribe();
    };
  }, []);

  
  if (!isConnected) {
    return <WifiNotEnabled />;
  }
  return (
    <SocketTest/>
    // <SafeAreaView>
    //   <View
    //     style={{
    //       justifyContent: 'center',
    //       backgroundColor: '#000000',
    //       height: '100%',
    //     }}>
    //     {users.map((user, index) => showUser(user, index))}
    //   </View>
    // </SafeAreaView>
  );
};

export default Notifications;
