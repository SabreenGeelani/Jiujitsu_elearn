import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import learnImg from "../../assets/learnImg.avif";
import axios from "axios";
import { BASE_URI } from "../../Config/url";

function ResetPassword() {
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewPasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post(`${BASE_URI}`);
  };

  return (
    <div className="p-5 vh-100">
      <div className="container-fluid signin-container h-100">
        <div className="row w-100 h-100">
          <div className="signup-image w-50">
            <img src={learnImg} alt="Image" className="img-fluid" />
            <div className="signUp-text">
              <h3 className="expertise mb-0">Share Your Expertise.</h3>
              <h3 className="expertise mb-4">
                Inspire Athletes. Transform Lives.
              </h3>
              <div className="join-team d-flex justify-content-center">
                <p className="w-75">
                  Join our team of elite instructors and make a difference in
                  the world of sports and athletics.
                </p>
              </div>
            </div>
          </div>
          <div className="signUp-form col-md-5 w-50 py-4 px-5 d-flex flex-column justify-content-center gap-5">
            <div className="signup-start mt-0">
              <h1 className="mt-3 mb-3">Reset Password</h1>
              <p>Enter New Password, and we&apos;ll help you</p>
              <p>get back on track right away.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="new-password"
                  className="form-label fw-bold fs-small"
                >
                  Enter New Password
                </label>
                <div className="input-group">
                  <label htmlFor="new-password" className="input-group-text">
                    <IoKeyOutline />
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    name="newPassword"
                    className="form-control border-end-0 py-2-half-5"
                    placeholder="Enter Password"
                    aria-label="Password"
                    value={password}
                    onChange={handleNewPasswordChange}
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
              <div className="mb-5">
                <label
                  htmlFor="confirm-password"
                  className="form-label fw-bold fs-small"
                >
                  Confirm New Password
                </label>
                <div className="input-group">
                  <label
                    htmlFor="confirm-password"
                    className="input-group-text"
                  >
                    <IoKeyOutline />
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirmPassword"
                    className="form-control border-end-0 py-2-half-5"
                    placeholder="Enter Password"
                    aria-label="Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
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

              <button
                className="signup-now w-100 text-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <PulseLoader size={8} color="white" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
