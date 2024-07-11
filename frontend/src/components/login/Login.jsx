import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,resetMessage } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import Loader from "../../components/Loader/Loader";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loading, isLoggedIn, message } = useSelector(
    (state) => state.userRed
  );


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle User Data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // To Navigate Register Page
  const registerRedirect = () => {
    navigate("/register");
  };

  // Logging User
  const login = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      dispatch(loginUser(user));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
    if (message) {
      toast(message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
      
    }
    dispatch(resetMessage())
  }, [isLoggedIn,message]);

  return (
    <>
      <div>
      <div className="register-wrapper">
      <ToastContainer />
            <div className="register-contents">
              <form className="form-contents">
                <h3 className="register-heading"> Login</h3>
                <p id="message"></p>

                <div className="input-email">
                  <MailOutlineRoundedIcon className="email-icon" />

                  <input
                    className="register-input"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div className="input-email">
                  <LockOpenRoundedIcon className="email-icon" />
                <input
                  className="register-input"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Your Password"
                  required
                />
                </div>
                <button className="register-btn" onClick={login}>
                  Login
                </button>
                <p className="forgot-password" onClick={()=>navigate("/password/reset")}>Forgot Password ?</p>
                <button className="register-btn" onClick={registerRedirect}>
                  SignUp
                </button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
};

export default Login;
