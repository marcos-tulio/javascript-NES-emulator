//-------------------------------------------------------------
//                         Cartridge
//-------------------------------------------------------------
class NesCartridge{

    constructor(rom_file){
        this.prg_memory = []
        this.chr_memory = [] 

        this.prg_banks = 0
        this.chr_banks = 0

        // ines to memory
        let ines = []
        ines.name           = rom_file.slice(0, 4)   // 4 Bytes
        ines.prg_rom_chunks = rom_file.slice(4, 5)   // 1 Byte
        ines.chr_rom_chunks = rom_file.slice(5, 6)   // 1 Byte
        ines.mapper1        = rom_file.slice(6, 7)   // 1 Byte
        ines.mapper2        = rom_file.slice(7, 8)   // 1 Byte
        ines.prg_ram_size   = rom_file.slice(8, 9)   // 1 Byte
        ines.tv_system1     = rom_file.slice(9, 10)  // 1 Byte
        ines.tv_system2     = rom_file.slice(10, 11) // 1 Byte
        //this.ines.unused       = rom_file.slice(11, 16) // 5 Bytes

        // get mapper id
        this.mapper_id = ((ines.mapper2 >> 4) << 4) | (ines.mapper1 >> 4)

        // skip trainer
        let offset = 16 // ines bytes
        offset += (ines.mapper1 & 0x04) ? 512 : 0

        // get file format
        let file_type = forceUInt8(0x01)

        if (file_type == 0){
            // do nothing

        } else if (file_type == 1){
            this.prg_banks = ines.prg_rom_chunks
            this.chr_banks = ines.chr_rom_chunks

            let prg_memory_size = this.prg_banks * 16384
            let chr_memory_size = this.chr_banks * 8192

            // read prg memory
            this.prg_memory = rom_file.slice(offset, offset + prg_memory_size)
            offset += prg_memory_size

            //read chr memory
            this.chr_memory = rom_file.slice(offset, offset + chr_memory_size)
            offset += chr_memory_size
        
        } else if (file_type == 2){
            // do nothing
        }

        // load correct mapper
        if (this.mapper_id == 0)
            this.mapper = new NesMapper000(this.prg_banks, this.chr_banks)
    }

    cpuWrite(addr, data){
        let mapped_addr = this.mapper.cpuMapWrite(addr)

        if (mapped_addr != undefined){
            this.prg_memory[mapped_addr] = data
            return true
        }

        return undefined
    }

    cpuRead(addr){
        let mapped_addr = this.mapper.cpuMapRead(addr)

        if (mapped_addr != undefined)
            return this.prg_memory[mapped_addr]

        return undefined
    }

    ppuWrite(addr, data){
        let mapped_addr = this.mapper.ppuMapWrite(addr)

        if (mapped_addr != undefined){
            this.chr_memory[mapped_addr] = data
            return true
        }

        return undefined
    }

    ppuRead(addr){
        let mapped_addr = this.mapper.ppuMapRead(addr)

        if (mapped_addr != undefined)
            return this.chr_memory[mapped_addr]

        return undefined
    }

}