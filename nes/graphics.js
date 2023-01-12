// from enum import IntEnum

const default_alpha = 0xFF
const default_pixel = (default_alpha << 24)

const PIXEL = {
    MODE : {
        NORMAL : 0,
        MASK   : 1,
        ALPHA  : 2,
        CUSTOM : 3,
    }
}

const SPRITE = {
    MODE : {
        NORMAL   : 0,
        PERIODIC : 1,
    },

    FLIP : {
        NONE  : 0,
        HORIZ : 1,
        VERT  : 2,
    }
}

class Pixel{
    constructor(r, g, b, a = default_alpha){
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
}

class Sprite{

    constructor(width, height){
        this.mode_sample = SPRITE.MODE.NORMAL
        this.width = width
        this.height = height

        this.col_data = []

        for (let i = 0; i < (width * height); i++)
            this.col_data[i] = new Pixel(255, 0, 0, 1)
    }


    getPixel(x, y){
        if (this.mode_sample === SPRITE.MODE.NORMAL){
            if (x >= 0 && x < this.width && y >= 0 && y < this.height)
                return this.col_data[y * this.width + x]
                
            return new Pixel(0, 0, 0, 0)
        }

        return this.col_data[ Math.abs(y % this.height) * this.width + Math.abs(x % this.width) ]
    }

    setPixel(x, y, pixel){
        if (x >= 0 && x < this.width && y >= 0 && y < this.height){
            this.col_data[y * this.width + x] = new Pixel(pixel.r, pixel.g, pixel.b, pixel.a)
            return true
        }

        return false
    }

}