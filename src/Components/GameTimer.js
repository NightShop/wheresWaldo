import { useEffect, useState } from "react";

const GameTimer = () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const timerID = setInterval(() => setTimer(t => t + 1), 1000);

        return () => {
            clearInterval(timerID);
        }
    }, []);

    return <p>{timer}</p>
}

export default GameTimer;