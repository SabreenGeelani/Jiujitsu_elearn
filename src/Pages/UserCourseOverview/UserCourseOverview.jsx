import React, { useEffect, useMemo, useState } from "react";
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
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import toast from "react-hot-toast";
import { SyncLoader, PulseLoader } from "react-spinners";
const UserCourseOverview = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});
  const [openDetails, setOpenDetails] = useState({});
  // const [isCart, setIsCart] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [video_thumb, setVideo_thumb] = useState("");
  const { id } = useParams();
  const handleToggle = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const url = `${BASE_URI}/api/v1/courses/courseOverviewWithoutPurchase/${id}`;
  const token = localStorage.getItem("token");
  const { data, error, refetch, isLoading } = useFetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const courseData = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    setVideo_url(
      courseData?.courseChapters?.chapters[0]?.lessons[0]?.video_url
    );
    setVideo_thumb(courseData?.course?.thumbnail);

    setSelectedLesson(
      courseData?.courseChapters?.chapters[0]?.lessons[0]?.lesson_id
    );
    console.log(courseData?.course?.thumbnail);
  }, [courseData]);

  console.log(courseData);
  const chapters = courseData?.courseChapters?.chapters || [];
  const handleCart = async () => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    setIsLoding(true);
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
      setIsLoding(false);
      toast.success(`${response?.data?.message}`);
      // console.log(response, "its response")
    } catch (err) {
      setIsLoding(false);
      // console.log(err?.response?.data?.message)
      if (err?.response?.data?.message === "Course is already in the cart") {
        // setIsCart(true);
        toast.error(`Error: ${err?.response?.data?.message}`);
      }
    }
  };

  const handleVideoChange = (video_url, video_thumb, lesson_id) => {
    setVideo_url(video_url);
    setVideo_thumb(video_thumb);
    setSelectedLesson(lesson_id);
    // refetch();
  };

  return (
    <>
      {isLoading ? (
        <SyncLoader id="spinner-usercourseview" size={8} color="black" />
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
                    chapters.map((chapter, index) => (
                      <details
                        key={chapter.chapter_id}
                        open={!!openDetails[index]}
                        onToggle={() => handleToggle(index)}
                      >
                        <summary>
                          <FontAwesomeIcon
                            icon={faAngleDown}
                            className={
                              openDetails[index] ? "up-icon" : "down-icon"
                            }
                          />
                          <h6>
                            {chapter.chapter_no || "No chapter number"}.{" "}
                            {chapter.chapterTitle || "No chapter title"}
                          </h6>
                        </summary>
                        {chapter?.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            onClick={() =>
                              handleVideoChange(
                                lesson?.video_url,
                                lesson?.thumbnail,
                                lesson?.lesson_id
                              )
                            }
                            style={{
                              cursor: "pointer",
                              color:
                                selectedLesson === lesson?.lesson_id && "red",
                            }}
                          >
                            <h6>
                              <FaYoutube color="black" />
                              Lesson {idx + 1}:{" "}
                              {lesson?.lessonTitle || "No lesson title"}
                            </h6>
                            <h6>
                              {lesson?.duration || "No duration available"}
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

                <div onClick={handleCart}>
                  {isLoding ? (
                    <PulseLoader size={8} color="white" />
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
                          {review.profile_picture ? (
                            <img
                              src={review.profile_picture}
                              alt="profile image"
                            />
                          ) : (
                            <FaUserCircle className="fs-1" />
                          )}
                          <h5>{review.name || "No name available"}</h5>
                          <p>
                            {review.review_date
                              ? review.review_date.split("T")[0]
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
                    <p>No reviews available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-userCourseview">
            <span>
              <h3>More Courses by</h3>
              <div>
                <p>{courseData?.course?.name || "No author name available"}</p>
                <span></span>
              </div>
            </span>
            <div className="cards-userCourseview">
              {courseData?.other_courses?.length > 0 ? (
                courseData.other_courses.map((course, index) => (
                  // <div className="card-bottom-userCourseview" key={index}>
                  //   <img src={cardImage} alt="Course image" />
                  //   <div className="middle-sec-card-userCourseview">
                  //     <div className="addCourse-card-userCourseview">
                  //       <h6>{course?.title || "No title available"}</h6>
                  //     </div>
                  //     <div>
                  //       <h5>${course?.price || "No price available"}</h5>
                  //       <h6>
                  //         {course?.updated_at
                  //           ? course.updated_at.split("T")[0]
                  //           : "No update date"}
                  //       </h6>
                  //     </div>
                  //   </div>
                  // </div>
                  <div className="card-bottom-userCourseview" key={index}>
                    <img src={course?.thumbnail} alt="Course image" />
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
                    <h4>
                      {course?.description?.split(" ").slice(0, 7).join(" ") +
                        "..."}
                    </h4>
                    <div className="bottom-card-useruserCourseview">
                      <span>
                        <h5>$14.99</h5>
                        <h5>$10.99</h5>
                      </span>
                      <div onClick={() => handleCart(course?.id)}>
                        {loadingItems[course?.id] ? (
                          <PulseLoader size={8} color="white" />
                        ) : (
                          <h6>Add to Cart</h6>
                        )}
                      </div>
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
