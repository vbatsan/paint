import React, {useContext} from "react";
import DeleteButton from "./DeleteButton";
import deleteIcon from './delete-icon-256.png'
import {HistoryContext} from "../../context/historyContext";
import {AppContext} from "../../context/appContext";

export default function DeleteBtn () {
    const {setHistory} = useContext(HistoryContext)
    const {setState} = useContext(AppContext)
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
