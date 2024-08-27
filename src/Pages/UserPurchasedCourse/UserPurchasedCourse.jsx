import React,{ useEffect, useMemo, useState } from "react";
import "./UserPurchasedCourse.css";
import videoPlayer from "../../assets/videoPlayer.png";
import profile from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BASE_URI } from "../../Config/url";
import { SyncLoader } from "react-spinners";

const UserPurchasedCourse = () => {
  const { id } = useParams();
  console.log(id);
  const [buttonPick, setButtonPick] = useState("Overview");
  const [openDetails, setOpenDetails] = useState({});
  const [openDetailsLeft, setOpenDetailsLeft] = useState({});
  const [video_url, setVideo_url]= useState("");
  const [video_thumb, setVideo_thumb]= useState("");
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

  const url = `${BASE_URI}/api/v1/courses/usersCourseOverview/${id}`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  //  setData(data.data[0]);
  //  console.log(data);
  const courseData = useMemo(() => data?.data || [], [data]);
  console.log(courseData);

  const convertSecondsToMinutes = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };
  const total_duration = convertSecondsToMinutes(courseData?.course?.total_duration)

  useEffect(()=>{
    setVideo_url(courseData?.courseChapters?.chapters[0]?.lessons[0]?.video_url);
    setVideo_thumb(courseData?.courseChapters?.chapters[0]?.lessons[0]?.thumbnail);
    console.log(video_url)
  },[courseData]);
  
  // console.log(courseData);

  const handleVideoChange = (video_url,video_thumb)=>{
    setVideo_url(video_url)
    setVideo_thumb(video_thumb)
    // refetch();
  }



  return (
    <>
      {/* {error2?.response?.data?.message === "No courses found" ? (
        <h1>No courses found</h1> */}
      {/* ) : */}
       {isLoading ? (
        <SyncLoader />
      ) : (
        <div className="wrapper-purchasedCourse">
          <div className="top-purchasedCourse">
            <h4>Course Overview</h4>
            <div>
              <h6>Edit Course</h6>
            </div>
          </div>
          <div className="bottom-purchasedCourse">
            <div className="left-bottom-purchasedCourse">
              <div className="video-container-purchasedCourse">
              <video 
      src={video_url} 
      controls 
      muted 
      loop 
      poster={video_thumb}
      preload="auto"
    >
      Your browser does not support the video tag.
    </video>
              </div>
              <span>
                <h5>{courseData?.course?.title} :</h5>
                <h6
                  dangerouslySetInnerHTML={{
                    __html:
                    courseData?.course?.description
                        ?.split(" ")
                        .slice(0, 7)
                        .join(" ") + "...",
                  }}
                ></h6>
              </span>
              <div className="videoCreator-purchasedCourse">
                <img src={profile} alt="profile" />
                <h6>{courseData?.course?.name}</h6>
                <h5>|</h5>
                <h6>Raybit Tech</h6>
              </div>
              <div className="buttons-purchasedCourse">
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
                        ? "button-purchasedCourse"
                        : "not-button-purchasedCourse"
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
                        ? "button-purchasedCourse"
                        : "not-button-purchasedCourse"
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
                        ? "button-purchasedCourse"
                        : "not-button-purchasedCourse"
                    }
                  >
                    <h5>Reviews</h5>
                  </div>
                </div>
                <div className="line-purchasedCourse"></div>
              </div>
              <div className="course-details-purchasedCourse">
                {buttonPick === "Overview" && (
                  <>
                  <span><h5>Rating:</h5>
                    <h6>{courseData?.review?.averageRating} out of 5</h6></span>
                    
                    <span><h6>{courseData?.review?.totalReviews}</h6>
                    <h5>Ratings</h5></span>
                    <span><h5>{courseData?.course?.enrolled} Students</h5></span>
                    <span><h6>{total_duration}</h6>
                    <h5>Total</h5></span>
                    
                    <div className="certificate-purchasedCourse">
                    <h6>Get Jiujitsux Certificate by completing the entire course</h6>
                    <div><h6>Certificate</h6></div>
                    </div>
                    <div className="discription-purchasedCourse">
                      <h5>Discription</h5>
                      <h6
                      // dangerouslySetInnerHTML={{
                      //   __html: courseData?.course?.description,
                      // }}
                      
                    >In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
                    But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
                    That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and
                    beyond.
                    A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks
                    under the hood of React.
                    The all-in-one package that takes you from zero to truly understanding React and building modern, powerful,
                    and professional web applications.
                    Real projects. Real explanations. Real React.</h6>
                    </div>
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
                          In order to get the course certificate please make
                          sure you complete all the assignments
                        </p>
                      </details>
                    ))}
                  </>
                )}

                {buttonPick === "Reviews" && (
                  <div className="ratings-purchasedCourse">
                    <div className="left-ratings-purchasedCourse">
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
                    <div className="right-ratings-purchasedCourse">
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
                          <div className="fifty-rating-purchasedCourse"></div>
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
                          <div className="fourty-rating-purchasedCourse"></div>
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
                          <div className="thirty-rating-purchasedCourse"></div>
                        </div>
                      </div>
                      <div>
                        <h6>21%</h6>
                        <span>
                          <FontAwesomeIcon icon={faStar} className="staricon" />
                          <FontAwesomeIcon icon={faStar} className="staricon" />
                        </span>
                        <div>
                          <div className="twenty-rating-purchasedCourse"></div>
                        </div>
                      </div>
                      <div>
                        <h6>11%</h6>
                        <span>
                          <FontAwesomeIcon icon={faStar} className="staricon" />
                        </span>
                        <div>
                          <div className="ten-rating-purchasedCourse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=""></div>
            </div>
            <div className="right-bottom-purchasedCourse">
              <div className="heading-bottom-purchasedCourse">
                <h5>Course Content</h5>
                <h6>Lecture (15) Total (15.3hr)</h6>
              </div>

              <div className="right-bottom-options">
                {courseData.length === 0 ? (
                  <h5>No chapters found!</h5>
                ) : isLoading ? (
                  <SyncLoader />
                ) : (
                  courseData?.courseChapters?.chapters?.map((chapter, chapterIndex) => (
                    <details
                      key={chapter?.chapter_id}
                      open={!!openDetailsLeft[chapterIndex]}
                    >
                      <summary>
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          className={
                            openDetailsLeft[chapterIndex]
                              ? "up-icon"
                              : "down-icon"
                          }
                        />
                        <h5>
                          Section {chapter?.chapter_no} |{" "}
                          {chapter?.chapterTitle.trim()}
                        </h5>
                        <h6>
                          {chapter?.totalLessons} Videos |{" "}
                          {chapter?.totalDuration} mins
                        </h6>
                      </summary>
                      {chapter?.lessons.map((lesson) => (
                        <div key={lesson?.lesson_id}>
                          <input type="checkbox" />
                          <span  onClick={()=> handleVideoChange(lesson?.video_url,lesson?.thumbnail)} style={{cursor:"pointer"}}>
                            <h6>{lesson?.lessonTitle}</h6>
                            <h6>1 Video | {lesson?.duration} mins</h6>
                          </span>
                        </div>
                      ))}
                    </details>
                  ))
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};
export default UserPurchasedCourse;


