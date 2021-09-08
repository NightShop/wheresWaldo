import uniqid from "uniqid";
import CharacterIcon from "./CharacterIcon";
const ImgDropdown = (props) => {

    const characters = props.characters;
    console.log(characters);

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
            {characters && Object.keys(characters).map((keyObj, i) => {
                return <button onClick={() => selectionCheck(keyObj)} key={uniqid()}>
                    <CharacterIcon character={props.charactersFound[i]}/>
                </button>
            })}
        </div >
    )
}

export default ImgDropdown;