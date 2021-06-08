const ScoreboardLine = (props) => {
    if(props.time === undefined) {
        return null;
    }

    return (
        <div>
        <h1>{props.name} - {props.time}</h1>
        </div>
    )
}

export default ScoreboardLine;