import React from 'react';
import {
  Stack,
  Input,
  Box,
  Button,
  FlatList,
  Text,
} from 'native-base';

const Chat = () => {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  return (
    <Stack flex={1} bg="deep.bg" alignItems="center" justifyContent="space-between">
      <FlatList
        data={data}
        mt={9}
        mb={1}
        renderItem={({ item }) => (
          <Box px={5} py={2} rounded="md" my={2} bg="primary.300">
            {item.title}
          </Box>
        )}
        keyExtractor={(item) => item.id}
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
              onPress={() => console.warn('msg')}>
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
