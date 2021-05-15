import { useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import SelectionTile from "./Components/SelectionTile";
import Game from "./Components/Game"; 

//to do: set database with names of games/ pictures, make several selectiontiles with their names as props

function App() {
  const [activeGame, setActiveGame] = useState("");

  const triggerChange = (game) => {
    setActiveGame(game);
  }

  return (
    <div>
      <Navbar />
      <div className="App">
        { !activeGame && <SelectionTile  triggerChange={triggerChange} />}
        { activeGame && <Game gameName={activeGame} />}
      </div>
    </div>
  );
}

export default App;
