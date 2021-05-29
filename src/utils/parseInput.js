
const parseInput = (str) => {
    const canvasRegex = /C\s\d+\s\d+/
    const lineRegex = /L(\s\d+){4}/g
    const rectangleRegex = /R(\s\d+){4}/g
    const fillerRegex =  /B(\s\d+){2}\s\w/g
    const matchedCanvas = str.match(canvasRegex)
    return {
        canvas: clearString(matchedCanvas ? [matchedCanvas[0]] : null),
        drawLine: clearString(str.match(lineRegex)),
        drawRectangle: clearString(str.match(rectangleRegex)),
        fillCanvas:  clearString(str.match(fillerRegex))
    }
}
const clearString = (str) => {
    if(!str) return null
const clearRegex = /^\D\s/;
    if(Array.isArray(str)) {
        return str.map(item => item.replace(clearRegex, "").replace(/ /g, ',').split(',') )
    }
    return str.replace(clearRegex, "").replace(/ /g, ',').split(',')
}
export default parseInput;
