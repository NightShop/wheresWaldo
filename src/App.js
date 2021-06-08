import { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import SelectionTile from "./Components/SelectionTile";
import Game from "./Components/Game";
import uniqid from "uniqid";
import firebase from "./Firebase"

const db = firebase.firestore();

function App() {
  const [activeGame, setActiveGame] = useState("");
  const [gamesData, setGamesData] = useState();

  const changeGame = (game) => {
    setActiveGame(game);
  }

  useEffect(() => {

    const gamesDB = db.collection("gamesData");
    let arr = [];
    gamesDB.orderBy("order").get().then((data) => {
      data.forEach((game) => arr.push(game.data()));
      setGamesData(arr);
    })
  }, [])




  /* 
    const [snapshot, loading, error] = useCollectionOnce() */

  return (
    <div>
      <Navbar />
      <div className="App">
        {!activeGame && gamesData && gamesData.map(game => <SelectionTile key={uniqid()} level={game.level} url={game.url} triggerChange={changeGame} />)}
        {activeGame && <Game gameName={activeGame} triggerChange={changeGame} gameData={gamesData.find((game) => game.level === activeGame )}/>}
      </div>
    </div>
  );
}

export default App;
