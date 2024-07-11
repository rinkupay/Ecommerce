import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./ProfilePasswordChange.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileSideMenu from "./ProfileSideMenu";
import { useNavigate } from "react-router-dom";
import { resetMessage, updatePassword } from "../../features/userReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const ProfilePasswordChange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isoldPassword, setIsOldPassword] = useState(false);
  const [isnewPassword, setIsNewPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const toggleOldPassword = () => {
    setIsOldPassword(!isoldPassword);
  };
  const toggleNewPassword = ()=>{
    setIsNewPassword(!isnewPassword);
  }

  const toggleConfirmPassword = ()=>{
    setIsConfirmPassword(!isConfirmPassword)
  }

  const { message, loading } = useSelector((state) => state.userRed);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const submitPassword = (e) => {
    e.preventDefault();

    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match");
      } else {
        const formData = new FormData();
        formData.append("currentPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("confirmPassword", confirmPassword);

        const response = dispatch(updatePassword(formData));

        
      }
    } else {
      toast.error("all fields Required");
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
     
    }
  }, [message]);
  return (
    <div>
      <div className="profile-container-wrapper">
        <ToastContainer />
        <div className="profile-container">
          <div className="profile-left-container">
            <ProfileSideMenu />
          </div>
          <div className="profile-right-container">
            <div className="profile-main">
              <div className="profile-heading">
                <h4>Change Password</h4>
              </div>

              <div className="password-container">


                <div className="password-wrapper">
                  <input
                    type={isoldPassword ? "text" : "password"}
                    className="password-input"
                    onChange={handleOldPassword}
                    placeholder=" Old Password"
                  />
                  <p className="eye-icon" onClick={toggleOldPassword}>
                    {isoldPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </p>
                </div>


                <div className="password-wrapper">
                  <input
                    type={isnewPassword ? "text" : "password"}
                    className="password-input"
                    onChange={handleNewPassword}
                    placeholder=" New Password"
                  />
                  <p className="eye-icon" onClick={toggleNewPassword}>
                    {isnewPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </p>
                </div>
                <div className="password-wrapper">
                  <input
                    type={isConfirmPassword ? "text" : "password"}
                    className="password-input"
                    onChange={handleConfirmPassword}
                    placeholder="Confirm Password"
                  />
                  <p className="eye-icon" onClick={toggleConfirmPassword}>
                    {isConfirmPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </p>
                </div>
              </div>

              <div className="password-btn">
                <button className="pass-btn" onClick={submitPassword}>
                  {loading ? "Wait" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePasswordChange;
