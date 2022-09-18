import React, { useEffect } from "react";
import "./App.css";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { games } from "./games";
import CharacterCard from "./Card";
import Scores from "./Scores";

export default function App() {
  const [footerVisible,setFooterVisible] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState(games[0]);
  const [currentScore, setCurrentScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState([0, 0, 0, 0, 0]);
  const [clickedCharacters, setClickedCharacters] = React.useState([]);
  const [indexOfSelectedGame, setIndexOfSelectedGame] = React.useState(0);
  const [characterArr,setCharacterArr] = React.useState([...selectedGame.characters]);
  function shuffleCharacterArr(){
    setCharacterArr(prevArr=>{
      const newArr = [...prevArr];
      shuffle(newArr);
      return newArr
    })
  }
  console.log(characterArr);
  function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
  }
  function openDrawer() {
    if (isDrawerOpen !== true) {
      setIsDrawerOpen(true);
    } else {
      return;
    }
  }

  let backgroundImg = selectedGame["background"];
  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  function restartGameProgress() {
    setClickedCharacters([]);
    setCurrentScore(0);
    
  }

  function changeGame(indexOfGame) {
    restartGameProgress();
    closeDrawer();
    setSelectedGame(games[indexOfGame]);
    setCharacterArr([...games[indexOfGame].characters])
    setIndexOfSelectedGame(indexOfGame);
  }

  function onClickCharacterHandler(characterName) {
    shuffleCharacterArr();
    if (clickedCharacters.includes(characterName)) {
      restartGameProgress();
    } else {
      const increasedScore = currentScore + 1;
      setCurrentScore(increasedScore);
      setClickedCharacters((prevClickedCharacters) => [
        ...prevClickedCharacters,
        characterName,
      ]);
      if (increasedScore > highScore[indexOfSelectedGame]) {
        setHighScore((prevHighScore) => {
          const newArr = [...prevHighScore];
          newArr[indexOfSelectedGame] = increasedScore;
          return newArr;
        });
      }
    }
  }
  function hideFooter(){
    setFooterVisible(false)   
  }

  return (
    <div>
      <div id="head">
        <MenuIcon onClick={openDrawer} id="menuIcon" />
        <Drawer onClose={closeDrawer} open={isDrawerOpen} anchor="left">
          <div className="gameMenu">
            <div id="menuTitle">Choose Your Game:</div>
            <div
              onClick={() => {
                changeGame(0);
              }}
              className="menu--Game"
            >
              Alladin
            </div>
            <div
              onClick={() => {
                changeGame(1);
              }}
              className="menu--Game"
            >
              Finding Nemo
            </div>
            <div
              onClick={() => {
                changeGame(2);
              }}
              className="menu--Game"
            >
              Frozen
            </div>
            <div
              onClick={() => {
                changeGame(3);
              }}
              className="menu--Game"
            >
              The Lion King
            </div>
            <div
              onClick={() => {
                changeGame(4);
              }}
              className="menu--Game"
            >
              Toy Story
            </div>
          </div>
        </Drawer>
        <div id="titleContainer">
          <div>
            <h1 id="title">Memorization Game</h1>
            <h5 id="objective">Dont click the same character twice!</h5>
          </div>
        </div>
        <Scores
          highScore={highScore}
          currentScore={currentScore}
          indexOfSelectedGame={indexOfSelectedGame}
        />
      </div>

      <div
        id="cardContainer"
        style={{ backgroundImage: selectedGame["background"] }}
      >
        <div
          id="cardContainer"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          {characterArr.map((character) => (             
              <CharacterCard
                image={character.img}
                onClickHandler={onClickCharacterHandler}
                characterName={character.name}
              />
          ))}
        </div>
      </div>
      {footerVisible===true?<footer onClick={hideFooter}><div>Pictures sorced from Disney.com</div><button onClick={hideFooter}>X</button></footer>:false}
    </div>
  );
}
