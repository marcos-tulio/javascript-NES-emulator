//-------------------------------------------------------------
//                            SCREEN
//-------------------------------------------------------------
// This class extends SCREEN class from 6502 Emulator by Marcos Santos
//-------------------------------------------------------------
class NesScreen extends Screen{
    
    constructor(cpu, ppu){
        super(cpu)
        this.ppu = ppu

        this.selected_palette = 0
    }

    render(id, x, y, sprites, scale = 1){
        const canvas_scene = this.getCanvasClearned(id)
        const ctx_scene = canvas_scene.getContext("2d")
        
        ctx_scene.createImageData(sprites.width, sprites.height)

        const image_data = ctx_scene.getImageData(x, y, sprites.width, sprites.height)

        let index = 0;

        for (let i = 0; i < sprites.col_data.length; i++) {
            index = i * 4;

            image_data.data[index + 0] = sprites.col_data[i].r
            image_data.data[index + 1] = sprites.col_data[i].g
            image_data.data[index + 2] = sprites.col_data[i].b
            image_data.data[index + 3] = sprites.col_data[i].a
        }

        ctx_scene.save()

        ctx_scene.scale(scale, scale)
        ctx_scene.putImageData(image_data, 0, 0)
        ctx_scene.drawImage(canvas_scene, 0, 0)
        
        ctx_scene.restore()
    }

    updateScene(id = "scene"){
        this.render(id, 0, 0, this.ppu.spr_screen, 1.8)
    }

    nextPalette(idFeedback = "palette_value"){
        this.selected_palette = (this.selected_palette + 1) & 0x07
        this.updatePalettes()

        document.getElementById(idFeedback).value = this.selected_palette
    }

    prevPalette(idFeedback = "palette_value"){
        this.selected_palette = (this.selected_palette - 1) & 0x07
        this.updatePalettes()

        document.getElementById(idFeedback).value = this.selected_palette
    }

    updatePalettes(idPaletteOne = "palette_one", idPaletteTwo = "palette_two", idPaletteSelector = "palette_select"){
        // Draw palettes
        const palette_one = this.ppu.getPatternTable(0, this.selected_palette)
        const palette_two = this.ppu.getPatternTable(1, this.selected_palette)

        this.render(idPaletteOne, 0, 0, palette_one, 1.7)
        this.render(idPaletteTwo, 0, 0, palette_two, 1.7)
    }

}