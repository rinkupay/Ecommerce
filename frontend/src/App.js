import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import WebFont from "webfontloader";
import Footer from "./components/footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import { loadUser } from "./features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import MyCart from "./components/mycart/MyCart";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import AdminRoute from "./components/Route/AdminRoute";

// Lazy-loaded components
const Home = lazy(() => import("./components/home/Home"));
const ProductDetails = lazy(() =>
  import("./components/products/productDetails/ProductDetails")
);
const Products = lazy(() =>
  import("./components/products/allProducts/Products")
);
const Login = lazy(() => import("./components/login/Login"));
const Register = lazy(() => import("./components/register/Register"));
const Profile = lazy(() => import("./components/profile/Profile"));
const MyOrder = lazy(() => import("./components/orders/MyOrder"));
const OrderDetails = lazy(() => import("./components/orders/OrderDetails"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const ForgotPassword = lazy(() => import("./components/login/ForgotPassword"));
const AdminPorducts = lazy(() =>
  import("./components/dashboard/AdminProducts")
);
const Orders = lazy(() => import("./components/dashboard/Orders"));

const AdminUsers = lazy(() => import("./components/dashboard/AdminUsers"));
const ProfilePasswordChange = lazy(() =>
  import("./components/profile/ProfilePasswordChange")
);
const OrderSummary = lazy(() => import("./components/orders/orderSummary"));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.userRed);

  useEffect(() => {
    dispatch(loadUser());
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  // Function to check if current route is the Login or Register route
  const isLoginOrRegisterRoute = () =>
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="body">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/myorders"
                element={
                  <ProtectedRoute>
                    <MyOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change/password"
                element={
                  <ProtectedRoute>
                    <ProfilePasswordChange />
                  </ProtectedRoute>
                }
              />
              <Route path="/myorders/:id" element={<OrderDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/mycart" element={<MyCart />} />
              <Route path="/password/reset" element={<ForgotPassword />} />

              {/* <<<<<======================= ADMIN PROTECTED ROUTE ========================>>>>>>>>>>>>>>>>>>> */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminPorducts />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <Orders />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />

              <Route path="/order/summary" element={<OrderSummary />} />
            </Routes>
          </Suspense>
        </div>
        {!isLoginOrRegisterRoute() && <Footer />}
      
      </div>
    </>
  );
}

export default App;
