import React from "react";
import "./App.css";
import { Drawer } from "@mui/material";
import Icon from "@mui/material/Icon";
import {games} from "./games";


export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedGame,setSelectedGame] = React.useState(games[0])
  function openDrawer() {
    if (isDrawerOpen !== true) {
      setIsDrawerOpen(true);
    } else {
      return;
    }
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  function toggleDrawer() {
    isDrawerOpen === true ? setIsDrawerOpen(false) : setIsDrawerOpen(true);
  }

  return (
    <div>
      <Icon id="menuIcon" onClick={toggleDrawer}>
        menu
      </Icon>
      <div id="head">
        <Drawer onClose={closeDrawer} open={isDrawerOpen} anchor="left">
          <div className="gameMenu">
            <div>Alladin</div>
            <div>Moana</div>
            <div>Frozen</div>
            <div>Lion King</div>
            <div>Toy Story</div>
          </div>
        </Drawer>
        <div id="titleContainer">
          <div>
            <h1 id="title">Memorization Game</h1>
            <h5 id="objective">Dont click the same character twice!</h5>
          </div>
        </div>

        <div id="scores">
          <div>Score:</div>
          <div>HighScore:</div>
        </div>
      </div>

      <div id="cardContainer" style={{backgroundImage : selectedGame["background"]}}>
        
      </div>
    </div>
  );
}
