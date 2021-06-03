interface ConnectionUser {
  socketId: string,
  userId: number,
}

/**
 * AS conexões podem ser salvas no banco de dados
 */
let connectionsUsers: ConnectionUser[] = [];

let io: any;

const setupWebsocket = (server: any) => {
  io = server;
  io.on('connection', (socket: any) => {
    const { userId } = socket.handshake.query;

    connectionsUsers.push({ socketId: socket.id, userId });

    sendMessage(getConnections(socket.id), { message: 'Deu certo hehe' });
  });
};

export const getConnections = (socketId: string) => connectionsUsers
  .filter((connection) => connection.socketId === socketId);

export const sendMessage = (to: ConnectionUser[], data: Object) => {
  to.forEach((connection) => {
    io.to(connection.socketId).emit('notification', data);
  });
};


export default setupWebsocket;
