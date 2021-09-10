import LoginForm from "./LoginForm"

const LoginPopup = (props) => {
    return (
        <div className="LoginPopup">
            <p>Submit your score</p>
            <LoginForm onClickSubmitButton={props.onClickSubmitButton}/>
            <button className="loginFormButtons buttonGeneral" onClick={() => props.triggerChange("")}>Back</button>
        </div>
    )
}

export default LoginPopup;