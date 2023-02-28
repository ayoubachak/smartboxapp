import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StatusBar, View} from 'react-native';
import {getUsers} from '../registration/utils';


const showUser = (user, index)=>{
    return <>
          <Text
            style={{
              textAlign: 'center',
              color: '#ffffff',
            }}
            key={index}
            >
            {user.fullName} {user.email} 
          </Text>
    </>
}

const Notifications = ()=>{

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const getAllUsers = async ()=>{
            let AllUsers = await getUsers();
            setUsers(AllUsers);
        }
        getAllUsers();

    },[]);

    return <>
    <SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#000000',
            height: '100%',
          }}>
            {users.map((user, index) => showUser(user, index))}
        </View>
      </SafeAreaView>
    </>
}

export default Notifications;