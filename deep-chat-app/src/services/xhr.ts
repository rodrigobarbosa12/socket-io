import axios from 'axios';

const xhr = axios.create({
  baseURL: 'http://192.168.1.90:3334',
//   paramsSerializer: qs.stringify,
});

xhr.interceptors.response.use((response) => response, (error) => {
  // if (error.response && error.response.status === 401) {
  //   return error.response;
  // }
  return Promise.reject(error);
});

export default xhr;
