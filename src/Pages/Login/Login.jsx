import { useState } from "react";

import learnImg from "../../assets/learnImg.avif";

import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { BASE_URI } from "../../Config/url";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
    {
      rememberMe
        ? localStorage.setItem("rememberMee", "rememberMee")
        : localStorage.removeItem("rememberMee");
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);
    axios
      .post(`${BASE_URI}/api/v1/auth/login`, data)
      .then((resp) => {
        localStorage.setItem("user", resp.data.Data);
        localStorage.setItem("userType", resp.data.Data.user_type);
        localStorage.setItem("token", resp.data.token);
        setData({
          email: "",
          password: "",
        });
        toast.success("Logged In Successfully!");
        navigate("/courses");
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setIsLoding(false);
        toast.error(`Error: ${err?.response?.data?.message}`);
      });
  };

  if (localStorage.getItem("rememberMee")) {
    return <Navigate to="/courses" />;
  }
  return (
    <div className="container-fluid signin-container ">
      <div className="row w-100 h-100">
        <div className="signup-image w-50">
          <img src={learnImg} alt="Image" className="img-fluid" />
          <div className="signUp-text ">
            <h3 className="expertise mb-0">Share Your Expertise.</h3>
            <h3 className="expertise mb-4">
              Inspire Athletes. Transform Lives.
            </h3>
            <div className="join-team d-flex justify-content-center">
              <p className="w-75">
                Join our team of elite instructors and make a difference in the
                world of sports and athletics.
              </p>
            </div>
          </div>
        </div>
        <div className="signUp-form col-md-5 w-50 p-4">
          <div className="signup-start mt-0">
            <h2 className="mt-3">Sign In</h2>
            <p>Start your Inspiring journey now!</p>
          </div>
          <div className="signup-auth">
            <button
              type="button"
              className="bttns google-signup border border-black"
              style={{
                background: "none",
                color: "black",
              }}
            >
              <FcGoogle className="googleIcon" />
              Signup with Google
            </button>
            <button
              type="button"
              className="bttns  border border-black"
              style={{
                background: "none",
                color: "black",
              }}
            >
              <FaApple className="appleIcon" />
              Signup with Apple
            </button>
          </div>
          <div className="d-flex align-items-center py-4">
            <p
              className="mb-0"
              style={{
                height: "1px",
                backgroundColor: "#C9D1D5",
                width: "50%",
              }}
            ></p>{" "}
            <span className=" fs-small px-2">OR</span>
            <p
              style={{
                height: "1px",
                backgroundColor: "#C9D1D5",
                width: "50%",
              }}
              className="mb-0"
            ></p>
          </div>

          <form action="signIn" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold fs-small">
                Email
              </label>
              <div className="input-group">
                <label htmlFor="email" className="input-group-text">
                  <MdOutlineEmail />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  aria-label="Email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold fs-small">
                Password
              </label>
              <div className="input-group">
                <label htmlFor="password" className="input-group-text">
                  <IoKeyOutline />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control border-end-0"
                  placeholder="Enter Password"
                  aria-label="Password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text border-start-0"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="neutral-color" />
                  ) : (
                    <FaEyeSlash className="neutral-color" />
                  )}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="form-check-label fs-small"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#!"
                onClick={handleForgotPasswordClick}
                className="accent-color"
              >
                Forgot Password?
              </a>
            </div>

            <button className="signup-now w-100">
              {isLoding ? <PulseLoader size={8} color="white" /> : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <p className="fs-small">
              Don’t have account yet?
              <Link to="/signUp" className="login-link text-black fw-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
