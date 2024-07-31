import React, { useState } from 'react';
import "./UserCourseOverview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faStar, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FaYoutube } from 'react-icons/fa';
import thumbnail from ".././../assets/thumbnail-userCourseview.jpeg";
import courseby from ".././../assets/userCourseview-profile.png";
import cardImage from "../../assets/coursesCard.png";










const UserCourseOverview = () => {
    const [openDetails, setOpenDetails] = useState({});

    const handleToggle = (index) => {
        setOpenDetails((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
    };

    const reviews = [
        {
            name: "Basit Bashir",
            date: "1 day ago",
            rating: 5,
            comment: "Worth the money, easy to learn.",
        },
        {
            name: "John Doe",
            date: "2 days ago",
            rating: 4,
            comment: "Good course, but some sections could be improved.",
        }
        // {
        //     name: "Jane Smith",
        //     date: "3 days ago",
        //     rating: 5,
        //     comment: "Excellent content, well explained.",
        // }
    ];
    

    


    return (
    <>
    <div className="wrapper-userCourseview">
        <div className="top-userCourseview">
            <h3>The Basics of UI</h3>
            <h6>Beginner’s Guide to becoming a professional frontend developer.</h6>
            <h5>Tag-1, Tag-2, Tag-3</h5>
            <h6>5 reviews (4.0 <FontAwesomeIcon icon={faStar} className="staricon" />)</h6>
        </div>

        <div className="mid-userCourseview">
            <div className="left-mid-userCourseview">
                <div className="left-top-mid-userCourseview">
                <h3>Description</h3>
                <h5>
                    Dive into the world of frontend development and learn how to create stunning, responsive, and
interactive websites. This comprehensive course will take you from the fundamentals of HTML,
CSS, and JavaScript to advanced topics like modern JavaScript frameworks, responsive design, and
performance optimization. Whether you're a beginner or looking to sharpen your skills, this course
has something for everyone.
                </h5>
                <h4>Learning Objectives:</h4>
                <h6>By the end of this course, you will be able to:</h6>
                <ul>
                    <li>Understand the basics of HTML, CSS, and JavaScript</li>
                    <li>Develop responsive web pages using modern CSS techniques</li>
                    <li>Create dynamic and interactive user interfaces with JavaScript</li>
                    <li>Utilize frontend frameworks like React or Vue.js for building complex applications</li>
                    <li>Optimize web performance for better user experience</li>
                    <li>Implement best practices for frontend development</li>
                </ul>
                <h4>Watch 3 Free Lessons to get insights of what to Learn <FontAwesomeIcon icon={faArrowRight} /></h4>
                </div>
                <div className="left-bottom-mid-userCourseview">
                    <h4>Course Lessons</h4>
                    <div>
                    {[0, 1, 2, 4, 5, 6].map((index) => (
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
                        <h6>1. Introduction</h6>
                      </summary>
                      <div>
                      
                      <h6><FaYoutube color="black" />Lesson 1: Lets get started</h6>
                      <h6>21mins</h6>
                      </div>
                    </details>
                  ))}
                    </div>
                </div>
            </div>
            <div className="right-mid-userCourseview">
                <img src={thumbnail} alt="thumbnail" className='tumbnail-userCourseview'/>
                <div className="pricing-right-mid-userCourseview">
                    <span><h5>$14.99</h5>
                    <h5>$10.99</h5></span>
                    <div>Add to Cart</div>
                </div>
                <div className="details-right-mid-userCourseview">
                    <span><h5>Access:</h5><h6>Full Lifetime Access</h6></span>
                    <span><h5>Enrolled:</h5><h6>100+</h6></span>
                    <span><h5>Last Updated:</h5><h6>24/07/2024</h6></span>
                    <span><h5>Certificate:</h5><h6>After completion of course</h6></span>
                </div>
                <div className="courseby-right-mid-userCourseview">
                    <h5>Course by:</h5>
                    <span><img src={courseby} alt="profile image" /> <h6>Basit Bashir</h6></span>
                </div>
                <div className="ratings-right-mid-userCourseview">
                    <h5>Reviews & Ratings:</h5>
                    <div className='map-ratings-right-mid-userCourseview'>
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <div>
                                <img src={courseby} alt="profile image" />
                                <h5>{review.name}</h5>
                                <p>{review.date}</p>
                            </div>
                            <div>
                                <span>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className="staricon" />
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
                
                <div className='cards-userCourseview'>
{[0, 1, 2,3,4,5].map((index) => (
                <div className="card-bottom-userCourseview" key={index}> 
      <img src={cardImage} alt="Course image" />
      <div className="middle-sec-card-userCourseview">
        <div className="addCourse-card-userCourseview">
          <h6>Frontend</h6>
        </div>
        <div className="pricing-card-userCourseview">
          <h5>Tag1 Tag2 Tag3</h5>
          {/* <h5>$10.99</h5> */}
        </div>
      </div>
      <p>Basit Bashir, Designer at Raybit...</p>
      <h5>UI basic Guidelines</h5>
      <h4>Beginner’s Guide to becoming a professional frontend developer</h4>
      <div className="bottom-card-useruserCourseview">
      <span>
      <h5>$14.99</h5>
      <h5>$10.99</h5>
      </span>
      <div><h6>Add to Cart</h6></div>
      </div>
    </div>))}
                </div>
            </div>
    </div>
    </>
  )
}

export default UserCourseOverview;
