import React, { useEffect } from "react";
import "./App.css";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { games } from "./games";
import CharacterCard from "./Card";
import Scores from './Scores'

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState(games[0]);
  const [currentScore, setCurrentScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState([0, 0, 0, 0, 0]);
  const [clickedCharacters, setClickedCharacters] = React.useState([]);
  const [indexOfSelectedGame, setIndexOfSelectedGame] = React.useState(0);

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
    setSelectedGame(games[indexOfGame]);
    setIndexOfSelectedGame(indexOfGame);
  }

  function onClickCharacterHandler(characterName) { 
    if (clickedCharacters.includes(characterName)) {
      restartGameProgress();
    } else {
      const increasedScore = currentScore + 1;
      setCurrentScore(increasedScore);
      setClickedCharacters((prevClickedCharacters) => [
        ...prevClickedCharacters,
        characterName,
      ]);
      if (currentScore === 8) {
        console.log('You win');
      }
      if (increasedScore > highScore[indexOfSelectedGame]) {
        setHighScore((prevHighScore) => {
          const newArr = [...prevHighScore];
          newArr[indexOfSelectedGame] = currentScore;
          return newArr;
        });
      }
    }
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
        <Scores highScore = {highScore} currentScore = {currentScore} indexOfSelectedGame={indexOfSelectedGame}/>
      </div>

      <div
        id="cardContainer"
        style={{ backgroundImage: selectedGame["background"] }}
      >
        <div
          id="cardContainer"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          {selectedGame.characters.map((character) => (
            <CharacterCard
              image={character.img}
              onClickHandler={onClickCharacterHandler}
              characterName={character.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
