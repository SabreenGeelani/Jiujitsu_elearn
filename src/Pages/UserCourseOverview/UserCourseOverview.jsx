import React, { useMemo, useState } from "react";
import "./UserCourseOverview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faAngleDown,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaYoutube } from "react-icons/fa";
import thumbnail from ".././../assets/thumbnail-userCourseview.jpeg";
import courseby from ".././../assets/userCourseview-profile.png";
import cardImage from "../../assets/coursesCard.png";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import toast from "react-hot-toast"
import { SyncLoader,PulseLoader} from "react-spinners"

const UserCourseOverview = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [openDetails, setOpenDetails] = useState({});
  const {id} = useParams();
  // console.log(id);
  const handleToggle = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };




  const url = `${BASE_URI}/api/v1/courses/usersCourseOverview/${id}`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  //  setData(data.data[0]);
  //  console.log(data);
  const courseData = useMemo(() => data?.data || [data]);
  const chapters = courseData?.courseChapters?.chapters || [];
  // console.log(courseData);


  const handleCart = async () => {
    setIsLoding(true)
    try {
      console.log(id);
      const response = await axios.post(
        `${BASE_URI}/api/v1/cart`,
        { course_id: id },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      setIsLoding(false);
      toast.success(`${response.data.message}`);
    } catch (err) {
      setIsLoding(false);
      toast.error(`Error: ${err?.response?.data?.message}`);
    }
  };


  return (
    <>
    {isLoading? <SyncLoader id="spinner-usercourseview" size={8} color="black" />: <div className="wrapper-userCourseview">
        <div className="top-userCourseview">
          <h3>{courseData?.course?.title}</h3>
          <h6>
            {courseData?.course?.description?.split(' ').slice(0, 8).join(' ') + '...'}
          </h6>
          <h5>{courseData?.course?.tags}</h5>
          <h6>
          {courseData?.review?.totalReviews} reviews ({courseData?.review?.averageRating}{" "}
            <FontAwesomeIcon icon={faStar} className="staricon" />)
          </h6>
        </div>

        <div className="mid-userCourseview">
          <div className="left-mid-userCourseview">
            <div className="left-top-mid-userCourseview">
              <h3>Description</h3>
              <h5>
                Dive into the world of frontend development and learn how to
                create stunning, responsive, and interactive websites. This
                comprehensive course will take you from the fundamentals of
                HTML, CSS, and JavaScript to advanced topics like modern
                JavaScript frameworks, responsive design, and performance
                optimization. Whether you're a beginner or looking to sharpen
                your skills, this course has something for everyone.
              </h5>
              <h4>Learning Objectives:</h4>
              <h6>By the end of this course, you will be able to:</h6>
              <ul>
                <li>Understand the basics of HTML, CSS, and JavaScript</li>
                <li>
                  Develop responsive web pages using modern CSS techniques
                </li>
                <li>
                  Create dynamic and interactive user interfaces with JavaScript
                </li>
                <li>
                  Utilize frontend frameworks like React or Vue.js for building
                  complex applications
                </li>
                <li>Optimize web performance for better user experience</li>
                <li>Implement best practices for frontend development</li>
              </ul>
              <h4>
                Watch 3 Free Lessons to get insights of what to Learn{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </h4>
            </div>
            <div className="left-bottom-mid-userCourseview">
              <h4>Course Lessons</h4>
              <div>
              {chapters.map((chapter, index) => (
                <details
                  key={chapter.chapter_id}
                  open={!!openDetails[index]}
                  onToggle={() => handleToggle(index)}
                >
                  <summary>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={openDetails[index] ? "up-icon" : "down-icon"}
                    />
                    <h6>{chapter.chapter_no}. {chapter.chapterTitle}</h6>
                  </summary>
                  {chapter.lessons.map((lesson, idx) => (
                    <div key={idx}>
                      <h6>
                        <FaYoutube color="black" />
                        Lesson {idx + 1}: {lesson.lessonTitle || "Lesson Title"}
                      </h6>
                      <h6>{lesson.duration || "0 mins"}</h6>
                    </div>
                  ))}
                </details>
              ))}
              </div>
            </div>
          </div>
          <div className="right-mid-userCourseview">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="tumbnail-userCourseview"
            />
            <div className="pricing-right-mid-userCourseview">
              <span>
                <h5>${courseData?.course?.discounted_price}</h5>
                <h5>${courseData?.course?.price}</h5>
              </span>
              <div onClick={handleCart}>{isLoding? <PulseLoader size={8} color="white"/>: "Add to Cart"}</div>
            </div>
            <div className="details-right-mid-userCourseview">
              <span>
                <h5>Access:</h5>
                <h6>{courseData?.course?.access}</h6>
              </span>
              <span>
                <h5>Enrolled:</h5>
                <h6>{courseData?.course?.enrolled}+</h6>
              </span>
              <span>
                <h5>Last Updated:</h5>
                <h6>{courseData?.course?.updated_at.split("T")[0]}</h6>
              </span>
              <span>
                <h5>Certificate:</h5>
                <h6>After completion of course</h6>
              </span>
            </div>
            <div className="courseby-right-mid-userCourseview">
              <h5>Course by:</h5>
              <span>
                <img src={courseby} alt="profile image" /> <h6>{courseData?.course?.name}</h6>
              </span>
            </div>
            <div className="ratings-right-mid-userCourseview">
              <h5>Reviews & Ratings:</h5>
              <div className="map-ratings-right-mid-userCourseview">
                {courseData?.review?.userReviews.map((review, index) => (
                  <div key={index}>
                    <div>
                      <img src={courseby} alt="profile image" />
                      <h5>{review.name}</h5>
                      <p>{review.review_date.split("T")[0]
                      }</p>
                    </div>
                    <div>
                      <span>
                        {[...Array(review.rating)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="staricon"
                          />
                        ))}
                      </span>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-userCourseview">
          <span>
            <h3>More Courses by</h3>
            <div>
              <p>Basit Bashir</p>
              <span></span>
            </div>
          </span>

          <div className="cards-userCourseview">
            {courseData?.otherCourses?.map((courses, index) => (
              <div className="card-bottom-userCourseview" key={index}>
                <img src={cardImage} alt="Course image" />
                <div className="middle-sec-card-userCourseview">
                  <div className="addCourse-card-userCourseview">
                    <h6>{courses?.title}</h6>
                  </div>
                  <div className="pricing-card-userCourseview">
                    <h5>Tag1 Tag2 Tag3</h5>
                    {/* <h5>$10.99</h5> */}
                  </div>
                </div>
                <p>Basit Bashir, Designer at Raybit...</p>
                <h5>UI basic Guidelines</h5>
                <h4>
                  Beginner’s Guide to becoming a professional frontend developer
                </h4>
                <div className="bottom-card-useruserCourseview">
                  <span>
                    <h5>$14.99</h5>
                    <h5>$10.99</h5>
                  </span>
                  <div onClick={handleCart}>{isLoding? <PulseLoader size={8} color="white"/>: "Add to Cart"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
      
    </>
  );
};

export default UserCourseOverview;
