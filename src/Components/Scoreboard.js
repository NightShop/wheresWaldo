import { useEffect, useState } from "react";
import firebase from "../Firebase";
import uniqid from "uniqid";

const Scoreboard = (props) => {
    const [listOfPlayers, setListOfPlayers] = useState();
    const db = firebase.firestore();
    
    
    useEffect(() => {
        const unsubscribe = db.collection(`scoreBoard-${props.level}`)
            .onSnapshot(data => {
                let listOfPlayersTemp = []
                data.forEach(person => {
                    listOfPlayersTemp.push({ [person.id]: person.data() });
                });
                setListOfPlayers(listOfPlayersTemp);
            })
        return () => {
            console.log("cleanup");
            unsubscribe()
        }
    }, [db, props.level]);

    return (
        <div>
            <h1>Hall of fame, level {props.level}</h1>
            {listOfPlayers && listOfPlayers.map(player => {
                return <h1 key={uniqid()}>{Object.keys(player)}</h1>
            })}
        </div>
    )
}

export default Scoreboard;