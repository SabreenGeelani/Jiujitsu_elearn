import { useState } from "react";
import "./CourseView.css";
import videoPlayer from "../../assets/videoPlayer.png";
import profile from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";

const CourseView = () => {
  const [buttonPick, setButtonPick] = useState("Overview");
  const [openDetails, setOpenDetails] = useState({});

  const handleButtonToggle = (event) => {
    const text = event.currentTarget.querySelector("h5").textContent;
    setButtonPick(text);
    console.log(text);
  };

  const handleToggle = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
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
              <h5>UI basic Guidelines :</h5>
              <h6>Beginner’s Guide to becoming a professional frontend</h6>
            </span>
            <div className="videoCreator-courseview">
              <img src={profile} alt="profile" />
              <h6>Basit Bashir</h6>
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
                  <h6>
                    Mastering Frontend Development: From Basics to Advanced
                  </h6>
                  <h5>Course Title:</h5>
                  <h6>
                    Mastering Frontend Development: From Basics to Advanced
                  </h6>
                  <h5>Course Title:</h5>
                  <h6>
                    Mastering Frontend Development: From Basics to Advanced
                  </h6>
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
              {[0, 1, 3, 4, 5, 6, 7].map((index) => (
                <details
                  key={index}
                  open={!!openDetails[index]}
                  onToggle={() => handleToggle(index)}
                >
                  <summary>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={openDetails[index] ? "up-icon" : "down-icon"}
                    />
                    <h5>Section 1 | Intro</h5>
                    <h6>2 Videos | 24mins</h6>
                  </summary>

                  <div>
                    <input type="checkbox" />
                    <span>
                      <h6>Getting Started</h6>
                      <h6>1 Video | 14mins</h6>
                    </span>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
