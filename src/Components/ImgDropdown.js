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
                backgroundColor: "transparent", 
            }
        }>
            {characters && Object.keys(characters).map((keyObj, i) => {
                return <button className="characterButton" onClick={() => selectionCheck(keyObj)} key={uniqid()}>
                    <CharacterIcon isButton={true} character={props.charactersFound[i]}/>
                </button>
            })}
        </div >
    )
}

export default ImgDropdown;