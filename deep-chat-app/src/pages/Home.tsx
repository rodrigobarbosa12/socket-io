import React, { useEffect, useState, ReactElement } from 'react';
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
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import {
  connect,
  subscribeToNotification,
  subscribeToAuth,
  subscribeWarn,
} from '../services/socket';

interface ResponseUser {
  message: string;
  socketId: string;
}

interface Subscribe {
  message: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: Props): ReactElement => {
  const [nickName, setNickName] = useState<string>('');

  const handleLogin = () => {
    if (!nickName) {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Nickname is mandatory',
      });
      return;
    }

    connect(nickName);
  };

  useEffect(() => {
    subscribeToAuth((data: ResponseUser) => {
      Toast.show({ type: 'success', text1: data.message });
      setNickName('Opa');

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Chat',
            params: { socketId: data.socketId },
          },
        ],
      });
    });

    subscribeToNotification((data: Subscribe) => {
      Toast.show({ type: 'success', text1: data.message });
    });

    subscribeWarn((data: ResponseUser) => {
      Toast.show({ type: 'info', text1: 'Warning', text2: data.message });
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
              InputRightElement={(
                <Button
                  ml={1}
                  roundedLeft={0}
                  roundedRight="md"
                  onPress={handleLogin}
                >
                  <Text fontSize="lg">Entrar</Text>
                </Button>
              )}
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
