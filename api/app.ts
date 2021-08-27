import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import setupWebsocket from './websocket';

const app = express();
const server = new http.Server(app);

app.use(express.json());
app.use(cors());

setupWebsocket(new Server(server, { cors: { origin: '*' } }));

export default server;
