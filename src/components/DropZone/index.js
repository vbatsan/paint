import React, {useCallback, useContext, useState} from 'react';
import {AppContext} from "../../appContext";
import {useDropzone} from 'react-dropzone';

import {DropWrapper} from "./DropWrapper";
import FileIcon from './file-img.png';
import parseInput from "../../utils/parseInput";
import Spinner from "../shared/Preloader";

export default function DropZone() {
    const [isLoading, setIsLoading] = useState(false)
    const appState = useContext(AppContext)
    const onDrop = useCallback((acceptedFiles) => {
        setIsLoading(true)
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                setIsLoading(false)
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
            {isLoading && <Spinner/>}
            <img width={100} src={FileIcon} alt="drop here"/>
            <input {...getInputProps()} />
        </DropWrapper>
    )
}
