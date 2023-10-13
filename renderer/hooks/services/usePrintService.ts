import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_LOCALHOST = 'http://localhost:4000'

enum EVENT_TYPE {
    PRINT_ORDER = 'print:order',
    PRINT_INVOICE = 'print:invoice',
    PRINT_COMMAND = 'print:command',
}

export default function usePrintService() {
    const [socket, setSocket] = useState<any>()

    useEffect(() => {
        setSocket(io(SOCKET_LOCALHOST))

        return () => {
            socket?.disconnect()
        }
    }, [])

    const _emit = (event: EVENT_TYPE) => socket.emit(event)
    
    const printOrder = () => _emit(EVENT_TYPE.PRINT_ORDER)
    
    const printInvoice = () => _emit(EVENT_TYPE.PRINT_INVOICE)

    const printCommand = () => _emit(EVENT_TYPE.PRINT_COMMAND)

    return {
        printCommand,
        printInvoice,
        printOrder
    }
}