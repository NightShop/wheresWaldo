const ScoreboardLine = (props) => {
    if(props.time === undefined) {
        return null;
    }

    return (
        <div>
        <h5 className="scoreBoardLine">{props.name} - {props.time}</h5>
        </div>
    )
}

export default ScoreboardLine;