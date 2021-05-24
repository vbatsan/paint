import React from "react";
import DeleteButton from "./DeleteButton";
import deleteIcon from './delete-icon-256.png'

export default function DeleteBtn ({setState, setHistory}) {
    const handleClick = () => {
        setState(state => ({
            ...state,
            canvas: null
        }))
        setHistory([])
    }
    return (
        <DeleteButton onClick={handleClick}>
            <img style={{width: '100%'}} alt={'delete'} src={deleteIcon}/>
        </DeleteButton>
    )
}
