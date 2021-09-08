import { useState } from "react";

const LoginForm = (props) => {
   const [nickname, setNickname] = useState("");

    return <div className="loginForm">
        <form>
            <input value={nickname} onChange={(ev) => setNickname(ev.target.value)} />
            <br/>
            <button className="loginFormButtons" onClick={(event) => {
                event.preventDefault();
                props.onClickSubmitButton(nickname)
                }}>Submit</button>
        </form>
    </div>
}

export default LoginForm;