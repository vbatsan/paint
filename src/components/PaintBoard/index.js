import React, {useState, useEffect, useMemo} from 'react'

import Board from "../shared/Board";

import Canvas from "../Canvas/CanvasUI";
import Pixel from "../Canvas/Pixel";
import * as uuid from "uuid";
import {CanvasService} from "../../services/Canvas";
import Notification from "../shared/Notification";



export default function PaintBoard({steps, canvasSize, appState}) {
    const [history, setHistory] = useState([])
    const [error, setError] = useState(null)
    const canvas = useMemo(() => new CanvasService(...canvasSize.flat()), [canvasSize])

    useEffect(() => {
        const arr = []
        steps.forEach(step => {
            if(appState[step]) {
                appState[step].forEach(item => {
                    if(canvas.validatePoints(step, item).success)
                    step === "canvas" ? arr.push(canvas[step]) :  arr.push(canvas[step](...item) )
                    else setError(canvas.validatePoints(step, item))
                })
            }
        })
    setHistory(arr)
    },[])


    return (
        <Board>
            {error && <Notification>{error.message}</Notification>}
            {history.map(item => (
                <Canvas  cols={canvasSize[0][0]} key={uuid.v4()}>
                    {item.flat().map(pixel => (
                        <Pixel key={pixel.id} {...pixel}/>
                    ))}
                </Canvas>
            ))}
        </Board>
    )
}
