import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./settings.css";

const Settings = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://student-productivity-mern.onrender.com",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://student-productivity-mern.onrender.com",
        formData
      );

      alert("Account Created");

      setIsLogin(true);

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged Out");

    window.location.reload();
  };

  // ================= USER =================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="settings-page">

        <h1 className="settings-title">
          Settings
        </h1>

        {/* ================= USER PROFILE ================= */}

        {user && (

          <div className="settings-card">

            <h2>Profile</h2>

            <div className="profile-box">

              <div className="profile-circle">
                {user.name?.charAt(0)}
              </div>

              <div>

                <h3>{user.name}</h3>

                <p>{user.email}</p>

              </div>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* ================= AUTH FORM ================= */}

        {!user && (

          <div className="settings-card">

            <div className="auth-toggle">

              <button
                className={
                  isLogin ? "active-auth" : ""
                }
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>

              <button
                className={
                  !isLogin ? "active-auth" : ""
                }
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>

            </div>

            <form
              onSubmit={
                isLogin
                  ? handleLogin
                  : handleRegister
              }
              className="auth-form"
            >

              {!isLogin && (

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={handleChange}
                />

              )}

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />

              <button type="submit">

                {isLogin
                  ? "Login"
                  : "Create Account"}

              </button>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};

export default Settings;