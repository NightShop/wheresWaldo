import { useState } from "react";

const LoginForm = (props) => {
   const [nickname, setNickname] = useState("");

    return <div className="loginForm">
        <form>
            <label>Name: </label>
            <input value={nickname} onChange={(ev) => setNickname(ev.target.value)} />
            <br/>
            <button className="loginFormButtons buttonGeneral" onClick={(event) => {
                event.preventDefault();
                props.onClickSubmitButton(nickname)
                }}>Submit</button>
        </form>
    </div>
}

export default LoginForm;