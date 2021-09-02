import React, {
  useEffect,
  useState,
  useRef,
  ReactElement,
  MutableRefObject,
} from 'react';
import {
  Stack,
  Input,
  Box,
  HStack,
  Button,
  FlatList,
  Text,
  Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import AppBar from '../Components/AppBar';
import AvatarOnline from '../Components/Avatar';
import { showUsersOnline, subscribeToChat, disconnect } from '../services/socket';
import api from '../services/api';

interface ChatType {
  id: string;
  message: string;
  socketId: string;
}

interface User {
  nickName: string;
  socketId: string;
}

type RootStackParamList = {
  Chat: { socketId: string };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Chat'>
}

const Chat = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const { socketId } = params;

  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatType[]>([]);

  const ref: MutableRefObject<any> = useRef();

  const scrollToEnd = () => ref.current?.scrollToEnd({ animated: true });

  const handlerSendMessage = async () => {
    try {
      if (!message) {
        return;
      }

      await api.sendMessage({ message, socketId });
      scrollToEnd();
      setMessage('');
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    showUsersOnline((data: User[]) => {
      setUsers(data);
    });

    subscribeToChat((data: ChatType[]) => {
      setChat(data);
      scrollToEnd();
    });
  }, []);

  return (
    <>
      <AppBar
        onPressLogout={() => {
          disconnect();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}
      />
      <Stack flex={1} bg="deep.bg" alignItems="center" justifyContent="space-between">
        <Box mb={5} width="100%">
          <FlatList
            data={users}
            horizontal
            mt={2}
            py={1}
            ml={2}
            renderItem={({ item, index }) => (
              <AvatarOnline
                nickname={item.nickName}
                index={index}
              />
            )}
            keyExtractor={(item) => `users-${item.socketId}`}
          />
        </Box>

        <Box
          mb={5}
          flex={7}
          width="100%"
          px={4}
        >
          <FlatList
            ref={ref}
            data={chat}
            onLayout={scrollToEnd}
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
            InputRightElement={(
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                onPress={handlerSendMessage}
              >
                <Icon as={<MaterialIcons name="send" />} size="sm" color="white" />
              </Button>
            )}
            placeholder="Digite uma mensagem"
          />
        </Box>
      </Stack>
    </>
  );
};

export default Chat;
