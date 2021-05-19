import { useState } from "react";
import ImgDropdown from "./ImgDropdown";

const Game = (props) => {
    const gameData = props.gameData;
    const [xCoord, setXCoord] = useState();
    const [yCoord, setYCoord] = useState();
    const [showImgDropdown, setShowImgDropdown] = useState(false);


    const handleImageClick = (event) => {
        console.log(event.target);
        console.log("x: ", event.pageX - event.target.offsetLeft, ", y: ", event.pageY - event.target.offsetTop);
        setXCoord(event.pageX - event.target.offsetLeft);
        setYCoord(event.pageY - event.target.offsetTop);
        setShowImgDropdown(!showImgDropdown);
    }

    return (
        <div style={{ position: "relative" }}>
            <h1>This is {props.gameName} game</h1>
            <button onClick={() => props.triggerChange("")}>Back</button>
            <div style={{display: "inline-block"}}>
                {showImgDropdown && <ImgDropdown x={xCoord} y={yCoord} />}
                <img draggable={false} src={gameData.url} alt={`Where's Waldo ${gameData.level.charAt(0).toUpperCase() + gameData.level.slice(1)}`} onClick={(event => handleImageClick(event))} />
            </div>
        </div>
    )
}

export default Game;