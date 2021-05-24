import * as uuid from "uuid"
export class CanvasService {
    constructor(x, y) {
        this.cols = +x;
        this.rows = +y;
        this.canvas = this.createCanvas()
    }
    createCanvas () {
        const newCanvas = []
        for(let i = 0; i < this.rows; i++) {
            newCanvas[i] = []
            for(let j = 0; j < this.cols; j++) {
                const canvasPixel = {
                    id: uuid.v4(),
                    lineType: 'x',
                    view: ' ',
                    isEmpty: true,
                    IsColored: false,
                }
                newCanvas[i].push(canvasPixel)
            }
        }
        return newCanvas
    }
    drawLine (x,y,x1,y1) {
        const canvas = this.copyCanvas()
        const horizontal = y === y1
        const lineLength = horizontal ? Math.abs(x - x1) + 1 : Math.abs(y - y1) + 1
        const startIndex = horizontal ? (((x - x1) < 0) ? x - 1 : x1 - 1) : (((y - y1) < 0) ? y - 1 : y1 - 1)

        for(let i = startIndex; i < startIndex + lineLength; i++) {
            const mainIndex = horizontal ? y - 1 : i;
            const innerIndex = horizontal ? i : x-1
            canvas[mainIndex][innerIndex].isEmpty = false;
            canvas[mainIndex][innerIndex].view = canvas[mainIndex][innerIndex].lineType
        }
        this.canvas = canvas
        return canvas
    }

    drawRectangle(x,y,x1,y1) {
       this.drawLine(x,y,x1,y)
       this.drawLine(x1,y,x1,y1)
       this.drawLine(x1,y1,x,y1)
       this.drawLine(x,y1,x,y)
        return this.canvas
    }

    fillCanvas(x, y, color) {
        const canvas = this.copyCanvas()
            const numX = parseInt(x) - 1
            const numY = parseInt(y) - 1
            const queue = []
            queue.push([numX, numY])

        fill()
        function fill() {
            while (queue.length > 0) {
                const current = queue.shift()
                if([current[0]] < 0 || [current[0]]  >= canvas[0].length -1) continue
                if([current[1]]  < 0 || current[1]  >= canvas.length) continue
                if(canvas[current[1]][current[0]].isEmpty && !canvas[current[1]][current[0]].isColored) {
                    canvas[current[1]][current[0]].isColored = true
                    canvas[current[1]][current[0]].view = color
                    queue.push([current[0], current[1] + 1])
                    queue.push([current[0] + 1, current[1]])
                    queue.push([current[0], current[1] - 1])
                    queue.push([current[0] - 1, current[1]])
                }
            }

        }
        this.canvas = canvas
        return canvas
    }


    copyCanvas() {
        const newCanvas = this.createCanvas()
        for(let i = 0; i < this.canvas.length; i++) {
            for(let j = 0; j < this.canvas[0].length; j++) {
                newCanvas[i][j] = {...this.canvas[i][j]}
            }
        }
        return newCanvas;
    }

     validatePoints (step, args) {
        let result = {success: true}
        args.forEach((el, index) => {
            const item = parseInt(el)
            if(item < 1) return result = {
                success: false,
                message: `Coords can not be less than 1 (${args})`,
            };
            if((index % 2 === 0) && (item > this.cols)) {
                return result = {
                    success: false,
                    message: `Not such point on the canvas ${args[index]}, ${args[index + 1]}`,
                }
            }
            if((index % 2 !== 0) && (item > this.rows)){
                return result = {
                    success: false,
                    message: `Not such point on the canvas ${args[index - 1]}, ${args[index]}`
                }}
        })
         if(step === 'drawLine') {
             if((+args[0] !== +args[2]) && (+args[1] !== +args[3])) {
                  result = {
                     success: false,
                     message: `Line ${args} should be vertical or horizontal`
                 }
             }
         }
        return result
    }
}
