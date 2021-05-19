const Game = (props) => {
    const gameData = props.gameData;

    const handleImageClick = (event) => {
        event.preventDefault();
        console.log(event.target);
    }

    return (
        <div>
            <h1>This is {props.gameName} game</h1>
            <button onClick={() => props.triggerChange("") }>Back</button>
            <img src={gameData.url} alt={`Where's Waldo ${gameData.level.charAt(0).toUpperCase() + gameData.level.slice(1)}`} onClick={handleImageClick} />
        </div>
    )
}

export default Game;