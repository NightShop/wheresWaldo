const SelectionTile = (props) => {
    

    return (
        <div>
            <button onClick={() => props.triggerChange("test")} >
                <img className="" src="https://i.imgur.com/CU6iiOf.jpeg" alt="wally" />
                <h5>Easy</h5>
            </button>
        </div>
    )
}

export default SelectionTile;