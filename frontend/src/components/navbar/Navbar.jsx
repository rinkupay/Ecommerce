import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Search from "../search/Search";
import { logoutUser } from "../../features/userReducer";
import Loader from "../Loader/Loader";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.png";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { RiAccountCircleLine } from "react-icons/ri";
import { ImFolderUpload } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { fetchCart } from "../../features/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userDetails, isLoggedIn } = useSelector(
    (state) => state.userRed
  );
  const { cart } = useSelector((state) => state.cart);

  const [profileMenu, setProfileMenu] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //  <<================= CART BADGE ==================================>>
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 9,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  // <<=====================  SPEED DIAL ===========================>>
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(true);
  };
  const toggleProfileMenuMouseDown = () => {
    setProfileMenuOpen(false);
  };

  const resetSpeedMenu = () => {};

  // <========================= Profile Picture ==============>
  const [profile, setProfile] = useState();

  // <==========================SPEED DIAL MENU =========================>

  const [speedDialMenu, setSpeedDialMenu] = useState(false);

  // <=============================  LOGOUT  ==================================>
  const logout = () => {
    dispatch(logoutUser());
    setProfileMenuOpen(false);
    // setSpeedDialMenu(false);
  };

  // <<========================== GOTO DASHBOARD ==============================>>
  const goToDashboard = () => {
    navigate("/admin/dashboard");
    setProfileMenuOpen(false);
  };
  // <<========================== GOTO DASHBOARD ==============================>>
  const goToProfile = () => {
    navigate("/profile");
    setProfileMenuOpen(false);
  };
  // <<========================== GOTO DASHBOARD ==============================>>
  const goToMyOrders = () => {
    navigate("/myorders");
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <nav>
      {loading ? (
        <Loader />
      ) : (
        <div className="nav-wrapper">
          <div className="nav-container">
            <div className="logo">
              <Link to="/" className="title">
                ECOMMERCE
              </Link>
            </div>
            <div className="logo-mobile">
              <Link to="/" className="title">
                <img className="logo-mobile-image" src={logo} alt="" />
              </Link>
            </div>
            <div className="search">
              <Search />
            </div>

            {/* <<<<<<<<<<========================= HAMBURGER MENU =========================>>>>>>>>>>>>>>>>>> */}
            <div className="hamburger-container" onClick={toggleMenu}>
              {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </div>

            <div className={menuOpen ? "nav-menu active" : "nav-menu"}>
              <ul>
                {/* <<<<<<<<==================== NAVBAR MENUS =======================>>>>>>>>>>>>>> */}
                {isLoggedIn && (
                  <li
                    onMouseOver={toggleProfileMenu}
                    onMouseOut={toggleProfileMenuMouseDown}
                  >
                    <div className="profile-name-container">
                      <div className="name-container">
                        <p className="name">
                          {userDetails && userDetails.user.name.substr(0, 6)}
                        </p>
                        {profileMenuOpen ? <SlArrowDown /> : <SlArrowUp />}
                      </div>
                      {profileMenuOpen && (
                        <div className="sub-menues-container">
                          <div className="sub-menus" onClick={goToProfile}>
                            <p>
                              <RiAccountCircleLine color="#2874F1" />
                            </p>
                            <p className="menus-menu">Profile</p>
                          </div>
                          <div className="sub-menus" onClick={goToMyOrders}>
                            <p>
                              <ImFolderUpload color="#2874F1" />
                            </p>
                            <p className="menus-menu">My Orders</p>
                          </div>
                          {/* <<============================= DASHBOARD FOR ADMIN ONLY =======================> */}
                          {userDetails && userDetails.user.role === "admin" && (
                            <div className="sub-menus" onClick={goToDashboard}>
                              <p>
                                <RxDashboard color="#2874F1" />
                              </p>
                              <p className="menus-menu">Dashboard</p>
                            </div>
                          )}

                          <div className="sub-menus" onClick={logout}>
                            <p>
                              <BiLogOutCircle color="#2874F1" />
                            </p>
                            <p className="menus-menu">Logout</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                )}

                {/* <<<<<<<<<<<<<============== LOGIN BUTTON ===================>>>>>>>>>>>>> */}
                {!isLoggedIn && (
                  <li className="login-btn" onClick={() => navigate("/login")}>
                    <div className="login-btn-container">
                      {/* <RiAccountCircleLine /> */}
                      <p className="login-btn-action">Login</p>
                    </div>
                  </li>
                )}
                <li>
                  <NavLink
                    className="link"
                    to="/products"
                    onClick={() => setMenuOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="link"
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="link"
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>

                {isLoggedIn && (
                  <li className="badge">
                    <IconButton
                      onClick={() => navigate("/mycart")}
                      aria-label="cart"
                    >
                      <StyledBadge
                        badgeContent={cart && cart.cartCount}
                        color="secondary"
                      >
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
