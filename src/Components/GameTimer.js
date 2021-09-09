import { useEffect, useState } from "react";

const GameTimer = (props) => {
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        if ((props.allCharFound === true) && props.gameOver === false) {
            props.getTime(timer);
            props.setGameOver(true);
        }
    })

    useEffect(() => {
        const timerID = setInterval(() => setTimer(t => t + 1), 1000);

        if(props.gameOver === true) {
            clearInterval(timerID);
        }

        return () => {
            clearInterval(timerID);
        }
    }, [props.gameOver]);

    return <p className="timer">{timer}</p>
}

export default GameTimer;