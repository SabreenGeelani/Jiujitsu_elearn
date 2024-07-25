import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faEnvelope,
  faLifeRing,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { LiaBarsSolid } from "react-icons/lia";

export const Sidebar = ({ collapsed, handleToggle }) => {
  return (
    <div
      className={`sidebar d-flex flex-column justify-content-between py-2 ps-4 ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between mb-4 ">
        {/* <button onClick={handleToggle} className="btn btn-outline-secondary"> */}
        <LiaBarsSolid onClick={handleToggle} className="fs-1 primary-color" />
        {/* </button> */}
        {!collapsed && (
          <h3 className="text w-100 offset-3 gradient-text fw-bold">
            Jiujitsux
          </h3>
        )}
      </div>
      {!collapsed && <div className="mb-4 fs-small">Menu</div>}
      <div className="menu flex-grow-1">
        <div className="menu-item d-flex align-items-center p-3 bg-gradient-custom rounded-start-3">
          <FontAwesomeIcon icon={faHome} className="me-4 text-white" />
          {!collapsed && <span className="text">Home</span>}
        </div>
        <div className="menu-item d-flex align-items-center p-3">
          <FontAwesomeIcon icon={faBook} className="me-4 primary-color" />
          {!collapsed && <span className="text">Courses</span>}
        </div>

        <div className="menu-item d-flex align-items-center p-3">
          <FontAwesomeIcon icon={faEnvelope} className="me-4 primary-color" />
          {!collapsed && <span className="text">Messages</span>}
        </div>

        <div className="menu-item d-flex align-items-center p-3">
          <FontAwesomeIcon icon={faLifeRing} className="me-4 primary-color" />
          {!collapsed && <span className="text">Support</span>}
        </div>
      </div>
      <div className="menu menu-bottom mt-3">
        <div className="menu-item d-flex align-items-center p-3">
          <FontAwesomeIcon icon={faCog} className="me-4 primary-color" />
          {!collapsed && <span className="text">Settings</span>}
        </div>
        <div className="menu-item d-flex align-items-center p-3 ">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-4 primary-color" />
          {!collapsed && <span className="text">Logout</span>}
        </div>
      </div>
    </div>
  );
};
