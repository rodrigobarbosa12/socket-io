import socketio from 'socket.io-client';

const API = 'http://192.168.1.90:3334';

const socket = socketio(API, {
  autoConnect: false,
  // path: '/'
});

const subscribeToNotification = (subscribeFunction: Function) => {
  socket.on('notification', subscribeFunction);
};

const subscribeWarn = (subscribeFunction: Function) => {
  socket.on('warn', subscribeFunction);
};

const connect = (nickName: string) => {
  socket.io.opts.query = {
    nickName
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
  subscribeWarn,
};
