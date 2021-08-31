import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  Stack,
  Input,
  Box,
  HStack,
  Button,
  FlatList,
  Text,
} from 'native-base';
import { showUsersOnline, subscribeToChat } from '../services/socket';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import api from '../services/api';


type RootStackParamList = {
  Chat: { socketId: string };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Chat'>
}

const Chat = ({ navigation, route }: Props) => {
  const { params } = route;
  const { socketId } = params;

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handlerSendMessage = async () => {
    try {      
      if (!message) {
        return;
      }
      
      await api.sendMessage({ message, socketId });
      setMessage('');
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    showUsersOnline((users) => {
      setUsers(users);
    });

    subscribeToChat((response: any) => {
      setChat(response);
    });
  }, []);

  return (
    <Stack flex={1} bg="deep.bg" alignItems="center" justifyContent="space-between">
      <Box mb={5} flex={1} width="100%">
        <FlatList
          data={users}
          mt={9}
          mb={1}
          horizontal
          renderItem={({ item }) => (
            <Box
              px={10}
              py={2}
              rounded="md"
              my={2} bg="primary.300"
              ml={2}
            >
              {item.nickName}
            </Box>
          )}
          keyExtractor={(item) => item.socketId}
        />
      </Box>

      <Box
        mb={5}
        flex={Platform.OS === 'ios' ? 5 :  7}
        width="100%"
        px={4}
      >
        <FlatList
          data={chat}
          renderItem={({ item }) => (
            <Box alignItems={item.socketId === socketId ? 'flex-end' : 'flex-start'}>
              <HStack maxWidth="70%" mb={4}>
                <Text
                  fontSize="md"
                  bg={item.socketId === socketId ? '#0c4a6e' : '#0284c7'}
                  rounded="md"
                  px={3}
                  py={2}
                >
                  {item.message}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>

      <Box mb={5}>
        <Input
          type="text"
          w="85%"
          size="lg"
          value={message}
          onChangeText={(value) => setMessage(value)}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={handlerSendMessage}
            >
              <Text fontSize="lg">Enviar</Text>
            </Button>
          }
          placeholder="Digite uma mensagem"
        />
      </Box>
    </Stack>
  );
};

export default Chat;
