import xhr from './xhr';

const sendMessage = (params: Object) => xhr.post('/send-message', params);

export default {
  sendMessage,
};
