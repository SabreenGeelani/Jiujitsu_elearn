import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { BiSolidChevronRightSquare } from "react-icons/bi";
import { IoIosAddCircleOutline, IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { PiFolderUserFill } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const users = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "src/assets/istockphoto-841971598-1024x1024.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Manager",
    image: "src/assets/istockphoto-841971598-1024x1024.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    designation: "UX Designer",
    image: "src/assets/istockphoto-841971598-1024x1024.jpg",
  },
  {
    id: 4,
    name: "Alice Johnson",
    designation: "UX Designer",
    image: "src/assets/istockphoto-841971598-1024x1024.jpg", // Replace with your actual image path
  },
];
export const Navbar = ({ collapsed }) => {
  const searchInputRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    };
    const intervalId = setInterval(handleStorageChange, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const handleIconClick = () => {
    searchInputRef.current.focus();
  };
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <nav
      className={`navbar navbar-expand-lg d-flex align-items-center ps-6 pe-5 ${
        token ? "justify-content-between" : "justify-content-center"
      } ${collapsed ? "collapsed" : ""}`}
    >
      <div className="d-flex gap-3 align-items-center w-75">
        <div className="search-input input-group w-75">
          <label
            className="input-group-text search-icon border-end-0"
            htmlFor="search"
            onClick={handleIconClick}
          >
            <CiSearch />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search here..."
            aria-label="search"
            ref={searchInputRef}
            className="navbar-input form-control border-start-0 ps-0"
          />
        </div>
        <CiFilter className="primary-color fs-2 ms-3 cursor-pionter" />
      </div>
      {userType === "user" && (
        <Link to="/userCart">
          <BsFillCartFill className="primary-color fs-2 ms-5 cursor-pionter" />
        </Link>
      )}
      {token && (
        <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          {user?.profile_picture === "" ? (
            <FaCircleUser className="fs-2" />
          ) : (
            <img
              src={user?.profile_picture}
              alt="Profile"
              className="rounded-circle"
              style={{
                height: "3rem",
                width: "3rem",
                objectFit: "cover",
                border: "4px solid black",
              }}
            />
          )}
        </div>
      )}
      <div
        className={`profile-bar rounded-4 text-black px-4 py-4 ${
          isProfileOpen ? "open" : ""
        }`}
      >
        <div className="d-flex align-items-center justify-content-between  mb-4">
          <p className="mb-0 fs-small w-60 text-end text-secondary">
            Your Profile
          </p>
          <BiSolidChevronRightSquare
            className="primary-color fs-3 cursor-pointer"
            onClick={handleProfileClick}
          />
        </div>
        <main className="text-center">
          <img
            src={user?.profile_picture}
            alt=""
            className="rounded-circle mb-3"
            style={{
              height: "5rem",
              width: "5rem",
              objectFit: "cover",
              border: "4px solid black",
            }}
          />
          <h4 className="fw-lightBold mb-1 text-capitalize">
            Good Morning {user?.name?.split(" ")[0]}
          </h4>
          <p
            className="text-center lightgray-color fs-small mb-3"
            style={{ lineHeight: "14.52px" }}
          >
            continue your journey and Inspire many
          </p>
          <div className="d-flex align-items-center justify-content-between px-4">
            <p
              className="d-flex align-items-center justify-content-center rounded-circle border border-secondary mb-0"
              style={{ height: "3rem", width: "3rem" }}
            >
              <IoMdNotifications className="fs-4 primary-color" />
            </p>
            <p
              className="d-flex align-items-center justify-content-center rounded-circle border border-secondary mb-0"
              style={{ height: "3rem", width: "3rem" }}
            >
              <MdMessage className="fs-4 primary-color" />
            </p>
            <p
              className="d-flex align-items-center justify-content-center rounded-circle border border-secondary mb-0"
              style={{ height: "3rem", width: "3rem" }}
            >
              <PiFolderUserFill className="fs-4 primary-color" />
            </p>
          </div>
          <div style={{ height: "8rem" }}></div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="fw-lightBold mb-0">Other Experts</h4>
              <IoIosAddCircleOutline className="fs-2 text-secondary" />
            </div>
            <div className=" mb-4">
              {users.map((user) => (
                <div
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                  key={user.id}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={user.image}
                      alt=""
                      className="rounded-circle"
                      style={{
                        height: "2rem",
                        width: "2rem",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p className="mb-0 fw-lightBold text-start">
                        {user.name}
                      </p>
                      <p className="mb-0 fs-small text-start">
                        {user.designation}
                      </p>
                    </div>
                  </div>
                  <button
                    className="rounded-pill px-3 py-1 bg-custom-primary text-white fs-small"
                    // onClick={() => onFollow(user.id)}
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <button className="signup-now w-100 rounded-pill">See all</button>
          </div>
        </main>
      </div>
    </nav>
  );
};