import { useEffect, useState } from "react";
import firebase from "../Firebase";
import uniqid from "uniqid";
import ScoreboardLine from "./ScoreboardLine";

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
                const values = Object.values(player);
                return <ScoreboardLine key={uniqid()} name={Object.keys(player)} beginningSeconds={values[0].timeBeginning && values[0].timeBeginning.seconds} endSeconds={values[0].timeEnd && values[0].timeEnd.seconds} />
            })}
        </div>
    )
}

export default Scoreboard;