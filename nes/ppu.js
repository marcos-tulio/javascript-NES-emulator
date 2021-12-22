//-------------------------------------------------------------
//                            PPU
//-------------------------------------------------------------
class NesPpu{

    constructor(){
        this.tbl_name    = [new Uint8Array(1024), new Uint8Array(1024)]
        this.tbl_palette =  new Uint8Array(32)
        //this.tbl_pattern = [new Uint8Array(4096), new Uint8Array(4096)]
    }

    cpuWrite(addr, data){
        switch (addr) {
            case 0x0000: // Control
                break;
            case 0x0001: // Mask
                break;
            case 0x0002: // Status
                break;
            case 0x0003: // OAM Address
                break;
            case 0x0004: // OAM Data
                break;
            case 0x0005: // Scroll
                break;
            case 0x0006: // PPU Address
                break;
            case 0x0007: // PPU Data
                break;
        }
    
        printLog("PPU cpu write 0x" + toHex(data) + " at address 0x"+ toHex(addr) )
    }

    cpuRead(addr, isReadOnly = false){
        let data = 0x00

        switch (addr) {
            case 0x0000: // Control
                break;
            case 0x0001: // Mask
                break;
            case 0x0002: // Status
                break;
            case 0x0003: // OAM Address
                break;
            case 0x0004: // OAM Data
                break;
            case 0x0005: // Scroll
                break;
            case 0x0006: // PPU Address
                break;
            case 0x0007: // PPU Data
                break;
        }
    
        printLog("PPU cpu read 0x" + toHex(data) + " at address 0x" + toHex(addr))

        return data
    }

    write(addr, data){
        addr &= 0x3FFF

        if (this.cart.ppuWrite(addr, data) != undefined){
            // do nothing
        }

    }

    read(addr, isReadOnly = false){
        let data = 0x00
        addr &= 0x3FFF

        let cart_read = this.cart.ppuRead(addr)

        if (cart_read != undefined){
            data = cart_read
        }

        printLog("NES_PPU read 0x" + toHex(data) + " at address 0x" + toHex(addr) )
        return data
    }

    setCartridge(cart){
        printLog("Cartridge as inserted in NES_PPU")

        this.cart = cart
    }

    clock(){}
}