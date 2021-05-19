import { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import SelectionTile from "./Components/SelectionTile";
import Game from "./Components/Game";
import LoginForm from "./Components/LoginForm";
import uniqid from "uniqid";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//to do: set database with names of games/ pictures, make several selectiontiles with their names as props
if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyAicYV7Ut0I6ZJg-pR7uGpYF6ojdTbJr40",
    authDomain: "whereswaldo-f02d4.firebaseapp.com",
    projectId: "whereswaldo-f02d4",
    storageBucket: "whereswaldo-f02d4.appspot.com",
    messagingSenderId: "291417893499",
    appId: "1:291417893499:web:3cae545b016ab9a64610de"
  })
}

const auth = firebase.auth();
const db = firebase.firestore();


function App() {
  const [activeGame, setActiveGame] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [gamesData, setGamesData] = useState();

  const changeGame = (game) => {
    setActiveGame(game);
  }

  const onclickUserNickname = (name) => {
    setUserNickname(name);
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
      {userNickname ? <h1>You are playing as {userNickname}</h1> : <LoginForm onbuttonClick={onclickUserNickname} />}

      <div className="App">
        {!activeGame && gamesData && gamesData.map(game => <SelectionTile key={uniqid()} level={game.level} url={game.url} triggerChange={changeGame} />)}
        {activeGame && <Game gameName={activeGame} triggerChange={changeGame} gameData={gamesData.find((game) => game.level === activeGame )}/>}
      </div>
    </div>
  );
}

export default App;
