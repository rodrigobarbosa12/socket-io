import { Server } from 'socket.io';

interface User {
  socketId: string,
  nickName: string,
}

interface Chat {
  user: User;
  message: string;
}

/**
 * AS conexões podem ser salvas no banco de dados
 */
let users: User[] = [];

/**
 * Mensagens do chat
 */
let cat: Chat[] = [];

let io: Server;

export const setMessageInChat = (message: Chat) => {
  cat.push(message);
  showMessagesUsersOnline();
};

const disconnectUser = (socketId: string) => {
  users = users.filter((connection) => connection.socketId !== socketId);
};

const showMessagesUsersOnline = () => {
  users.forEach((connection) => {
    io.to(connection.socketId).emit('chat', cat);
  });
};

const verifyNickNameInUse = (nickName: string) => users
  .filter((connection) => connection.nickName === nickName);

const notifyAllUsers = (to: User[], data: Object) => {
  to.forEach((connection) => {
    io.to(connection.socketId).emit('notification', data);
  });
};

const showUsersOnline = () => {
  users.forEach((connection) => {
    io.to(connection.socketId).emit('users-online', users);
  });
};

const sendResponseUser = (
  socketId: string,
  status: string,
  message: string,
) => {
  io.to(socketId).emit(status, { message, socketId });
};

const setupWebsocket = (server: Server) => {
  io = server;
  
  io.sockets.on('connection', (socket: any) => {
    socket.on('disconnect', () => {
      disconnectUser(socket.id);
      showUsersOnline();
    });

    const { nickName } = socket.handshake.query;
    const { id: socketId } = socket;
    console.log('connection', socketId);

    if (verifyNickNameInUse(nickName).length) {
      sendResponseUser(socketId, 'warn', 'Nickname in use');
      return;
    }

    sendResponseUser(socketId, 'auth', 'Seja bem-vindo');
    notifyAllUsers(users, { message: `${nickName} entrou online` });

    users.push({ socketId: socketId, nickName });
    showUsersOnline();
  });
};

export default setupWebsocket;
