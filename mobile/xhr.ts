import axios from 'axios';

const xhr = axios.create({
    baseURL: 'http://192.168.1.190:3333',
});

export default xhr;
