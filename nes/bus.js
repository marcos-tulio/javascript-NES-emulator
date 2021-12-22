//-------------------------------------------------------------
//                            CPU
//-------------------------------------------------------------
// This class extends BUS class from 6502 Emulator by Marcos Santos
//-------------------------------------------------------------
class NesBus extends Bus{
    
    constructor(cpu, ppu){
        super(cpu, 2048)

        this.ppu = ppu

        this.system_clock_counter = 0
    }

    write(addr, data){
        addr = forceUInt16(addr)
        data = forceUInt8(data)

        if (this.cart.cpuWrite(addr, data) != undefined){
            // do nothing

        } else if (addr >= 0x0000 && addr <= 0x1FFF){
            this.ram[addr & 0x07FF] = data
            printLog("NES_BUS write " + toHex(data) + " in ram at address " + toHex(addr))

        } else if (addr >= 0x2000 && addr <= 0x3FFF){
            printLog("NES_BUS call cpu write in NES_PPU at address " + toHex(addr))
            this.ppu.cpuWrite(addr & 0x0007, data)
        }

    }

    read(addr, isReadOnly = false){
        addr = forceUInt16(addr)
        let data = 0x00

        let cart_read = this.cart.cpuRead(addr)

        if (cart_read != undefined){
            data = cart_read

        } else if (addr >= 0x0000 && addr <= 0x1FFF){
            data = this.ram[addr & 0x7FF]

        } else if (addr >= 0x2000 && addr <= 0x3FFF){
            data = this.ppu.cpuRead(addr & 0x0007, isReadOnly)
        }

        printLog("NES_BUS read 0x" + toHex(data) + " at address 0x" + toHex(addr))
        return data
    }

    setCartridge(cart){
        printLog("Cartridge as inserted in NES_BUS")

        this.cart = cart
        this.ppu.setCartridge(cart)
    }

    reset(){
        printLog("NES_BUS as reseted!")

        this.cpu.reset()
    }

    clock(){}
}