import { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateBasic, authenticateGoogle } from "../../store/authActions";
import classes from "./index.module.css";

const Login = () => {
    const [userEmailAddress, setUserEmailAddress] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const dispatch = useDispatch();

    const onHandleGoogleLogin = async () => {
        dispatch(authenticateGoogle());
    };

    const onHandleBasicLogin = async (event) => {
        event.preventDefault();
        dispatch(authenticateBasic({ email: userEmailAddress, password: userPassword }));
    };

    return (
      <div className={classes.Container}>
          <button className={classes.LoginGoogle} onClick={onHandleGoogleLogin}>Sign in with Google</button>
          <form className={classes.LoginForm}>
              <input className={classes.Input} type="text" defaultValue={userEmailAddress}
                     onChange={(event) => setUserEmailAddress(event.target.value)} placeholder="Email"/>
              <input className={classes.Input} type="password" defaultValue={userPassword}
                     onChange={(event) => setUserPassword(event.target.value)} placeholder="Password"/>
              <input className={classes.LoginButton} type="submit" onClick={onHandleBasicLogin}/>
          </form>
      </div>
    );
};

export default Login;