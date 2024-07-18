import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../config/fireBaseConfig";
import { parseErrorLoginMessage } from "../utils/parseMessages";
import { setLoginerror } from '../redux/generalSlice';
import AlertMessage from '../components/AlertMessage';
import "./Reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const generalSettings = useSelector((state) => state.general);
  const dispatch = useDispatch();


  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);

  const callSendPasswordReset = async (email) => {
    const res = await sendPasswordReset(email);
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
      <div className="reset">
        <div className="reset__container">
          <h2>
            Reset
          </h2>
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <button
            className="reset__btn"
            onClick={() => callSendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
}
export default Reset;