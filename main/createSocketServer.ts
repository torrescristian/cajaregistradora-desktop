import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import printOrder from './tickets/printOrder';

export default function createSocketServer(app) {
  const expressApp = express();
  const httpServer = createServer(expressApp);
  const io = new Server(httpServer, {});

  io.on('connection', (socket: Socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('disconnect', (reason) => {
      console.log({ reason });
    });

    socket.on('print:order', (props) => {
      printOrder(JSON.parse(props));
    });
  });

  const port = 4000;

  httpServer
    .listen(port, () => {
      console.log(`Servidor Socket.IO escuchando en el puerto ${port}`);
    })
    .on('error', (error) => {
      console.log({ error });
      app.quit();
    });
}
