import { useRef } from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

export const Navbar = ({ collapsed }) => {
  const searchInputRef = useRef(null);

  const handleIconClick = () => {
    searchInputRef.current.focus();
  };
  return (
    <nav
      className={` navbar navbar-expand-lg d-flex justify-content-center  ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="search-input input-group w-50">
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
      <CiFilter className="text-black fs-2 ms-3" />
    </nav>
  );
};
