import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { parseErrorLoginMessage } from "../utils/parseMessages";
import { setLoginerror } from '../redux/generalSlice';
import AlertMessage from '../components/AlertMessage';
import "./Register.css";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../config/fireBaseConfig";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const register = async () => {
    if (!name) console.log("Please enter name");
    const res = await registerWithEmailAndPassword(name, email, password);
    console.log(res);
    if(res !== true) {
      const message = await parseErrorLoginMessage(res);
      console.log(message);
      dispatch(setLoginerror(message));
      setOpen(true);
    }
  }

  useEffect(() => {
    if (loading) return;
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <AlertMessage handleClose={handleClose} open={open} severity="error" message={generalSettings.loginError}/>
      <div className="register">
        <div className="register__container">
          <h2>
            Register
          </h2>
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <button
            className="register__btn register__google"
            onClick={callSignInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;