import socketio from 'socket.io-client';

const API = 'http://192.168.1.90:3334';

const socket = socketio(API, {
  autoConnect: false,
  // path: '/'
});

const subscribeToNotification = (subscribeFunction: (x: any) => void) => {
  socket.on('notification', subscribeFunction);
};

const showUsersOnline = (subscribeFunction: (x: any) => void) => {
  socket.on('users-online', subscribeFunction);
};

const subscribeToChat = (subscribeFunction: (x: any) => void) => {
  socket.on('chat', subscribeFunction);
};

const subscribeToAuth = (subscribeFunction: (x: any) => void) => {
  socket.on('auth', subscribeFunction);
};

const subscribeWarn = (subscribeFunction: (x: any) => void) => {
  socket.on('warn', subscribeFunction);
};

const connect = (nickName: string) => {
  disconnect();

  socket.io.opts.query = {
    nickName
  };

  socket.connect();
};

const disconnect = () => {
  if (socket.connected) {
    console.warn('Desconectar');
    socket.disconnect();
  }
};

export {
  connect,
  disconnect,
  subscribeToChat,
  showUsersOnline,
  subscribeToNotification,
  subscribeToAuth,
  subscribeWarn,
};
