import Scoreboard from "./Scoreboard";
import { useState } from "react";

const SelectionTile = (props) => {
    const [scoreVisible, setScoreVisible] = useState(false);
    const toggleScoreButton = (e) => {
        e.stopPropagation();
        setScoreVisible(!scoreVisible);
    }

    return (

        <button className="selectionTile" onClick={() => props.triggerChange(props.level)} >
            <img className="tileImage" src={props.url} alt="wally" />
            <h5>{props.level}</h5>
            {scoreVisible && <Scoreboard level={props.level} />}
            <button onClick={toggleScoreButton}>{scoreVisible ? "Hide Leaderboard" : "Show Leaderboard"}</button>
        </button>

    )
}

export default SelectionTile;