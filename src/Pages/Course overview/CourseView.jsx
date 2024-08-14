import React,{ useMemo, useState } from "react";
import "./CourseView.css";
import videoPlayer from "../../assets/videoPlayer.png";
import profile from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import { SyncLoader } from "react-spinners";


const CourseView = () => {
  const { id } = useParams();
  // console.log(id);
  const [buttonPick, setButtonPick] = useState("Overview");
  const [openDetails, setOpenDetails] = useState({});
  const [openDetailsLeft, setOpenDetailsLeft] = useState({});

  const [Data, setData] = useState(null);

  const handleButtonToggle = (event) => {
    const text = event.currentTarget.querySelector("h5").textContent;
    setButtonPick(text);
    // console.log(text);
  };
  const handleToggle = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleLeftToggle = (index) => {
    setOpenDetailsLeft((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


  const url = `${BASE_URI}/api/v1/courses/courseOverview/${id}`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  //  setData(data.data[0]);
  //  console.log(data);
  const courseData = useMemo(() => data?.data?.chapters || [data?.chapters]);
  console.log(error);

  const url2 = `${BASE_URI}/api/v1/courses/${id}`;
  // const token2 = localStorage.getItem("token");
  const {
    data: data2,
    isLoading2,
    error: error2,
    refetch2,
  } = useFetch(url2, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  // console.log(data2)
  const courseData2 = useMemo(() => data2?.data || [data2]);



  return (
    <>
    {error2?.response?.data?.message === "No courses found" ? <h1>No courses found</h1>: 
      isLoading2 ? <SyncLoader/> :(
      <div className="wrapper-courseview">
        <div className="top-courseview">
          <h4>Course Overview</h4>
          <div>
            <h6>Edit Course</h6>
          </div>
        </div>
        <div className="bottom-courseview">
          <div className="left-bottom-courseview">
            <div className="video-container-courseview">
              <img src={videoPlayer} alt="video" />
            </div>
            <span>
              <h5>{courseData2[0]?.title} :</h5>
              <h6>{courseData2[0]?.description?.split(' ').slice(0, 7).join(' ') + '...'}</h6>
            </span>
            <div className="videoCreator-courseview">
              <img src={profile} alt="profile" />
              <h6>{courseData2[0]?.name}</h6>
              <h5>|</h5>
              <h6>Raybit Tech</h6>
            </div>
            <div className="buttons-courseview">
              <div className="buttons-holder">
                {
                  <div
                    className={
                      buttonPick === "Overview"
                        ? "button-triangle"
                        : "no-button-triangle"
                    }
                  ></div>
                }
                <div
                  onClick={handleButtonToggle}
                  className={
                    buttonPick === "Overview"
                      ? "button-courseview"
                      : "not-button-courseview"
                  }
                >
                  <h5>Overview</h5>
                </div>
              </div>
              <div className="buttons-holder">
                {
                  <div
                    className={
                      buttonPick === "FAQ"
                        ? "button-triangle"
                        : "no-button-triangle"
                    }
                  ></div>
                }
                <div
                  onClick={handleButtonToggle}
                  className={
                    buttonPick === "FAQ"
                      ? "button-courseview"
                      : "not-button-courseview"
                  }
                >
                  <h5>FAQ</h5>
                </div>
              </div>
              <div className="buttons-holder">
                {
                  <div
                    className={
                      buttonPick === "Reviews"
                        ? "button-triangle"
                        : "no-button-triangle"
                    }
                  ></div>
                }
                <div
                  onClick={handleButtonToggle}
                  className={
                    buttonPick === "Reviews"
                      ? "button-courseview"
                      : "not-button-courseview"
                  }
                >
                  <h5>Reviews</h5>
                </div>
              </div>
              <div className="line-courseview"></div>
            </div>
            <div className="course-details-courseview">
              {buttonPick === "Overview" && (
                <>
                  <h5>Course Title:</h5>
                  <h6>{courseData2[0]?.title}</h6>
                  <h5>Course Duration:</h5>
                  <h6>{courseData2[0]?.total_duration} hrs</h6>
                  <h5>Course Title:</h5>
                  <h6>{courseData2[0]?.description}</h6>
                </>
              )}
              {buttonPick === "FAQ" && (
                <>
                  {[0, 1, 2].map((index) => (
                    <details
                      key={index}
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
                        How does the free trail work?
                      </summary>
                      <p>
                        In order to get the course certificate please make sure
                        you complete all the assignments
                      </p>
                    </details>
                  ))}
                </>
              )}

              {buttonPick === "Reviews" && (
                <div className="ratings-courseview">
                  <div className="left-ratings-courseview">
                    <h6>Average Reviews</h6>
                    <h5>4.0</h5>
                    <span>
                      <FontAwesomeIcon icon={faStar} className="staricon" />
                      <FontAwesomeIcon icon={faStar} className="staricon" />
                      <FontAwesomeIcon icon={faStar} className="staricon" />
                      <FontAwesomeIcon icon={faStar} className="staricon" />
                    </span>
                    <h6>Ratings</h6>
                  </div>
                  <div className="right-ratings-courseview">
                    <h6>Detailed Ratings</h6>
                    <div>
                      <h6>51%</h6>
                      <span>
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                      </span>
                      <div>
                        <div className="fifty-rating-courseview"></div>
                      </div>
                    </div>
                    <div>
                      <h6>41%</h6>
                      <span>
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                      </span>
                      <div>
                        <div className="fourty-rating-courseview"></div>
                      </div>
                    </div>
                    <div>
                      <h6>31%</h6>
                      <span>
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                      </span>
                      <div>
                        <div className="thirty-rating-courseview"></div>
                      </div>
                    </div>
                    <div>
                      <h6>21%</h6>
                      <span>
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                      </span>
                      <div>
                        <div className="twenty-rating-courseview"></div>
                      </div>
                    </div>
                    <div>
                      <h6>11%</h6>
                      <span>
                        <FontAwesomeIcon icon={faStar} className="staricon" />
                      </span>
                      <div>
                        <div className="ten-rating-courseview"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="right-bottom-courseview">
            <div className="heading-bottom-courseview">
              <h5>Course Content</h5>
              <h6>Lecture (15) Total (15.3hr)</h6>
            </div>


            <div className="right-bottom-options">
              {courseData.length === 0 ? <h5>No chapters found!</h5> : 
              (isLoading ? <SyncLoader/> :
      courseData.map((chapter, chapterIndex) => (
        <details key={chapter?.chapter_id} open={!!openDetailsLeft[chapterIndex]}>
          <summary >
            <FontAwesomeIcon icon={faAngleDown} 
                        className={
                          openDetailsLeft[chapterIndex]
                            ? "up-icon"
                            : "down-icon" }/>
            <h5>Section {chapter?.chapter_no} | {chapter?.chapterTitle.trim()}</h5>
            <h6>{chapter?.totalLessons} Videos | {chapter?.totalDuration} mins</h6>
          </summary>
          {chapter?.lessons.map((lesson) => (
            <div key={lesson?.lesson_id}>
              <input type="checkbox" />
              <span>
                <h6>{lesson?.lessonTitle}</h6>
                <h6>1 Video | {lesson?.duration} mins</h6>
              </span>
            </div>
          ))}
        </details>
      )))}
    </div>
          </div>
        </div>
      </div>)}
    </>
  );
};
export default CourseView;
