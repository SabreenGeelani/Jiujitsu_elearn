import React, { useState } from "react";
import "./UserCourses.css";
import cardImage from "../../assets/coursesCard.png";

const Card = () => (
  <div className="card-bottom-courses">
    <img src={cardImage} alt="Course image" />
    <div className="middle-sec-card-courses">
      <div className="addCourse-card-courses">
        <h6>Frontend</h6>
      </div>
      <div className="pricing-card-courses">
        <h5>Tag1 Tag2 Tag3</h5>
        {/* <h5>$10.99</h5> */}
      </div>
    </div>
    <p>Basit Bashir, Designer at Raybit...</p>
    <h5>UI basic Guidelines</h5>
    <h4>Beginner’s Guide to becoming a professional frontend developer</h4>
    <div className="bottom-card-userCourses">
    <span>
    <h5>$14.99</h5>
    <h5>$10.99</h5>
    </span>
    <div><h6>Add to Cart</h6></div>
    </div>
  </div>
);

const UserCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");

  const categories = [
    "Frontend",
    "Web Development",
    "UI / UX",
    "Basics AI",
    "JAVA",
    "Pyton",
    "React",
    "Full Stack",
    "SQL"
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const cards = Array.from({ length: 8 }, (_, index) => <Card key={index} />);

  return (
    <div className="wrapper-courses">
      <div className="top-courses">
        <h4>Courses</h4>
        {/* <div className="top-button">
          <h6>Add Course</h6>
        </div> */}
      </div>
      <div className="categories-userCourses">
        {categories.map((category) => (
          <div
            key={category}
            className={ selectedCategory === category ? "button-categories-userCourses":"not-button-categories-userCourses"}
            onClick={() => handleCategoryClick(category)}
            // style={{
            //   backgroundColor: selectedCategory === category ? 'blue' : 'gray',
            //   color: 'white',
            //   padding: '10px',
            //   margin: '5px',
            //   border: 'none',
            //   borderRadius: '5px',
            //   cursor: 'pointer',
            // }}
          >
            <h4>{category}</h4>
          </div>
        ))}
      </div>
      <div className="bottom-courses">
        {cards}
      </div>
    </div>
  );
};

export default UserCourses;
