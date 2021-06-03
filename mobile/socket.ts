import socketio from 'socket.io-client';

const API = 'http://192.168.1.189:3333';

const socket = socketio(API, {
  autoConnect: false,
  // path: '/'
});

const subscribeToNotification = (subscribeFunction: Function) => {
  socket.on('notification', subscribeFunction);
};

const connect = () => {
  socket.io.opts.query = {
    userId: 'Rodrigo Barbosa'
  };

  socket.connect();
};

const disconnect = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export {
  connect,
  disconnect,
  subscribeToNotification,
};
