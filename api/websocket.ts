interface User {
  socketId: string,
  nickName: string,
}

/**
 * AS conexões podem ser salvas no banco de dados
 */
let connectionsUsers: User[] = [];

let io: any;

const verifyNickNameInUse = (nickName: string) => connectionsUsers
  .filter((connection) => connection.nickName === nickName);

const notifyAllUsers = (to: User[], data: Object) => {
  to.forEach((connection) => {
    io.to(connection.socketId).emit('notification', data);
  });
};

const sendWarn = (socketId: string, message: string) => {
  io.to(socketId).emit('warn', { message });
};

const setupWebsocket = (server: any) => {
  io = server;
  
  io.on('connection', (socket: any) => {
    const { nickName } = socket.handshake.query;
    const { id: socketId } = socket;

    if (verifyNickNameInUse(nickName).length) {
      sendWarn(socketId, 'Nick name in use');
      return;
    }

    connectionsUsers.push({ socketId: socketId, nickName });

    notifyAllUsers(connectionsUsers, { message: `${nickName} entrou online` });
  });
};

export default setupWebsocket;
