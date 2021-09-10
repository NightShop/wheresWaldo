import Scoreboard from "./Scoreboard";
import { useState } from "react";
import CharacterIcon from "./CharacterIcon";
import uniqid from "uniqid";

const SelectionTile = (props) => {
    const [scoreVisible, setScoreVisible] = useState(false);
    const toggleScoreButton = (e) => {
        e.stopPropagation();
        setScoreVisible(!scoreVisible);
    }

    return (

        <button className="selectionTile" onClick={() => props.triggerChange(props.level)} >
            <h2 className="selectionTileTitle">{props.level.toUpperCase()}</h2>
            <div className="charactersToFind">
            {Object.keys(props.characters).map(characterName => <CharacterIcon key={uniqid()} character={{ [characterName]: false }} />)}
            </div>
            <img className="tileImage" src={props.url} alt="wally" />
            <div className="buttonGeneral" onClick={toggleScoreButton}>{scoreVisible ? "Hide Leaderboard" : "Show Leaderboard"}</div>
            {scoreVisible && <Scoreboard level={props.level} />}
        </button>

    )
}

export default SelectionTile;