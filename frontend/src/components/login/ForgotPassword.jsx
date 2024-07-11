import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "./ForgotPassword.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  resetPassword,
  clearSuccessMessage,
} from "../../features/passwordResetSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, successMessage } = useSelector(
    (state) => state.passwordReset
  );

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  const validateEmail = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const navigate = useNavigate();

  const submitEmail = async (e) => {
    e.preventDefault();

    if (email && !emailError) {
      const formData = new FormData();
      formData.append("email", email);
      const response = dispatch(resetPassword(formData));
     
      
    } else {
      toast.error("Please enter a valid email address");
    }
    
  };

  useEffect(() => {
    
    if (successMessage) {
      document.getElementById("success-message").innerHTML=successMessage;
      toast.success(successMessage)
      dispatch(clearSuccessMessage());

    }
    setEmail("")
  }, [successMessage]);

  return (
    <div>
      <ToastContainer />
      <form>
        <div className="password-container-wrapper">
          <div className="password-container">
            <div className="password-content">
              <h3 className="password-recovery-heading">Password Recovery</h3>
              <p className="message-password" id="success-message"></p>
              <input
                className="email-recovery"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmail}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
              <button className="password-submit" onClick={submitEmail}>
                {loading ? "wait..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
