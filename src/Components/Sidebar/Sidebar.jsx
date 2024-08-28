import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faEnvelope,
  faLifeRing,
  faCog,
  faSignOutAlt,
  faHistory,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { LiaBarsSolid } from "react-icons/lia";
import { motion, useAnimation } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

// Animation variants
const sidebarAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const linkAnimation = {
  normal: { scale: 1, rotate: 0 },
  clicked: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const Sidebar = ({ collapsed, handleToggle }) => {
  const role = localStorage.getItem("userType");
  const location = useLocation();
  const controls = useAnimation();

  const handleClick = async () => {
    await controls.start("clicked");
    controls.start("normal");
  };

  return (
    <div
      className={`sidebar d-flex flex-column justify-content-between py-2 ps-4 ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <LiaBarsSolid
          onClick={handleToggle}
          className="fs-1 primary-color cursor-pointer"
        />
        {!collapsed && (
          <h3 className="text w-100 offset-3 gradient-text fw-bold">
            Jiujitsux
          </h3>
        )}
      </div>
      {!collapsed && <div className="mb-4 fs-small">Menu</div>}
      <motion.div
        className="menu flex-grow-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sidebarAnimation}>
          <Link
            to="/"
            onClick={handleClick}
            className={`menu-item d-flex align-items-center p-3 ${
              location.pathname === "/"
                ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                : ""
            }`}
          >
            <motion.div
              animate={controls}
              variants={linkAnimation}
              className={`me-4 ${
                location.pathname === "/" ? "text-white" : "primary-color"
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
            </motion.div>
            {!collapsed && <span className="text">Home</span>}
          </Link>
        </motion.div>

        {!localStorage.getItem("token") && (
          <motion.div variants={sidebarAnimation}>
            <Link
              to="/support"
              onClick={handleClick}
              className={`menu-item d-flex align-items-center p-3 ${
                location.pathname === "/support"
                  ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                  : ""
              }`}
            >
              <motion.div
                animate={controls}
                variants={linkAnimation}
                className={`me-4 ${
                  location.pathname === "/support"
                    ? "text-white"
                    : "primary-color"
                }`}
              >
                <FontAwesomeIcon icon={faLifeRing} />
              </motion.div>
              {!collapsed && <span className="text">Support</span>}
            </Link>
          </motion.div>
        )}

        {role === "expert" && (
          <>
            {localStorage.getItem("token") && (
              <div>
                <motion.div variants={sidebarAnimation}>
                  <Link
                    to="/courses"
                    onClick={handleClick}
                    className={`menu-item d-flex align-items-center p-3 ${
                      location.pathname === "/courses"
                        ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={controls}
                      variants={linkAnimation}
                      className={`me-4 ${
                        location.pathname === "/courses"
                          ? "text-white"
                          : "primary-color"
                      }`}
                    >
                      <FontAwesomeIcon icon={faBook} />
                    </motion.div>
                    {!collapsed && <span className="text">Courses</span>}
                  </Link>
                </motion.div>
                <motion.div variants={sidebarAnimation}>
                  <Link
                    to="/messages"
                    onClick={handleClick}
                    className={`menu-item d-flex align-items-center p-3 ${
                      location.pathname === "/messages"
                        ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={controls}
                      variants={linkAnimation}
                      className={`me-4 ${
                        location.pathname === "/messages"
                          ? "text-white"
                          : "primary-color"
                      }`}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </motion.div>
                    {!collapsed && <span className="text">Messages</span>}
                  </Link>
                </motion.div>
              </div>
            )}
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/support"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/support"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/support"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faLifeRing} />
                </motion.div>
                {!collapsed && <span className="text">Support</span>}
              </Link>
            </motion.div>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/expertWallet"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/expertWallet"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/expertWallet"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faLifeRing} />
                </motion.div>
                {!collapsed && <span className="text">Wallet</span>}
              </Link>
            </motion.div>
          </>
        )}

        {role === "user" && (
          <>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/userCourses"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/userCourses"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/userCourses"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faBook} />
                </motion.div>
                {!collapsed && <span className="text">Courses</span>}
              </Link>
            </motion.div>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/myLearning"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/myLearning"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/myLearning"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faGraduationCap} />
                </motion.div>
                {!collapsed && <span className="text">My Learning</span>}
              </Link>
            </motion.div>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/messages"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/messages"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/messages"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </motion.div>
                {!collapsed && <span className="text">Messages</span>}
              </Link>
            </motion.div>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/purchaseHistory"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/purchaseHistory"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/purchaseHistory"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faHistory} />
                </motion.div>
                {!collapsed && <span className="text">Purchase History</span>}
              </Link>
            </motion.div>
            <motion.div variants={sidebarAnimation}>
              <Link
                to="/support"
                onClick={handleClick}
                className={`menu-item d-flex align-items-center p-3 ${
                  location.pathname === "/support"
                    ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                    : ""
                }`}
              >
                <motion.div
                  animate={controls}
                  variants={linkAnimation}
                  className={`me-4 ${
                    location.pathname === "/support"
                      ? "text-white"
                      : "primary-color"
                  }`}
                >
                  <FontAwesomeIcon icon={faLifeRing} />
                </motion.div>
                {!collapsed && <span className="text">Support</span>}
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
      <motion.div
        className="menu menu-bottom mt-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={sidebarAnimation}>
          <Link
            to="/settings"
            onClick={handleClick}
            className={`menu-item d-flex align-items-center p-3 ${
              location.pathname === "/settings"
                ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                : ""
            }`}
          >
            <motion.div
              animate={controls}
              variants={linkAnimation}
              className={`me-4 ${
                location.pathname === "/settings"
                  ? "text-white"
                  : "primary-color"
              }`}
            >
              <FontAwesomeIcon icon={faCog} />
            </motion.div>
            {!collapsed && <span className="text">Settings</span>}
          </Link>
        </motion.div>
        <motion.div variants={sidebarAnimation}>
          <Link
            to="/logout"
            onClick={handleClick}
            className={`menu-item d-flex align-items-center p-3 ${
              location.pathname === "/logout"
                ? "bg-gradient-custom rounded-start-3 shadow-bottom-lg"
                : ""
            }`}
          >
            <motion.div
              animate={controls}
              variants={linkAnimation}
              className={`me-4 ${
                location.pathname === "/logout" ? "text-white" : "primary-color"
              }`}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </motion.div>
            {!collapsed && <span className="text">Logout</span>}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
