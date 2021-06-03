import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect, disconnect, subscribeToNotification } from './socket';

export default function App() {
  const setupWebsocket = () => {
    disconnect();

    connect();
  }

  useEffect(() => {
    subscribeToNotification((algo: any) => {
      console.warn(algo);
    });
  }, []);

  const tesetGet = async () => {
    setupWebsocket();
  }

  return (
    <View style={styles.container}>
      <Text>Chat com socket io</Text>
      <StatusBar style="auto" />
      <Button title="Enviar e receber" onPress={tesetGet} ></Button>
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
});
