import React, {useState, useEffect, useMemo} from 'react'

import Board from "../shared/Board";

import Canvas from "../Canvas/CanvasUI";
import Pixel from "../Canvas/Pixel";
import * as uuid from "uuid";
import {CanvasService} from "../../services/Canvas";



export default function PaintBoard({steps, canvasSize, appState}) {
    const [history, setHistory] = useState([])
    const canvas = useMemo(() => new CanvasService(...canvasSize.flat()), [canvasSize])

    useEffect(() => {
        const arr = []
        steps.forEach(step => {
            if(appState[step]) {
                appState[step].forEach(item => {
                    step === "canvas" ? arr.push(canvas[step]) :  arr.push(canvas[step](...item) )
                })
            }
        })
    setHistory(arr)
    },[])

    return (
        <Board>
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
