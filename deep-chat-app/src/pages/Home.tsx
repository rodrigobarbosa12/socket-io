import React, { useEffect, useState } from 'react';
import {
  Center,
  Container,
  Heading,
  Input,
  Box,
  Button,
  Text,
} from 'native-base';
import Toast from 'react-native-toast-message';
import { connect, subscribeToNotification, subscribeToAuth, subscribeWarn } from '../services/socket';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: Props) => {
  const [nickName, setNickName] = useState<string>('');

  const handleLogin = () => {
    if (!nickName) {
      Toast.show({ type: 'info', text1: 'Warning', text2: 'Nickname is mandatory' });
      return;
    }

    connect(nickName);
  };

  useEffect(() => {
    subscribeToAuth((response: any) => {
      Toast.show({ type: 'success', text1: response.message});
      setNickName('Opa');

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Chat',
            params: { socketId: response.socketId}
          }
        ]
      });
    });

    subscribeToNotification((response: any) => {
      Toast.show({ type: 'success', text1: response.message});
    });

    subscribeWarn((response: any) => {
      Toast.show({ type: 'info', text1: 'Warning', text2: response.message});
    });
  }, []);
  
  return (
    <Center flex={1} alignItems="center" justifyContent="center" bg="deep.bg">
      <Center
        alignItems="center"
        justifyContent="center"
        bg="dark.100"
        border={1}
        borderRadius={10}
      >
        <Container marginX={10} marginY={20}>
          <Heading>
            Bem-vindo ao
            {' '} 
          </Heading>
          <Heading color="emerald.400">
            Deep chat
          </Heading>
  
          <Box mt={10}>
            <Input
              type="text"
              w="85%"
              size="lg"
              InputRightElement={
                <Button
                  ml={1}
                  roundedLeft={0}
                  roundedRight="md"
                  onPress={handleLogin}>
                  <Text fontSize="lg" >Entrar</Text>
                </Button>
              }
              onChangeText={(value) => setNickName(value)}
              placeholder="Nickname"
            />
          </Box>
        </Container>
      </Center>
    </Center>
  );
};

export default Home;