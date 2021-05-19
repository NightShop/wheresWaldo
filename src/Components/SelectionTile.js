const SelectionTile = (props) => {
    

    return (
        <div className="selectionTile">
            <button onClick={() => props.triggerChange(props.level)} >
                <img className="tileImage" src={props.url} alt="wally" />
                <h5>{props.level}</h5>
            </button>
        </div>
    )
}

export default SelectionTile;