import { useEffect, useState } from "react";
import ImgDropdown from "./ImgDropdown";
import firebase from "./../Firebase";

const Game = (props) => {
    const gameData = props.gameData;
    const [xCoord, setXCoord] = useState();
    const [yCoord, setYCoord] = useState();
    const [showImgDropdown, setShowImgDropdown] = useState(false);
    const [charactersFound, setCharactersFound] = useState(Object.entries(gameData.characters).map(character => {
        console.log(character);
        return {[character[0]]: false};
    }));



    console.log(charactersFound);

    const db = firebase.firestore();

    const handleImageClick = (event) => {
        setXCoord(event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset);
        setYCoord(event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset);
        setShowImgDropdown(!showImgDropdown);
        console.log(event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset, event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset);
    }
    useEffect(() => {
        props.userNickname && db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).set({
            timeBeginning: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(msg => console.log(msg));
    }, [db]);
    const selectionCheck = (charName) => {
        const xCoordRange = [
            parseInt(gameData.characters[charName].x, 10) - 20,
            parseInt(gameData.characters[charName].x, 10) + 20
        ]
        const yCoordRange = [
            parseInt(gameData.characters[charName].y, 10) - 50,
            parseInt(gameData.characters[charName].y, 10) + 50
        ]

        if (
            xCoord >= xCoordRange[0] &&
            xCoord <= xCoordRange[1] &&
            yCoord >= yCoordRange[0] &&
            yCoord <= yCoordRange[1]) {

            console.log("got it");

            

        } else {
            console.log("missed it");
        }
    }

    const closeDropdown = () => {
        setShowImgDropdown(false);
    }

    return (
        <div >
            <h1>This is {props.gameName} game</h1>
            <button onClick={() => props.triggerChange("")}>Back</button>
            <div style={{ display: "inline-block", position: "relative" }}>
                {showImgDropdown && <ImgDropdown closeDropdown={closeDropdown} selectionCheck={selectionCheck} characters={gameData.characters} x={xCoord} y={yCoord} />}
                <img className="gameImage" draggable={false} src={gameData.url} alt={`Where's Waldo ${gameData.level.charAt(0).toUpperCase() + gameData.level.slice(1)}`} onClick={(event => handleImageClick(event))} />
            </div>
        </div>
    )
}

export default Game;