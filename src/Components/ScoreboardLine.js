const ScoreboardLine = (props) => {
    console.log(props.endSeconds === undefined);
    if((props.endSeconds === undefined) || props.beginningSeconds === undefined) {
        return null;
    }

    return (
        <div>
        <h1>{props.name} - {props.endSeconds - props.beginningSeconds}</h1>
        </div>
    )
}

export default ScoreboardLine;