import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { io } from 'socket.io-client';
import SocketIOClient from 'socket.io-client';

const  SocketTest = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (socket != null) return () => {}; 
    const url = 'ws://192.168.1.114:3000' 
    const newSocket = SocketIOClient(url);
    console.log('Connecting to WebSocket server ' + url)
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    setSocket(newSocket);
  }, []);

  const sendMessage = () => {
    console.log('Sending message: ' + inputText);
    if (socket) {
      socket.emit('message', inputText);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Chat</Text>
      <View style={styles.messageContainer}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.message}>
            {message}
          </Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
export default SocketTest;
