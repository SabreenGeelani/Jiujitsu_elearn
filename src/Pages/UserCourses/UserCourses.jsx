import React, { useMemo, useState } from "react";
import "./UserCourses.css";
import cardImage from "../../assets/coursesCard.png";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";

const Card = ({ category, description, expert, price, discount, tags, thumbnail }) => (
  <div className="card-bottom-userCourses">
    <img src={cardImage} alt="Course image" />
    <div className="middle-sec-card-userCourses">
      <div className="addCourse-card-userCourses">
        <h6>{category}</h6>
      </div>
      <div className="pricing-card-userCourses">
        <h5>{tags.join(" ")}</h5>
      </div>
    </div>
    <p>{expert}</p>
    <h4>{description.split(" ").slice(0, 10).join(" ")}...</h4>
    <div className="bottom-card-useruserCourses">
      <span>
        <h5>{`$${(price * (1 - discount / 100)).toFixed(2)}`}</h5>
        <h5>{`$${price}`}</h5>
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

  const url = `${BASE_URI}/api/v1/courses`
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
        Authorization : "Bearer " + token
    }
 });

const coursesData = useMemo(()=> data?.data || [],[data]);
console.log(coursesData)
  // const cards = Array.from({ length: 8 }, (_, index) => <Card key={index} />);

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
      <div className="bottom-userCourses">
      {coursesData.map(course => (
          <Card
            key={course.id}
            category={course.category}
            description={course.description}
            expert={course.expert}
            price={course.price}
            discount={course.discount}
            tags={course.tags}
            thumbnail={course.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
