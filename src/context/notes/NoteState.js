import React from "react";
import noteContext from "./NoteContext";

const NoteState = (props)=>{
    const state = {
        "name":"Soham",
        "class":"8c"
    }
    return (
        <NoteState.provider value={state}>
            {props.children}
        </NoteState.provider>
    )
}

export default NoteState;