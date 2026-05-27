import { useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../styles/settings.css";

const Settings = () => {

  const [isLogin, setIsLogin] =
    useState(true);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

    });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // ================= LOGIN =================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(

            "https://student-productivity-mern.onrender.com/api/auth/login",

            {

              email:
                formData.email,

              password:
                formData.password,

            }

          );

        localStorage.setItem(

          "token",

          response.data.token

        );

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )

        );

        alert(
          "Login Successful"
        );

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          "Login Failed"
        );

      }

    };

  // ================= REGISTER =================

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          "https://student-productivity-mern.onrender.com/api/auth/register",

          formData

        );

        alert(
          "Account Created"
        );

        setIsLogin(true);

      } catch (error) {

        console.log(error);

        alert(
          "Registration Failed"
        );

      }

    };

  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

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

        {/* ================= PROFILE ================= */}

        {user ? (

          <div className="settings-card">

            <h2 className="card-title">
              Profile
            </h2>

            <div className="profile-box">

              <div className="profile-circle">

                {user.name?.charAt(0)}

              </div>

              <div>

                <h3 className="profile-name">
                  {user.name}
                </h3>

                <p className="profile-email">
                  {user.email}
                </p>

              </div>

            </div>

            <button
              className="main-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="settings-card">

            {/* ================= TOGGLE ================= */}

            <div className="auth-toggle">

              <button
                type="button"
                className={
                  isLogin
                    ? "toggle-btn active-btn"
                    : "toggle-btn"
                }
                onClick={() =>
                  setIsLogin(true)
                }
              >
                Login
              </button>

              <button
                type="button"
                className={
                  !isLogin
                    ? "toggle-btn active-btn"
                    : "toggle-btn"
                }
                onClick={() =>
                  setIsLogin(false)
                }
              >
                Sign Up
              </button>

            </div>

            {/* ================= FORM ================= */}

            <form
              className="auth-form"
              onSubmit={
                isLogin
                  ? handleLogin
                  : handleRegister
              }
            >

              {/* NAME */}

              {!isLogin && (

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              )}

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* PASSWORD */}

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* PASSWORD NOTE */}

              <p
                style={{

                  color: "#facc15",

                  fontSize: "12px",

                  lineHeight: "1.5",

                  marginTop: "8px",

                  marginBottom: "18px",

                  textAlign: "left",

                }}
              >

                ⚠ Please save your
                password safely.
                Password recovery is
                currently unavailable.

              </p>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="main-btn"
              >

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