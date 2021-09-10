import { useEffect, useState } from "react";
import ImgDropdown from "./ImgDropdown";
import firebase from "./../Firebase";
import GameTimer from "./GameTimer";
import LoginPopup from "./LoginPopup";
import CharacterIcon from "./CharacterIcon";


//when user starts game create temporary timebeggining and when he goes out update time end

const Game = (props) => {
    const gameData = props.gameData;
    const [xCoord, setXCoord] = useState();
    const [xCoordRel, setXCoordRel] = useState();
    const [yCoord, setYCoord] = useState();
    const [yCoordRel, setYCoordRel] = useState();
    const [showImgDropdown, setShowImgDropdown] = useState(false);
    const [characters, setCharacters] = useState(Object.entries(gameData.characters).map(character => ({ [character[0]]: false })));
    const [allCharactersFound, setAllCharactersFound] = useState(false);
    const [gameTime, setGameTime] = useState("");
    const [gameOver, setGameOver] = useState(false);

    let xCoordTemp;
    let yCoordTemp;
    

    const db = firebase.firestore();

    const handleImageClick = (event) => {
        xCoordTemp = event.pageX - event.target.getBoundingClientRect().left - window.pageXOffset
        setXCoord(xCoordTemp);
        setXCoordRel(xCoordTemp/event.target.width);
        yCoordTemp = event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset;
        setYCoord(yCoordTemp);
        setYCoordRel(yCoordTemp/event.target.height);
        setShowImgDropdown(!showImgDropdown);
        /* 
        console.log("x: ", xCoordTemp, " y: ", yCoordTemp);
        console.log(`coordinates of of click, relative: x/width = ${xCoord/event.target.width} y/width = ${yCoord/event.target.height}`); 
        */
    }

    //check if given charName is in range of current mouse click and change it in characters array
    const selectionCheck = (charName) => {
        const xCoordRange = [
            parseFloat(gameData.characters[charName].x, 10) - 0.035,
            parseFloat(gameData.characters[charName].x, 10) + 0.035
        ]

        const yCoordRange = [
            parseFloat(gameData.characters[charName].y, 10) - 0.05,
            parseFloat(gameData.characters[charName].y, 10) + 0.05
        ]
        
        if (
            xCoordRel >= xCoordRange[0] &&
            xCoordRel <= xCoordRange[1] &&
            yCoordRel >= yCoordRange[0] &&
            yCoordRel <= yCoordRange[1]) {

            const index = characters.findIndex(character => Object.keys(character)[0] === charName)
            const newCharactersArray = JSON.parse(JSON.stringify(characters));
            newCharactersArray[index][charName] = true;
            setCharacters(newCharactersArray);
        }
    }

    //set allCharactersFound
    useEffect(() => {
        const areAllCharsTrue = characters.every(characterObject => {
            return Object.values(characterObject)[0];
        });
        areAllCharsTrue && setAllCharactersFound(true);

    }, [characters]);

    const getTime = (time) => {
        setGameTime(time);
        console.log("game time is ", time);
    }

    const closeDropdown = () => {
        setShowImgDropdown(false);
    }

    const saveTimeToServer = (nickname) => {
        console.log(nickname, "with time ", gameTime);

        db.collection(`scoreBoard-${gameData.level}`).doc(nickname).set({
            "time": gameTime
        })

        props.triggerChange("");
    }

    
    return (
        <div>
            {allCharactersFound && <LoginPopup onClickSubmitButton={saveTimeToServer} triggerChange={props.triggerChange}/>}
            <GameTimer gameOver={gameOver} setGameOver={setGameOver} allCharFound={allCharactersFound} getTime={getTime}/>
            <div className="characterFoundIndicator">
            {characters.map((character) => {
                return <CharacterIcon character={character}/>
            })}
            </div>
            <div style={{ display: "inline-block", position: "relative" }}>
                {showImgDropdown && <ImgDropdown closeDropdown={closeDropdown} selectionCheck={selectionCheck} charactersFound={characters} characters={gameData.characters} x={xCoord} y={yCoord} />}
                <img className="gameImage" draggable={false} src={gameData.url} alt={`Where's Waldo ${gameData.level.charAt(0).toUpperCase() + gameData.level.slice(1)}`} onClick={(event => handleImageClick(event))} />
            </div>
            <div className="backButtonDiv">
            <button className="buttonGeneral" onClick={() => {
                props.triggerChange("")
            }}>Back</button>
            </div>
        </div>
    )
}

export default Game;


/*  //check if all characters found and send time to server
 useEffect(() => {
     const areAllCharsTrue = characters.every(characterObject => {
         return Object.values(characterObject)[0];
     });
     if (areAllCharsTrue) {
         console.log("sending time end to server for current user");
         props.userNickname && db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).set({
             tempTimeEnd: firebase.firestore.FieldValue.serverTimestamp(),
         }, { merge: true });
     }
 }) */

 /* //if all characters not true, delete entry of current user in database when unmounting component
 const updateTime  = async () => {
         const areAllCharsTrue = characters.every(characterObject => {
             return Object.values(characterObject)[0];
         });
         
         const existingCharFromDB = await db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).get();

         console.log(characters);
         console.log(areAllCharsTrue);



         if (!areAllCharsTrue && (existingCharFromDB.data().timeEnd !== undefined)) {
             db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).delete().then(() => { console.log("User ", props.userNickname, " deleted.") })
         }
 } */

 /* //new entry in db when starting new game
 useEffect(() => {
     console.log("updating charracters array useEffect")
     props.userNickname && db.collection(`scoreBoard-${gameData.level}`).doc(props.userNickname).set({
         tempTimeBeginning: firebase.firestore.FieldValue.serverTimestamp(),
     }).then(msg => console.log("new entry in firestore"));
 }, [gameData.level, props.userNickname, db]);
*/