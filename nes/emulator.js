show_log_all = true

const NES_CPU = new NesCpu()
const NES_PPU = new NesPpu()
const NES_BUS = new NesBus(NES_CPU, NES_PPU)
