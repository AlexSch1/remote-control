import { httpServer } from './http_server';
import WebSocket, { WebSocketServer } from 'ws';
import { controller } from './controller';
import {Commands} from "./enums";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const socketServer = new WebSocketServer({ port: 8080 });

socketServer.on('connection', (ws: WebSocket.WebSocket) => {
  ws.on('message', (msg) => {
    controller(<Commands>msg.toString(), ws);
  });
});
