import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import learnImg from "../../assets/learnImg.avif"; // Assuming this is the image on the left
import { Link } from "react-router-dom";
import { BASE_URI } from "../../Config/url";
import axios from "axios";
import toast from "react-hot-toast";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URI}/api/v1/auth/forgot-password`, {
        email,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .then((err) => {
        // console.log(err);
        toast.error(
          err.response
            ? err?.response?.data?.message
            : "Failed to send password reset email. Please try again later."
        );
      });
  };

  return (
    <div className="p-5 vh-100">
      <div className="container-fluid signin-container h-100">
        <div className="row w-100 h-100">
          <div className="signup-image w-50">
            <img src={learnImg} alt="Image" className="img-fluid" />
            <div className="signUp-text">
              <h3 className="expertise mb-0">
                Get ready to start your learning journey!
              </h3>
              <p className="w-75 mt-4 mx-auto text-white">
                Dive into your courses, expand your skills, and achieve your
                goals with us.
              </p>
            </div>
          </div>
          <div className="signUp-form col-md-5 w-50 py-4 px-5 d-flex flex-column justify-content-center gap-5">
            <div className="signup-start mt-0">
              <h1 className="mt-3 mb-3">Password Recovery</h1>
              <p>Provide your email address, and we'll help you</p>
              <p> get back on track right away.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold fs-small">
                  Email
                </label>
                <div className="input-group">
                  <label htmlFor="email" className="input-group-text">
                    <FaEnvelope />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control py-2-half-5"
                    placeholder="Enter Email "
                    aria-label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>
              <div className="text-center d-flex align-items-center justify-content-center w-100">
                <button
                  className="signup-now w-50  text-center mt-4"
                  type="submit"
                >
                  Send Password Reset Link
                </button>
              </div>
            </form>
            <div className="text-center">
              <button className="btn btn-outline-secondary text-center mt-3 w-25">
                <Link to="/" className="text-decoration-none text-black">
                  Back To Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
