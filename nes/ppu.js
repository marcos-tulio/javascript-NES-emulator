//-------------------------------------------------------------
//                            PPU
//-------------------------------------------------------------
class NesPpu{

    constructor(){
        // tables
        this.tbl_name    = [new Uint8Array(1024), new Uint8Array(1024)]
        this.tbl_palette =  new Uint8Array(32)
        //this.tbl_pattern = [new Uint8Array(4096), new Uint8Array(4096)]

        // Global variables
        this.cycle = 0
        this.scan_line = 0
        this.frame_complete = false

        // Sprites
        this.initSprites()
    }

    initSprites(){
        // Initial random palette
        for (let i = 0; i < this.tbl_palette.length; i++)
            this.tbl_palette[i] = (Math.random() * 100) & 0xFF

        // Sprites
        this.spr_screen      =  new Sprite(256, 240)
        this.spr_name_tbl    = [new Sprite(256, 240), new Sprite(256, 240)]
        this.spr_pattern_tbl = [new Sprite(128, 128), new Sprite(128, 128)]

        // Pixels
        this.pal_screen = [
            new Pixel( 84,  84,  84), new Pixel(0, 30, 116)   , new Pixel(8, 16, 144),
            new Pixel( 48,   0, 136), new Pixel(68, 0, 100)   , new Pixel(92, 0, 48),
            new Pixel( 84,   4,   0), new Pixel(60, 24, 0)    , new Pixel(32, 42, 0),
            new Pixel(  8,  58,   0), new Pixel(0, 64, 0)     , new Pixel(0, 60, 0),
            new Pixel(  0,  50,  60), new Pixel(0, 0, 0)      , new Pixel(0, 0, 0),
            new Pixel(  0,   0,   0), new Pixel(152, 150, 152), new Pixel(8, 76, 196),
            new Pixel( 48,  50, 236), new Pixel(92, 30, 228)  , new Pixel(136, 20, 176),
            new Pixel(160,  20, 100), new Pixel(152, 34, 32)  , new Pixel(120, 60, 0),
            new Pixel( 84,  90,   0), new Pixel(40, 114, 0)   , new Pixel(8, 124, 0),
            new Pixel(  0, 118,  40), new Pixel(0, 102, 120)  , new Pixel(0, 0, 0),
            new Pixel(  0,   0,   0), new Pixel(0, 0, 0)      , new Pixel(236, 238, 236),
            new Pixel( 76, 154, 236), new Pixel(120, 124, 236), new Pixel(176, 98, 236),
            new Pixel(228,  84, 236), new Pixel(236, 88, 180) , new Pixel(236, 106, 100),
            new Pixel(212, 136,  32), new Pixel(160, 170, 0)  , new Pixel(116, 196, 0),
            new Pixel( 76, 208,  32), new Pixel(56, 204, 108) , new Pixel(56, 180, 204),
            new Pixel( 60,  60,  60), new Pixel(0, 0, 0)      , new Pixel(0, 0, 0),
            new Pixel(236, 238, 236), new Pixel(168, 204, 236), new Pixel(188, 188, 236),
            new Pixel(212, 178, 236), new Pixel(236, 174, 236), new Pixel(236, 174, 212),
            new Pixel(236, 180, 176), new Pixel(228, 196, 144), new Pixel(204, 210, 120),
            new Pixel(180, 222, 120), new Pixel(168, 226, 144), new Pixel(152, 226, 180),
            new Pixel(160, 214, 228), new Pixel(160, 162, 160), new Pixel(0, 0, 0),
            new Pixel(  0,   0,   0)
        ]
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

    clock(){
        // Noise to test
        this.spr_screen.setPixel( 
            this.cycle - 1, this.scan_line, this.pal_screen[ Math.random() < 0.5 ? 0x3F : 0x30] 
        )

        this.cycle++

        if (this.cycle >= 341){
            this.cycle = 0
            this.scan_line++

            if (this.scan_line >= 261){
                this.scan_line = -1;
                this.frame_complete = true;
            }
        }
    }

}