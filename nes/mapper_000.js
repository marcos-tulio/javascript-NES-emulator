//-------------------------------------------------------------
//                            Mapper
//-------------------------------------------------------------
class NesMapper000 extends NesMapper{

    cpuMapWrite(addr){
        if (addr >= 0x8000 && addr <= 0xFFFF)
            return true

        return undefined
    } 

    cpuMapRead(addr){ 	
        if (addr >= 0x8000 && addr <= 0xFFFF)
            return addr & (this.prg_banks > 1 ? 0x7FFF : 0x3FFF)

        return undefined
    }

    ppuMapWrite(addr){
        //if (addr >= 0x0000 && addr <= 0x1FFF)
        //    return true

        return undefined
    }

    ppuMapRead (addr){
        if (addr >= 0x0000 && addr <= 0x1FFF)
            return addr

        return undefined
    }
}