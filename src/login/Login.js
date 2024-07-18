import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../config/fireBaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { parseErrorLoginMessage } from "../utils/parseMessages";
import { setLoginerror } from '../redux/generalSlice';
import AlertMessage from '../components/AlertMessage';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  const callSignInWithGoogle = async () => {
    const res = await signInWithGoogle();
    console.log(res);
    if(res !== true) {
      const message = await parseErrorLoginMessage(res);
      console.log(message);
      dispatch(setLoginerror(message));
      setOpen(true);
    }
  }

  const callLogInWithEmailAndPassword = async (email, password) => {
    const res = await logInWithEmailAndPassword(email, password);
    console.log(res);
    if(res !== true) {
      const message = await parseErrorLoginMessage(res);
      console.log(message);
      dispatch(setLoginerror(message));
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <AlertMessage handleClose={handleClose} open={open} severity="error" message={generalSettings.loginError}/>
      <div className="login">
        <div className="login__container">
          <h2>
            Login
          </h2>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && callLogInWithEmailAndPassword(email, password)}
            placeholder="Password"
            />
          <button
            className="login__btn"
            onClick={() => callLogInWithEmailAndPassword(email, password)}
            >
            Login
          </button>
          <button className="login__btn login__google" onClick={callSignInWithGoogle}>
            Login with Google
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;