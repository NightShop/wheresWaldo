import Scoreboard from "./Scoreboard";

const SelectionTile = (props) => {


    return (

        <button className="selectionTile" onClick={() => props.triggerChange(props.level)} >
            <img className="tileImage" src={props.url} alt="wally" />
            <h5>{props.level}</h5>
            <Scoreboard level={props.level} />
        </button>

    )
}

export default SelectionTile;