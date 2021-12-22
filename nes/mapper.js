//-------------------------------------------------------------
//                            Mapper
//-------------------------------------------------------------
class NesMapper{

    constructor(prg_banks = 0, chr_banks = 0){
        this.prg_banks = prg_banks
        this.chr_banks = chr_banks
    }

    // abstracts methods
    cpuMapWrite(addr){ return true } 
    cpuMapRead (addr){ return true }
    ppuMapWrite(addr){ return true }
    ppuMapRead (addr){ return true }
}