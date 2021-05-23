import React, {useCallback, useContext} from 'react';
import {AppContext} from "../../appContext";
import {useDropzone} from 'react-dropzone';

import {DropWrapper} from "./DropWrapper";
import FileIcon from './file-img.png';
import parseInput from "../../utils/parseInput";

export default function DropZone() {
    const appState = useContext(AppContext)
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                const result = reader.result
                appState.setState(state => {
                    return {
                        ...state,
                        ...parseInput(result)
                    }
                })
            }
            reader.readAsText(file)
        })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: '.txt',
    })

    return (
        <DropWrapper {...getRootProps()}>
            <img width={100} src={FileIcon} alt="drop here"/>
            <input {...getInputProps()} />
        </DropWrapper>
    )
}
