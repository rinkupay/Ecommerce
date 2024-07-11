import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutUser } from "../../features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { SlArrowRight } from "react-icons/sl";
import { IoCameraOutline } from "react-icons/io5";
import "./ProfileSideMenu.css";
import {updatePicture} from "../../features/userReducer"


const ProfileSideMenu = () => {
  const [avatar, setAvatar] = useState("");
  const [profilePicture,setProfilePicture] = useState(null);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userRed);

  const logout = () => {
    dispatch(logoutUser());
  };

  const updateProfileImage = () => {};

  const handleImage = (e) => {
    if(e.target.value){
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){
          setProfilePicture(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    setAvatar(e.target.files[0])

    // dispatching profile picture for updating

    const formData = new FormData();
    formData.set("image",avatar);

    dispatch(updatePicture(formData));


  };

  return (
    <div>
      <div className="profile-left-container">
        <div className="profile-menu-1">
          <div className="image-container">
           { userDetails && userDetails.user.avater ?  <img
              className="profile-image-1"
              // src="https://www.pngkey.com/png/detail/29-296176_honor-9lite-honor-9-lite-png.png"
              src={profilePicture}
              alt=""
             
            /> : <RiAccountCircleLine  size={28}/>}
            <div className="input-image-label">
              <label htmlFor="image">
                {/* <IoCameraOutline size={23} cursor={"pointer"} /> */}
              </label>
              <input type="file" id="image" className="input-image"  onChange={handleImage}/>
            </div>
          </div>
          <div className="name-greet">
            <p>Hello</p>
            <h4>{userDetails && userDetails.user.name}</h4>
          </div>
        </div>

        <div className="profile-menu-1 link-active">
          <div className="icon-profile-menu">
            <FaFileUpload color="#2874F1" fontSize={20} />
            <Link to="/myorders" className="profile-link">
              MY ORDERS
            </Link>
          </div>
          <SlArrowRight />
        </div>

        <div className="profile-menu-1 link-active more">
          <div className="icon-profile-menu">
            <RiAccountCircleLine color="#2874F1" fontSize={20} />
            <Link to="/account-settings" className="profile-link">
              ACCOUNT SETTINGS
            </Link>
          </div>
          <div className="links">
            <Link to="/change/password" className="profile-sub-link">
              Change Password
            </Link>
            <Link to="/manage-addresses" className="profile-sub-link">
              Manage Addresses
            </Link>
          </div>
        </div>

        <div className="profile-menu-1 link-active">
          <div className="icon-profile-menu" onClick={logout}>
            <AiOutlineLogout color="#2874F1" fontSize={20} />
            <Link to="/" className="profile-link">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideMenu;
