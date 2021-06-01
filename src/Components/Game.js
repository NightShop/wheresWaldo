import { useEffect, useState } from "react";
import ImgDropdown from "./ImgDropdown";
import firebase from "./../Firebase";
import uniqid from "uniqid";
import GameTimer from "./GameTimer";


//when user starts game create temporary timebeggining and when he goes out update time end

const Game = (props) => {
    const gameData = props.gameData;
    const [xCoord, setXCoord] = useState();
    const [yCoord, setYCoord] = useState();
    const [showImgDropdown, setShowImgDropdown] = useState(false);
    const [characters, setCharacters] = useState(Object.entries(gameData.characters).map(character => ({ [character[0]]: false })));

    const db = firebase.firestore();

    const handleImageClick = (event) => {
        setXCoord(event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset);
        setYCoord(event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset);
        setShowImgDropdown(!showImgDropdown);
        console.log(event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset, event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset);
    }

    //check if all characters found and send time to server
    useEffect(() => {
        const areAllCharsTrue = characters.every(characterObject => {
            return Object.values(characterObject)[0];
        });
        if (areAllCharsTrue) {
            console.log("sending time end to server for current user");
            props.userNickname && db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).set({
                timeEnd: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });
        }
    })

    //if all characters not true, delete entry of current user in database when unmounting component
    const deleteUser  = async () => {
            const areAllCharsTrue = characters.every(characterObject => {
                return Object.values(characterObject)[0];
            });
            
            const existingCharFromDB = await db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).get();

            console.log(characters);
            console.log(areAllCharsTrue);

            if (!areAllCharsTrue && (existingCharFromDB.data().timeEnd !== undefined)) {
                db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).delete().then(() => { console.log("User ", props.userNickname, " deleted.") })
            }
    }

    //update characters array when correctly clicked and chosen character
    useEffect(() => {
        console.log("updating charracters array useEffect")
        props.userNickname && db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).set({
            timeBeginning: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(msg => console.log("new entry in firestore"));
    }, [gameData.level, props.userNickname, db]);

    //check if given charName is range of current mouse click and change it in characters array
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

            const index = characters.findIndex(character => Object.keys(character)[0] === charName)
            const newCharactersArray = JSON.parse(JSON.stringify(characters));
            newCharactersArray[index][charName] = true;
            setCharacters(newCharactersArray);
            console.log("change in char array");
            console.log("characters", characters);
        }
    }

    const closeDropdown = () => {
        setShowImgDropdown(false);
    }

    return (
        <div>
            <h1>This is {props.gameName} game</h1>
            <GameTimer />
            {characters.map((character => {
                return <h3 key={uniqid()}>{Object.keys(character)}: {character[Object.keys(character)].toString()} </h3>
            }))}
            <button onClick={() => {
                deleteUser();
                props.triggerChange("")
                }}>Back</button>
            <div style={{ display: "inline-block", position: "relative" }}>
                {showImgDropdown && <ImgDropdown closeDropdown={closeDropdown} selectionCheck={selectionCheck} characters={gameData.characters} x={xCoord} y={yCoord} />}
                <img className="gameImage" draggable={false} src={gameData.url} alt={`Where's Waldo ${gameData.level.charAt(0).toUpperCase() + gameData.level.slice(1)}`} onClick={(event => handleImageClick(event))} />
            </div>
        </div>
    )
}

export default Game;