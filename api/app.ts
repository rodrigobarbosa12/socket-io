import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import setupWebsocket from './src/websocket';
import routes from './src/routes';

const app = express();
const server = new http.Server(app);

app.use(express.json());
app.use(cors());
app.use(routes);

setupWebsocket(new Server(server, { cors: { origin: '*' } }));

export default server;
