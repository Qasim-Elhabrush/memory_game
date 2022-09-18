import React from "react";
export default function Scores({highScore,currentScore,indexOfSelectedGame}){
    return( 
    <div id="scores">
    <div>Score:&nbsp; {currentScore}</div>
    <div>HighScore: &nbsp;{highScore[indexOfSelectedGame]}</div>
  </div>)
}