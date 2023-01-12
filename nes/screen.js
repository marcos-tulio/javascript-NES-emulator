//-------------------------------------------------------------
//                            SCREEN
//-------------------------------------------------------------
// This class extends SCREEN class from 6502 Emulator by Marcos Santos
//-------------------------------------------------------------
class NesScreen extends Screen{
    
    constructor(cpu, ppu){
        super(cpu)
        this.ppu = ppu
    }

    updateScene( id = "scene"){
        const canvas_scene = this.getCanvasClearned(id)       
        const ctx_scene = canvas_scene.getContext("2d")        
        
        ctx_scene.createImageData(this.ppu.spr_screen.width, this.ppu.spr_screen.height)

        const image_data = ctx_scene.getImageData(0, 0, this.ppu.spr_screen.width, this.ppu.spr_screen.height)

        let index = 0;

        for (let i = 0; i < this.ppu.spr_screen.col_data.length; i++) {
            index = i * 4;

            image_data.data[index + 0] = this.ppu.spr_screen.col_data[i].r
            image_data.data[index + 1] = this.ppu.spr_screen.col_data[i].g
            image_data.data[index + 2] = this.ppu.spr_screen.col_data[i].b
            image_data.data[index + 3] = this.ppu.spr_screen.col_data[i].a
        }

        
        // Scale
        if (!this.is_scaled){
            ctx_scene.scale(1.8, 1.8)
            this.is_scaled = true
        }

        ctx_scene.putImageData(image_data, 0, 0)
        ctx_scene.drawImage(canvas_scene, 0, 0)
    }

}