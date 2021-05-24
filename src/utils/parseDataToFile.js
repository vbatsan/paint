export default function parseDataToFile(history) {
    let docTemplate = []
    history.map(arr => {
        const arra = []
        for(let i = 0; i < arr.length + 2; i++) {
            arra[i] = []
            arra[i][arr[0].length + 1] = '|'
            arra[i][0] = '|'
            arra[i][arr[0].length + 2] = '\n'
            for(let j = 0; j < arr[0].length + 2; j++) {
                arra[0][j] = '- '
                if( i > 0 && (i <= arr.length && j <= arr[0].length -1)) {
                    arra[i][j + 1] = ` ${arr[i - 1][j].view}`
                }
                if(i === arr.length + 1) {
                    arra[arr.length + 1][j] = '- '
                }

            }
        }
        docTemplate.push(arra.flat().join(''))
    })

    return docTemplate
}
