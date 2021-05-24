import React, {useState, useEffect, useMemo, useRef} from 'react'

import Board from "../shared/Board";
import Canvas from "../Canvas/CanvasUI";
import Pixel from "../Canvas/Pixel";
import * as uuid from "uuid";
import {CanvasService} from "../../services/Canvas";
import Notification from "../shared/Notification";
import parseDataToFile from "../../utils/parseDataToFile";

export default function PaintBoard({steps, canvasSize, appState, history, setHistory}) {
    const [error, setError] = useState(null)
    const canvas = useMemo(() => new CanvasService(...canvasSize.flat()), [canvasSize])
    const containerRef = useRef()

    useEffect(() => {
        const arr = []
        steps.forEach(step => {
            if(appState[step]) {
                appState[step].forEach(item => {
                   if(step === "canvas"){
                       arr.push(canvas[step])
                   } else {
                       if(canvas.validatePoints(step, item).success) arr.push(canvas[step](...item))
                       else setError(canvas.validatePoints(step, item))
                   }
                })
            }
        })
    setHistory(arr)
    },[])

    function downloadDoc() {
        const element = document.createElement("a");
        const file = new Blob([parseDataToFile(history).join('')], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "output.txt";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <Board ref={containerRef}>
            {error && <Notification>{error.message}</Notification>}
            {history.map((item, index) => (
                <Canvas id={index} cols={canvasSize[0][0]}  key={uuid.v4()}>
                    {item.flat().map(pixel => (
                        <Pixel width={(+canvasSize[0][0] > 100) ? 4 : 8} key={pixel.id} {...pixel}/>
                    ))}
                </Canvas>
            ))}
            {history && <button onClick={downloadDoc}>download</button>}
        </Board>
    )
}
