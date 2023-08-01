import express from 'express'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io'
import print from './print'

export default function createSocketServer() {
    const expressApp = express()
    const httpServer = createServer(expressApp)
    const io = new Server(httpServer, {})

    io.on('connection', (socket: Socket) => {
        console.log('Un cliente se ha conectado')

        socket.on('disconnect', (reason) => {
            console.log({ reason })
        })

        socket.on('print', (props) => {
            console.log(JSON.stringify(props, null, 2))
            print()
        })
    })

    const port = 4000

    httpServer.listen(port, () => {
        console.log(`Servidor Socket.IO escuchando en el puerto ${port}`)
    })
}

