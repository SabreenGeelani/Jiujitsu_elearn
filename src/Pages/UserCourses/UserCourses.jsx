import { useEffect, useMemo, useState } from "react";
import "./UserCourses.css";
import cardImage from "../../assets/coursesCard.png";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PulseLoader, SyncLoader } from "react-spinners";

const Card = ({
  id,
  category,
  description,
  expert,
  price,
  discount,
  tags,
  thumbnail,
  onClick,
  onAddToCart,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    await onAddToCart(id, setIsLoading);
  };

  return (
    <div className="card-bottom-userCourses" onClick={() => onClick(id)}>

      <img src={thumbnail} alt="Course image" style={{ objectFit: "cover" }} />

      <div className="middle-sec-card-userCourses">
        <div className="addCourse-card-userCourses">
          <h6>{category}</h6>
        </div>
        <div className="pricing-card-userCourses">
          <h5>{tags}</h5>
        </div>
      </div>
      <p>{expert}</p>
      <h4
        dangerouslySetInnerHTML={{
          __html: description
            ? description.split(" ").slice(0, 10).join(" ") + "..."
            : "No description found",
        }}
      ></h4>
      <div className="bottom-card-useruserCourses">
        <span>
          <h5>{`$${price}`}</h5>
          <h5>{`$${(price * (1 - discount / 100)).toFixed(2)}`}</h5>
        </span>
        <div onClick={handleAddToCart}>
          {isLoading ? (
            <PulseLoader size={8} color="white" />
          ) : (
            <h6>Add to Cart</h6>
          )}
        </div>
      </div>
    </div>
  );
};




const UserCourses = () => {
  // console.log("ok here");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [initialCategory, setInitialCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const url2 = `${BASE_URI}/api/v1/category/`;
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
    refetch: refetch2,
  } = useFetch(url2, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const categories = useMemo(() => data2?.data || [], [data2]);

  useEffect(() => {
    if (categories.length > 0) {
      setInitialCategory(categories[0].name);
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const url = `${BASE_URI}/api/v1/courses/userDashboard/courses?category=${selectedCategory}`;
  const { data, error, refetch, isLoading } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  // console.log(data.data);
  // // const coursesData = data;
  const coursesData = useMemo(() => data?.data || [], [data]);

  const handleNavigate = (id) => {
    navigate(`/userCourseView/${id}`);
  };

  const handleCart = async (id, setIsLoading) => {
    try {
      const response = await axios.post(
        `${BASE_URI}/api/v1/cart`,
        { course_id: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsLoading(false);
      toast.success(`${response.data.message}`);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Error: ${err?.response?.data?.message}`);
    }
  };

  return (
    <>
      {isLoading2 ? (
        <SyncLoader id="spinner-usercourseview" size={8} color="black" />
      ) : (
        <div className="wrapper-userCourses w-100">
          <div className="top-userCourses">
            <h4>Courses</h4>
          </div>
          <div className="categories-userCourses">
            {categories.map((category) => (
              <div
                key={category.id}
                className={
                  selectedCategory === category.name
                    ? "button-categories-userCourses"
                    : "not-button-categories-userCourses"
                }
                onClick={() => handleCategoryClick(category.name)}
              >
                <h4>{category.name}</h4>
              </div>
            ))}
          </div>
          {isLoading ? (
            <SyncLoader id="userCoursesLoader" size={8} color="black" />
          ) : (
            <div className="bottom-userCourses">
              {error?.response?.data?.message === "No courses found" ? (
                <h1>No courses found</h1>
              ) : (
                coursesData.map((course) => (
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
                    onAddToCart={handleCart}
                  />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserCourses;
