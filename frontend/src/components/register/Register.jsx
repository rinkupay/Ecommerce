import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/registerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.registerUser);

  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',

  });


  const handleChange = (event) => {
    if (event.target.name === 'avatar') {
      setImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', avatar); // Append the avatar image to the form data


    
   
     dispatch(registerUser(formData));
  };

  const loginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="register-wrapper">
          <div className="register-contents">
            <form className="form-contents">
              <h3 className="register-heading">Register</h3>
              <img src={avatar} className="image" alt="" />
              <input
                className="register-input"
                name="name"
                value={user.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Name"
                required
              />
              <input
                className="register-input"
                name="email"
                value={user.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                required
              />
              <input
                className="register-input"
                name="password"
                value={user.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter Your Password"
                required
              />

              <label htmlFor="profile" className="profile-image">
                Select Profile Image
              </label>
              <input type="file" id="profile" name="avatar" onChange={handleChange} />

              <button className="register-btn" onClick={signUp}>
                SignUp
              </button>
              <button className="register-btn" onClick={loginRedirect}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
