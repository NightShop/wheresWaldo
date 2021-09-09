const CharacterIcon = (props) => {
    const charactersPhotoLinks = {
        "waldo": "https://i.imgur.com/xWpUyMw.png",
        "wilma": "https://i.imgur.com/TPHP1C3.png",
        "wizard": "https://i.imgur.com/c7ZSIO2.png"
    }

    let classes = "charImg";
    if (Object.values(props.character)[0] === true) {
        classes += " found"
    }

    let classesCircle = "charCircle"

    if(props.isButton === true) {
        classesCircle += " isCharacterCircle";
        classes += " isCharacterButton";
    }

    return (
        <div className={classesCircle}>
            <img className={classes} src={charactersPhotoLinks[Object.keys(props.character)[0]]} alt="missing" />
        </div>
    )
}

export default CharacterIcon;