import { Redirect } from "react-router";

const ImgDropdown = (props) => {

    console.log(props.x, " ", props.y);

    return (
        <div className="imgDropdown" 
        style={
            {
                position: "absolute",
                top: props.y,
                left: props.x,
                border: "5px solid red",
            }
        }>
            <button>
                Im a dropdown
            </button>
        </div >
    )
}

export default ImgDropdown;