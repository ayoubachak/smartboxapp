import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocketIOClient from 'socket.io-client';

const ControleView = () => {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (socket != null) return () => {};
    const url = 'ws://192.168.1.114:3000';
    const newSocket = SocketIOClient(url);
    console.log('Connecting to WebSocket server ' + url);
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    newSocket.on('message', (message) => {
      console.log('Message from WebSocket server: ' + message);
    });
    setSocket(newSocket);
  }, []);

  const sendMessage = () => {
    console.log('Sending message: ' + inputText);
    if (socket) {
      socket.emit('message', inputText);
    }
  };

  const isConnected = (soc) => soc?.connected;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'red',
          borderWidth: 2,
        }}
      >
        {/* Lock icon with state */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: isOpen ? 'green' : 'red',
          }}
        >
          {/* Icon */}
        </View>

        {/* Connection state */}
        <Text style={{ marginTop: 20 }}>
          {isConnected(socket) ? 'Connected' : 'Disconnected'}
        </Text>

        {/* Letter count with counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ marginRight: 10 }}>Count:</Text>
          <Text>{count}</Text>
          <Button
            onPress={() => setCount(0)}
            title="Reset"
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ControleView;
