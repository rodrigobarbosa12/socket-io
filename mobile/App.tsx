import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { connect, disconnect, subscribeToNotification, subscribeWarn } from './socket';

export default function App() {
  const [nickName, setNickName] = useState('');
  const setupWebsocket = () => {
    disconnect();

    connect(nickName);
  }

  useEffect(() => {
    subscribeToNotification((response: any) => {
      Toast.show({ type: 'success', text1: response.message});
    });
  }, []);

  useEffect(() => {
    subscribeWarn((response: any) => {
      Toast.show({ type: 'info', text1: 'Warning', text2: response.message});
    });
  }, []);

  const tesetGet = async () => {
    setupWebsocket();
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Deep chat</Text>
        <StatusBar style="auto" />
        <TextInput
          style={{
            width: '35%',
            height: 100,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 0,
            color: '#424242',
          }}
          placeholder="Nick name"
          onChangeText={(value) => setNickName(value)}
        />
        <Button title="Entrar" onPress={tesetGet} ></Button>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
