import { Redirect } from "react-router";
import uniqid from "uniqid";
const ImgDropdown = (props) => {

    const characters = props.characters;

    const selectionCheck = (charName) => {
        props.selectionCheck(charName);
    }

    return (
        <div className="imgDropdown" onClick={props.closeDropdown}
        style={
            {
                position: "absolute",
                top: props.y,
                left: props.x,
                border: "5px solid red",
            }
        }>
            {characters && Object.keys(characters).map(keyObj => {
                return <button onClick={() => selectionCheck(keyObj)} key={uniqid()}>{keyObj}</button>
            })}
        </div >
    )
}

export default ImgDropdown;