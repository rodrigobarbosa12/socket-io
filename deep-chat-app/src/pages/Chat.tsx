import React, { useEffect, useState } from 'react';
import {
  Stack,
  Input,
  Box,
  Button,
  FlatList,
  Text,
} from 'native-base';
import { disconnect, showUsersOnline } from '../services/socket';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>
}

const Chat = ({ navigation }: Props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    showUsersOnline((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <Stack flex={1} bg="deep.bg" alignItems="center" justifyContent="space-between">
      <FlatList
        data={users}
        mt={9}
        mb={1}
        renderItem={({ item }) => (
          <Box px={5} py={2} rounded="md" my={2} bg="primary.300">
            {item.nickName}
          </Box>
        )}
        keyExtractor={(item) => item.socketId}
      />
      <Box mb={5}>
        <Input
          type="text"
          w="85%"
          size="lg"
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={() => {
                disconnect();
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
              }}
            >
              <Text fontSize="lg" >Enviar</Text>
            </Button>
          }
          placeholder="Digite uma mensagem"
        />
      </Box>
    </Stack>
  );
};

export default Chat;
