interface User {
  socketId: string,
  nickName: string,
}

/**
 * AS conexões podem ser salvas no banco de dados
 */
let users: User[] = [];

let io: any;

const verifyNickNameInUse = (nickName: string) => users
  .filter((connection) => connection.nickName === nickName);

const notifyAllUsers = (to: User[], data: Object) => {
  to.forEach((connection) => {
    io.to(connection.socketId).emit('notification', data);
  });
};

const sendResponseUser = (
  socketId: string,
  status: string,
  message: string,
) => {
  io.to(socketId).emit(status, { message });
};

const setupWebsocket = (server: any) => {
  io = server;
  
  io.on('connection', (socket: any) => {
    const { nickName } = socket.handshake.query;
    const { id: socketId } = socket;

    if (verifyNickNameInUse(nickName).length) {
      sendResponseUser(socketId, 'warn', 'Nick name in use');
      return;
    }

    sendResponseUser(socketId, 'auth', 'Seja bem-vindo');
    notifyAllUsers(users, { message: `${nickName} entrou online` });

    users.push({ socketId: socketId, nickName });
  });
};

export default setupWebsocket;
