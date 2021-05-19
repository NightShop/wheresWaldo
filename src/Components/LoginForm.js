import { useState } from "react";

const LoginForm = (props) => {
   const [nickname, setNickname] = useState("");

    return <div className="loginForm">
        <form>
            <label>Enter nickname: </label>
            <input value={nickname} onChange={(ev) => setNickname(ev.target.value)} />
            <button onClick={(event) => {
                props.onbuttonClick(nickname)
                }}>Apply</button>
        </form>
    </div>
}

export default LoginForm;