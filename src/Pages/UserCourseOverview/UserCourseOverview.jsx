import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./UserCourseOverview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faAngleDown,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaUserCircle, FaYoutube } from "react-icons/fa";
import thumbnail from ".././../assets/thumbnail-userCourseview.jpeg";
import courseby from ".././../assets/userCourseview-profile.png";
import cardImage from "../../assets/coursesCard.png";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import toast from "react-hot-toast";
import { SyncLoader, PulseLoader } from "react-spinners";
import 'ldrs/grid'
import "ldrs/bouncy";
const UserCourseOverview = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [loadingItems, setLoadingItems] = useState(null);
  const [openChapters, setOpenChapters] = useState({ 0: true });
  // const [isCart, setIsCart] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [video_url, setVideo_url]= useState("");
  const [video_thumb, setVideo_thumb]= useState("");
  const { id } = useParams();
  const navigate = useNavigate();






  const handleLeftToggle = (chapterIndex) => {
    console.log(chapterIndex);
    setOpenChapters((prevOpenChapters) => ({
      ...prevOpenChapters,
      [chapterIndex]: !prevOpenChapters[chapterIndex],
    }));}

     function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds} sec`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} min ${remainingSeconds} sec`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours} hr ${remainingMinutes} min ${remainingSeconds} sec`;
    }
}
 

  const url = `${BASE_URI}/api/v1/courses/courseOverviewWithoutPurchase/${id}`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  
  const courseData = useMemo(() => data?.data || [], [data]);



  useEffect(()=>{
    setVideo_url(courseData?.courseChapters?.chapters[0]?.lessons[0]?.video_url);
    setVideo_thumb(courseData?.course?.thumbnail);
    
    setSelectedLesson(courseData?.courseChapters?.chapters[0]?.lessons[0]?.lesson_id);
    console.log(courseData?.course?.thumbnail);
  },[courseData]);





  console.log(courseData);
  const chapters = useMemo(() => courseData?.courseChapters?.chapters || [], [courseData]);


  const handleCart = async (course_id, e) => {
    e.stopPropagation();
    setLoadingItems(course_id);
    setIsLoding(true);
    try {
      const response = await axios.post(
        `${BASE_URI}/api/v1/cart`,
        { course_id: course_id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsLoding(false);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
      toast.success(`${response?.data?.message}`);
      // console.log(response, "its response")
    } catch (err) {
      setIsLoding(false);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
      
        // setIsCart(true);
        toast.error(`Error: ${err?.response?.data?.message}`);
      
    }
  };



  const handleVideoChange = useCallback((video_url,video_thumb, lesson_id)=>{
    setVideo_url(video_url)
    setVideo_thumb(video_thumb)
    setSelectedLesson(lesson_id);
    // refetch();
  },[]);
  
  
  
  return (
    <>
      {isLoading ? (
       
        // Default values shown  
<l-grid
id="spinner-usercourseview"
  size="60"
  speed="1.5"
  color="black" 
></l-grid>
      ) : (
        <div className="wrapper-userCourseview">
          <div className="top-userCourseview">
            <h3>{courseData?.course?.title || "No title available"}</h3>
            <h6
              dangerouslySetInnerHTML={{
                __html: courseData?.course?.description
                  ? courseData.course.description
                      .split(" ")
                      .slice(0, 7)
                      .join(" ") + "..."
                  : "No description available",
              }}
            ></h6>
            <h5>{courseData?.course?.tags || "No tags available"}</h5>
            <h6>
              {courseData?.review?.totalReviews || 0} reviews (
              {courseData?.review?.averageRating || 0}{" "}
              <FontAwesomeIcon icon={faStar} className="staricon" />)
            </h6>
          </div>
          <div className="mid-userCourseview">
            <div className="left-mid-userCourseview">
              <div className="left-top-mid-userCourseview">
                <h3>Description</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      courseData?.course?.description ||
                      "No description available",
                  }}
                ></div>
                <h4 className="cursor-pointer hover-underline">
                  Watch 3 Free Lessons to get insights of what to Learn{" "}
                  <FontAwesomeIcon icon={faArrowRight} />
                </h4>
              </div>
              <div className="left-bottom-mid-userCourseview">
                <h4>Course Lessons</h4>
                <div>
                  {courseData?.courseChapters?.chapters?.length > 0 ? (
                    chapters.map((chapter, chapterIndex) => (
                      <details
        key={chapter?.chapter_id}
        open={ chapterIndex === 0 && true || openChapters[chapterIndex]}
        onToggle={() => handleLeftToggle(chapterIndex)}
      >
        <summary>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={openChapters[chapterIndex] ? "up-icon" : "down-icon"}
          />
                          <h6>
                            {chapter.chapter_no || "No chapter number"}.{" "}
                            {chapter.chapterTitle || "No chapter title"}
                          </h6>
                        </summary>
                        {chapter?.lessons.map((lesson, idx) => (
                          <div key={idx} onClick={()=> handleVideoChange(lesson?.video_url,lesson?.thumbnail,lesson?.lesson_id)} style={{cursor:"pointer" ,color: selectedLesson === lesson?.lesson_id && "red"}}>
                            <h6 >
                              <FaYoutube color="black" />
                              Lesson {idx + 1}:{" "}
                              {lesson?.lessonTitle || "No lesson title"}
                            </h6>
                            <h6>
                              {formatTime(lesson?.duration) || "No duration available"}
                            </h6>
                          </div>
                        ))}
                      </details>
                    ))
                  ) : (
                    <div>No chapters found</div>
                  )}
                </div>
              </div>
            </div>
            <div className="right-mid-userCourseview">
            <video 
      src={video_url} 
      controls 
      muted 
      loop
      poster={video_thumb}
      preload="auto"
      className="tumbnail-userCourseview"
    >
      Your browser does not support the video tag.
    </video>
              {/* <img
                src={courseData?.course?.thumbnail || thumbnail}
                alt="thumbnail"
                
              /> */}
              <div className="pricing-right-mid-userCourseview">
                <span>
                  <h5>${courseData?.course?.price || "No price available"}</h5>
                  <h5>
                    $
                    {courseData?.course?.discounted_price ||
                      "No discount available"}
                  </h5>
                </span>

                
                <div onClick={(e)=> handleCart(id,e)}>
                    {isLoding ? (
                      <l-bouncy
                      size="35"
                      speed="1.2"
                      color="white"
                    ></l-bouncy>
                    ) : (
                      "Add to Cart"
                    )}
                  </div>
                
              </div>
              <div className="details-right-mid-userCourseview">
                <span>
                  <h5>Access:</h5>
                  <h6>
                    {courseData?.course?.access || "No access information"}
                  </h6>
                </span>
                <span>
                  <h5>Enrolled:</h5>
                  <h6>{courseData?.course?.enrolled || 0}+</h6>
                </span>
                <span>
                  <h5>Last Updated:</h5>
                  <h6>
                    {courseData?.course?.updated_at
                      ? courseData.course.updated_at.split("T")[0]
                      : "No update date"}
                  </h6>
                </span>
                <span>
                  <h5>Certificate:</h5>
                  <h6>After completion of course</h6>
                </span>
              </div>
              <div className="courseby-right-mid-userCourseview">
                <h5>Course by:</h5>
                <span>
                  {courseData?.course?.profile_picture ? (
                    <img
                      src={courseData?.course?.profile_picture}
                      alt="profile image"
                    />
                  ) : (
                    <FaUserCircle className="fs-1" />
                  )}
                  <h6>{courseData?.course?.name || "No author information"}</h6>
                </span>
              </div>
              <div className="ratings-right-mid-userCourseview">
                <h5>Reviews & Ratings:</h5>
                <div className="map-ratings-right-mid-userCourseview">
                  {courseData?.review?.userReviews?.length > 0 ? (
                    courseData.review.userReviews.map((review, index) => (
                      <div key={index}>
                        <div>
                          {review?.profile_picture ? (
                            <img
                            loading="lazy"
                              src={review?.profile_picture}
                              alt="profile image"
                            />
                          ) : (
                            <FaUserCircle className="fs-1" />
                          )}
                          <h5>{review?.name || "No name available"}</h5>
                          <p>
                            {review?.review_date
                              ? review?.review_date.split("T")[0]
                              : "No review date"}
                          </p>
                        </div>
                        <div>
                          <span>
                            {[...Array(5)].map((_, i) =>
                              i < review.rating ? (
                                <AiFillStar key={i} className="staricon" />
                              ) : (
                                <AiOutlineStar key={i} className="staricon" />
                              )
                            )}
                          </span>
                          <p>{review.comment || "No comment available"}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{marginLeft:"2vw"}}>No reviews available!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-userCourseview">
            <span>
              <h3>More Courses by</h3>
              <div>
               {/* <h6>{"No author name available"}</h6> */}
                <span><h6>{courseData?.course?.name || "No author name available"}</h6></span>
              </div>
            </span>
            <div  className="cards-userCourseview">
              
              {courseData?.other_courses?.length > 0 ? (
                courseData.other_courses.map((course, index) => (
                  
                  <div onClick={() =>
                    course?.is_purchased ? navigate(`/userPurchasedCourses/${course?.id}`) : course?.is_in_cart ? navigate('/userCart') :
                    navigate(`/userCourseView/${course?.id}`)
                  } className="card-bottom-userCourseview" key={index}> 
                  <span> <img src={course?.thumbnail || cardImage} alt="Course image" /></span>
     
      <div className="middle-sec-card-userCourseview">
        <div className="addCourse-card-userCourseview">
          <h6>{course?.category || "No title available"}</h6>
        </div>
        <div className="pricing-card-userCourseview">
          <h5>{course?.tags || "No tags available"}</h5>
          {/* <h5>$10.99</h5> */}
        </div>
      </div>
      <p>{course?.name}, Developer at Raybit...</p>
      <h5>{course?.title}</h5>
      <h4
      dangerouslySetInnerHTML={{
                __html: course?.description
                  ? course?.description
                      .split(" ")
                      .slice(0, 7)
                      .join(" ") + "..."
                  : "No description available",
              }}
      >
      
        </h4>
      <div className="bottom-card-useruserCourseview">
      <span>
      <h5>${course?.price}</h5>
      <h5>${course?.discounted_price}</h5>
      </span>
      <div onClick={(e) => course?.is_purchased ? navigate(`/userPurchasedCourses/${course?.id}`) : course?.is_in_cart ? navigate('/userCart') : handleCart(course?.id, e)}>
                    {loadingItems === course?.id ? (
                      <l-bouncy
                      size="35"
                      speed="1.2"
                      color="white"
                    ></l-bouncy>
                    ) : (
                      course?.is_purchased ? <h6>Purchased!</h6> : course?.is_in_cart ? <h6>In Cart!</h6> : 
                      <h6>Add to Cart</h6>
                    )}
                  </div>
      {/* <div onClick={() => handleCart(course?.id)}>{loadingItems[course?.id] ? <PulseLoader size={8} color="white"/> :<h6> Add to Cart </h6>}</div> */}
      </div>
    </div>
                ))
              ) : (
                <p>No more courses available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserCourseOverview;