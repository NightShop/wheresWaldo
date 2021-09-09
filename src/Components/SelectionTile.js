import Scoreboard from "./Scoreboard";
import { useState } from "react";
import CharacterIcon from "./CharacterIcon";

const SelectionTile = (props) => {
    const [scoreVisible, setScoreVisible] = useState(false);
    const toggleScoreButton = (e) => {
        e.stopPropagation();
        setScoreVisible(!scoreVisible);
    }

    const charactersArray = Object.keys(props.characters);
    console.log(props.characters);

    return (

        <button className="selectionTile" onClick={() => props.triggerChange(props.level)} >
            <h2 className="selectionTileTitle">{props.level.toUpperCase()}</h2>
            <div className="charactersToFind">
            {Object.keys(props.characters).map(characterName => <CharacterIcon character={{ [characterName]: false }} />)}
            </div>
            <img className="tileImage" src={props.url} alt="wally" />
            <button className="buttonGeneral" onClick={toggleScoreButton}>{scoreVisible ? "Hide Leaderboard" : "Show Leaderboard"}</button>
            {scoreVisible && <Scoreboard level={props.level} />}
        </button>

    )
}

export default SelectionTile;