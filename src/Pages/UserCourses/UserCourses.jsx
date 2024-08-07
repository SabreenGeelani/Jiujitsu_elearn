import React, { useEffect, useMemo, useState } from "react";
import "./UserCourses.css";
import cardImage from "../../assets/coursesCard.png";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import { useNavigate } from "react-router-dom";

const Card = ({ id, category, description, expert, price, discount, tags, thumbnail, onClick }) => (
  <div className="card-bottom-userCourses" onClick={()=> onClick(id)}>
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  // const categories = [
  //   "Frontend",
  //   "Web Development",
  //   "UI / UX",
  //   "Basics AI",
  //   "JAVA",
  //   "Pyton",
  //   "React",
  //   "Full Stack",
  //   "SQL"
  // ];

  

 
   
const [initialCategory, setInitialCategory] = useState("")
const url2 = `${BASE_URI}/api/v1/category/`
// const token2 = localStorage.getItem("token");
const { data:data2, isLoading2, error2, refetch2 } = useFetch(url2, {
  headers: {
      Authorization : "Bearer " + token
  }
});
// console.log(data2)
const categories = useMemo(()=> data2?.data || [],[data2]);
useEffect(() => {
  setInitialCategory(categories[0]?.name)
},[])
// console.log(categories[0]?.name);

const [selectedCategory, setSelectedCategory] = useState(initialCategory);


const handleCategoryClick = (category) => {
  // console.log(category)
  setSelectedCategory(category);
  
};
let url = `${BASE_URI}/api/v1/courses/userDashboard/courses?category=${selectedCategory}`

const { data, isLoading, error, refetch } = useFetch(url, {
  headers: {
      Authorization : "Bearer " + token
  }
});
console.log(error && error)
const coursesData = useMemo(()=> data?.data || [],[data]);


const handleNavigate = (id)=>{
  navigate(`/userCourseView/${id}`)
}
  return (
    <div className="wrapper-courses w-100">
      <div className="top-courses">
        <h4>Courses</h4>
        {/* <div className="top-button">
          <h6>Add Course</h6>
        </div> */}
      </div>
      <div className="categories-userCourses">
        {categories.map((category) => (
          <div
            key={category.id}
            className={ selectedCategory === category.name ? "button-categories-userCourses":"not-button-categories-userCourses"}
            onClick={() => handleCategoryClick(category.name)}
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
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
      <div className="bottom-userCourses">
      {error?.response?.data?.message === "No courses found" ? <h1>No courses found</h1>:
      coursesData.map(course => (
        <Card
          key={course.id}
          id={course.id}
          category={course.category}
          description={course.description}
          expert={course.expert}
          price={course.price}
          discount={course.discount}
          tags={course.tags}
          thumbnail={course.thumbnail}
          onClick={handleNavigate}
        />
      ))
      
      }
      </div>
    </div>
  );
};

export default UserCourses;
