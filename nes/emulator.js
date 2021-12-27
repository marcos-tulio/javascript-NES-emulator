//-------------------------------------------------------------
//                          Emulator
//-------------------------------------------------------------
class NesEmulator extends Emulator{

    onCreate(){
        // Init nes components
        this.cpu = new NesCpu()
        this.ppu = new NesPpu(this.cpu)
        this.bus = new NesBus(this.cpu, this.ppu)
        this.screen = new Screen(this.cpu)

        //this.bus.setCartridge()

        // Init nes configs
    }

    // Override
    async loadRom(file){
        const array_buffer = await (new Response(file)).arrayBuffer()
        this.source = new Uint8Array(array_buffer)

        this.init( new NesCartridge(this.source) )
    }

    init(cartridge = this.bus.cart){
        this.bus.setCartridge( cartridge )
        
        // clear ram
        for (const i in this.bus.ram)
            this.bus.ram[i] = 0x00

        // load code to ram            
        let offset = this.source_offset
        for (const b of this.source) 
            this.bus.ram[offset++] = b

        // reset vectors
        this.bus.ram[0xFFFC] = 0x00;
        this.bus.ram[0xFFFD] = 0x80;

        // reset
        this.cpu.reset()
        this.screen.init()
    }
}
