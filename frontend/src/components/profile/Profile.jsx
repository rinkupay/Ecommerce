import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileSideMenu from "./ProfileSideMenu";
import { useNavigate } from "react-router-dom";
import { resetMessage, updateUser } from "../../features/userReducer";
import { toast } from "react-toastify";





const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, loading, isLoggedIn ,message} = useSelector(
    (state) => state.userRed
  );

  // <<=================== HANDLE USER DATA ================================>>
  const [user, setUser] = useState({
    email: `${userDetails && userDetails.user.email}`,
    name: `${userDetails && userDetails.user.name}`,
    mobile: `${userDetails && userDetails.user.mobile}`,
    gender: `${userDetails && userDetails.user.gender}`,
  });

  // Handle User Data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const [isDisabled, setIsDisabled] = useState(true);


  // <<===========================  UPDATE CALL ======================>>>
  const update = ()=>{
   dispatch(updateUser(user))
    setIsDisabled(true);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  },[isLoggedIn]);

  useEffect(()=>{
    if(message){
      toast(message)
      dispatch(resetMessage());
    }
  })
  return (
    <div>
      <div className="profile-container-wrapper">
        <div className="profile-container">
          <div className="profile-left-container">
            <ProfileSideMenu />
          </div>
          <div className="profile-right-container">
            <div className="profile-main">
              <div className="profile-heading">
                <h4>Personal Information</h4>
                {isDisabled ? <span className="info-edit" onClick={()=>setIsDisabled(false)}>Edit</span>:
                <span className="info-edit" onClick={update}>Save</span>}
              </div>
              <div className="profile-input">
                <input
                  className={`profile-value ${!isDisabled ? 'active' : ''} `}
                  disabled={isDisabled}
                  value={user.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                />
                {/* <input
                  className="profile-value"
                  onChange={handleChange}
                  type="text"
                  name="name"
                    // value={userDetails && userDetails.user.name}
                  disabled={isDisabled}
                /> */}
              </div>
              <div className="gender">
                <p className="gender-heading">Gender</p>
                <div className="radio-gender">
                  <label>
                    <input
                      className="gender-input"
                      name="gender"
                      type="radio"
                      checked={user.gender === "male"}
                      value="male"
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                    Male
                  </label>

                  <label>
                    <input
                      className="gender-input"
                      name="gender"
                      type="radio"
                      value="female"
                      checked={user.gender === "female"}
                      disabled={isDisabled}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="profile-heading">
                <h4>Email Address</h4>
                <span className="info-edit">Edit</span>
              </div>
              <div className="profile-input">
                <input
                 className={`profile-value ${!isDisabled ? 'active' : ''} `}
                  disabled={isDisabled}
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-heading">
                <h4>Mobile Number</h4>
                <span className="info-edit">Edit</span>
              </div>
              <div className="profile-input">
                <input
                 className={`profile-value ${!isDisabled ? 'active' : ''} `}
                  disabled={isDisabled}
                  type="number"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
