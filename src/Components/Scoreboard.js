import { useEffect, useState } from "react";
import firebase from "../Firebase";
import uniqid from "uniqid";
import ScoreboardLine from "./ScoreboardLine";

const Scoreboard = (props) => {
    const [listOfPlayers, setListOfPlayers] = useState();
    const db = firebase.firestore();


    useEffect(() => {
        const unsubscribe = db.collection(`scoreBoard-${props.level}`)
            .orderBy("time")
            .limit(10)
            .onSnapshot(data => {
                let listOfPlayersTemp = []
                data.forEach(person => {
                    listOfPlayersTemp.push({ [person.id]: person.data().time });
                });
                setListOfPlayers(listOfPlayersTemp);
                console.log(listOfPlayersTemp);
            })
        return () => {
            console.log("cleanup");
            unsubscribe();
        }
    }, [db, props.level]);

    return (
        <div>
            <h2 className="hallOfFame">Top 10</h2>
            {listOfPlayers && listOfPlayers
                .map(player => {
                    return <ScoreboardLine key={uniqid()} name={Object.keys(player)} time={Object.values(player)} />
                })}
        </div>
    )
}

export default Scoreboard;