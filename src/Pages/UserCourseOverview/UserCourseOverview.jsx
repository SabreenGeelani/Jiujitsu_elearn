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
import "ldrs/grid";
import "ldrs/bouncy";

const UserCourseOverview = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [loadingItems, setLoadingItems] = useState(null);
  const [openChapters, setOpenChapters] = useState({ 0: true });
  const [selectedLesson, setSelectedLesson] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [video_thumb, setVideo_thumb] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLeftToggle = (chapterIndex) => {
    setOpenChapters((prevOpenChapters) => ({
      ...prevOpenChapters,
      [chapterIndex]: !prevOpenChapters[chapterIndex],
    }));
  };

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
  }, [courseData]);

  const chapters = useMemo(
    () => courseData?.courseChapters?.chapters || [],
    [courseData]
  );

  const handleCart = async (course_id, e) => {
    e.stopPropagation();
    setLoadingItems(course_id);
    setIsLoding(true);
    if (!token) {
      setIsLoding(false);
      navigate(`/`);
      return toast.error(`Error: Please Login First!`);
    }
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
    } catch (err) {
      setIsLoding(false);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
      toast.error(`Error: ${err?.response?.data?.message}`);
    }
  };

  const handleVideoChange = useCallback((video_url, video_thumb, lesson_id) => {
    setVideo_url(video_url);
    setVideo_thumb(video_thumb);
    setSelectedLesson(lesson_id);
  }, []);

  return (
    <>
      {isLoading ? (
        <l-grid
          id="spinner-usercourseview"
          size="60"
          speed="1.5"
          color="black"
        ></l-grid>
      ) : (
        <div className="wrapper-userCourseview">
          <div className="top-userCourseview">
            <h3 className="text-uppercase">
              {courseData?.course?.title || "No title available"}
            </h3>

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
                        open={
                          (chapterIndex === 0 && true) ||
                          openChapters[chapterIndex]
                        }
                        onToggle={() => handleLeftToggle(chapterIndex)}
                      >
                        <summary>
                          <FontAwesomeIcon
                            icon={faAngleDown}
                            className={
                              openChapters[chapterIndex]
                                ? "up-icon"
                                : "down-icon"
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
                              <FaYoutube
                                color="black"
                                style={{
                                  cursor: "pointer",
                                  color:
                                    selectedLesson === lesson?.lesson_id &&
                                    "red",
                                  transition: "all ease-in-out 0.5s",
                                }}
                              />
                              Lesson {idx + 1}:{" "}
                              {lesson?.lessonTitle || "No lesson title"}
                            </h6>
                            <h6>
                              {formatTime(lesson?.duration) ||
                                "No duration available"}
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
              <div className="pricing-right-mid-userCourseview">
                <span>
                  <h5>${courseData?.course?.price || "No price available"}</h5>
                  <h5>
                    $
                    {courseData?.course?.discounted_price ||
                      "No discount available"}
                  </h5>
                </span>

                <div onClick={(e) => handleCart(id, e)}>
                  {isLoding ? (
                    <l-bouncy size="35" speed="1.2" color="white"></l-bouncy>
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
                  <h6>{courseData?.course?.total_enrollments || 0}</h6>
                </span>
                <span>
                  <h5>Certification:</h5>
                  <h6>
                    {courseData?.course?.certification
                      ? "Yes"
                      : "No certification available"}
                  </h6>
                </span>
              </div>
            </div>
          </div>
          <div className="bottom-userCourseview">
            <h3>Other Courses You Might Like</h3>
            <div className="cards-userCourseview">
              {courseData?.otherCourses?.length > 0 ? (
                courseData?.otherCourses.map((course, index) => (
                  <div className="card-userCourseview" key={course?.id}>
                    <img
                      src={course?.thumbnail || cardImage}
                      alt="course"
                      className="image-card-userCourseview"
                    />
                    <div className="info-card-userCourseview">
                      <h5>{course?.title || "No title available"}</h5>
                      <p>
                        {course?.description
                          ? course.description
                              .split(" ")
                              .slice(0, 7)
                              .join(" ") + "..."
                          : "No description available"}
                      </p>
                      <div
                        className="add-to-cart"
                        onClick={(e) => handleCart(course.id, e)}
                      >
                        {isLoding && loadingItems === course.id ? (
                          <PulseLoader size={8} color={"#fff"} />
                        ) : course.is_purchased ? (
                          "Go to Course"
                        ) : course.is_in_cart ? (
                          "Go to Cart"
                        ) : (
                          "Add to Cart"
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No other courses available!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCourseOverview;
