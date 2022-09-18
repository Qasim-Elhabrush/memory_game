import React from "react";
import "./Card.css"

export default function CharacterCard({image,characterName,onClickHandler}){
    return(
        <div className="characterCard" onClick={()=>{onClickHandler(characterName)}}>
            <img alt={`${characterName}`} src={image} className="characterImage"/>
            <div className="characterName">{characterName}</div>
    </div>
    )


}