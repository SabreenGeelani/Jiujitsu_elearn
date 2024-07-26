import { useEffect, useState } from "react";
import "./Courses.css";
import cardImage from "../../assets/coursesCard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { BASE_URI } from "../../Config/url";
const Card = ({ onClick }) => (
  <div className="card-bottom-courses" onClick={onClick}>
    <img src={cardImage} alt="Course image" />
    <div className="middle-sec-card-courses">
      <div className="addCourse-card-courses">
        <h6>Frontend</h6>
      </div>
      <div className="pricing-card-courses">
        <h5>$14.99</h5>
        <h5>$10.99</h5>
      </div>
    </div>
    <p>Basit Bashir, Designer at Raybit...</p>
    <h5>UI basic Guidelines</h5>
    <h4>Beginner’s Guide to becoming a professional frontend developer</h4>
  </div>
);

const Courses = () => {
  const navigate = useNavigate();
  const [course, setcourse] = useState(true);

  const handleCardClick = () => {
    navigate("/courseView");
  };

  const cards = Array.from({ length: 8 }, (_, index) => (
    <Card key={index} onClick={handleCardClick} />
  ));
  const getCourses = async () => {
    const response = await axios({
      method: "GET",
      url: `${BASE_URI}/api/v1/courses`,
    });
    console.log(response);
  };

  useEffect(() => {
    getCourses();
  }, getCourses);

  return (
    <div className="wrapper-courses">
      <div className="top-courses">
        <h4>Courses</h4>
        <div className="top-button">
          <h6>Add Course</h6>
        </div>
      </div>
      {course ? (
        <div className="bottom-courses">{cards}</div>
      ) : (
        <div className="no-courses-courses">
          <div>
            <h1>No Course uploaded yet</h1>
            <h5>
              Get started by uploading your first course and inspire athletes
              around the world!
            </h5>
            <FontAwesomeIcon icon={faSquarePlus} className="add-icon-courses" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
