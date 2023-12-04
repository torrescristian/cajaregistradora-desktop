import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import printOrder from './tickets/printOrder';
import printCommand from './tickets/printCommand';
import printInvoice from './tickets/printInvoice';

export default function createSocketServer(app) {
  const expressApp = express();
  const httpServer = createServer(expressApp);
  const io = new Server(httpServer, {});

  io.on('connection', (socket: Socket) => {
    try {
      console.log('Un cliente se ha conectado');

      socket.on('disconnect', (reason) => {
        console.log({ reason });
      });

      socket.on('print:order', (props) => {
        printOrder(JSON.parse(props));
      });

      socket.on('print:command', (props) => {
        printCommand(JSON.parse(props));
      });

      socket.on('print:invoice', (props) => {
        printInvoice(JSON.parse(props));
      });
    } catch (error) {
      console.log(error);
    }
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
