import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import setupWebsocket from './websocket';
// import './database/connection';

const app = express();
const server = new http.Server(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
cors: { origin: '*' },
});

setupWebsocket(io);

export default server;
