import { useEffect, useMemo, useState } from "react";
import "./Courses.css";
import cardImage from "../../assets/coursesCard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import { SyncLoader } from "react-spinners";
const Card = ({
  id,
  onClick,
  title,
  description,
  price,
  discount,
  thumbnail,
  name,
  category,
}) => (
  <div className="card-bottom-courses" onClick={() => onClick(id)}>
    <img src={cardImage || thumbnail} alt="Course image" />
    <div className="middle-sec-card-courses">
      <div className="addCourse-card-courses">
        <h6>{category}</h6>
      </div>
      <div className="pricing-card-courses">
        <h5>${price}</h5>
        <h5>${discount}</h5>
      </div>
    </div>
    <p>{name}, Designer at Raybit...</p>
    <h5>{title}</h5>
    <h4
      dangerouslySetInnerHTML={{
        __html: description?.split(" ").slice(0, 6).join(" ") + "...",
      }}
    ></h4>
  </div>
);

const Courses = () => {
  const navigate = useNavigate();
  const [course, setcourse] = useState(true);
  

  const url = `${BASE_URI}/api/v1/courses/expertCourses`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  console.log(data || error);
  //  if(data.data === ){
  //     setcourse(false)
  //  }

  //   if (error.response.data.message === "No courses found"){
  //   return setcourse(false);
  //  }
  // console.log(error)

  const coursesData = useMemo(() => data?.data || [], [data]);
  // console.log(coursesData)
  const handleCardClick = (id) => {
    navigate(`/courseView/${id}`);
  };
  
 

  const cards = coursesData.map((course, index) => (
    <Card
      key={index}
      onClick={handleCardClick}
      id={course.id}
      title={course.title}
      description={course.description}
      price={course.price}
      discount={course.discount}
      thumbnail={course.thumbnail}
      category={course.category}
      name={course.name}
    />
  ));

  return (
    <>
      {isLoading ? (
        <SyncLoader id="spinner-usercourseview" size={8} color="black" />
      ) : (
        <div className="wrapper-courses">
          <div className="top-courses">
            <h4>Courses</h4>
            <div className="top-button">
              <h6>
                <Link
                  to="/courseCreation"
                  className="text-decoration-none text-white"
                >
                  Add Course{" "}
                </Link>
              </h6>
            </div>
          </div>

          {error?.response?.data?.message !== "no courses found" ? (
            <div className="bottom-courses">{cards}</div>
          ) : (
            <div className="no-courses-courses">
              <div>
                <h1>No Course uploaded yet</h1>
                <h5>
                  Get started by uploading your first course and inspire
                  athletes around the world!
                </h5>
                <Link
                  to="/courseCreation"
                  className="text-decoration-none text-white"
                >
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="add-icon-courses"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Courses;
