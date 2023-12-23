import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => {
    console.log('message: ', data);
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
