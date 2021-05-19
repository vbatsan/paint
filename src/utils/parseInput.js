
const parseInput = (str) => {
    const canvasRegex = /C\s\d+\s\d+/
    const lineRegex = /L(\s\d+){4}/g
    const rectangleRegex = /R(\s\d+){4}/g
    const fillerRegex =  /B(\s\d+){2}\s\w/
    const matchedCanvas = str.match(canvasRegex)
    const matchedFillOptions = str.match(fillerRegex)
    return {
        canvas: clearString(matchedCanvas ? matchedCanvas[0] : null),
        lines: clearString(str.match(lineRegex)),
        rectangles: clearString(str.match(rectangleRegex)),
        fillCanvas: {
            target:  clearString(matchedFillOptions ? matchedFillOptions[0] : null).split(',').slice(0,2).join(','),
            filler:  clearString(matchedFillOptions ? matchedFillOptions[0] : null).split(',')[2]
        }
    }
}
const clearString = (str) => {
    if(!str) return null
const clearRegex = /^\D\s/;
    if(Array.isArray(str)) {
        return str.map(item => item.replace(clearRegex, "").replace(/ /g, ',') )
    }
    return str.replace(clearRegex, "").replace(/ /g, ',')
}
export default parseInput;
