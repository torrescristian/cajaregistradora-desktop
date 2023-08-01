import escpos from 'escpos'
import escposUSB from 'escpos-usb'


export default function print() {
    try {
        
        escpos.USB = escposUSB
        
        const device = new escpos.USB()
        
        const options = { width: 56 }
        
        const printer = new escpos.Printer(device, options as any)
        
        device.open(error => {
            if (error) {
                console.log({ error })
                return;
            }
            printer
            .size(1, 1)
            .tableCustom([
                { text: "KEY_1", align: "LEFT", width: 0.5 },
                { text: "VALUE_1", align: "RIGHT", width: 0.5 },
                { text: "KEY_2", align: "LEFT", width: 0.5 },
                { text: "VALUE_2", align: "RIGHT", width: 0.5 },
            ] as any)
            .cut()
            .close()
        })
    } catch (error) {
        if (error.includes('Can not find printer')) {
            console.log('Error: Can not find printer')
        }
    }
}