import React from 'react'
import "./UserCart.css"
import itemThumb from ".././../assets/usercartimage.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import cardImage from "../../assets/coursesCard.png";
const UserCart = () => {
  return (
    <>
    <div className="wrapper-usercart">
      <div className="top-usercart">
        <h3>Shopping Cart</h3>
      </div>
      <div className="mid-usercart">
        <div className="mid-left-usercart">
        {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='mid-left-cards-usercart'>
          <div className="mid-left-left-usercart">
            <img src={itemThumb} alt="thumbnail" />
            <div>
              <p>Remove</p>
            </div>
          </div>
          <div className="mid-left-mid-usercart">
            <h5>The Basics of UI</h5>
            <p>Beginner’s Guide to becoming a professional frontend developer.</p>
            <p>5 reviews (4.0    )</p>
          </div>
          <div className="mid-left-right-usercart">
              <h6>$10.99 <FontAwesomeIcon icon={faTag} className='tag-usercart'/></h6>
              <h6>$15.99</h6>
              <div><p>-</p><p>1</p><p>+</p></div>
          </div>
        </div>
      ))}
          
        </div>

        <div className="mid-right-usercart">
          <div className="mid-right-top-usercart">
          <h5>Total:</h5>
          <span>
            <h6>$10.99</h6>
            <h6>$15.99</h6>
          </span>
          <div><p>Checkout</p><p><FontAwesomeIcon icon={faArrowRight} /></p></div>
          </div>
          <div className="mid-right-bottom-usercart">
            <p>Promotions</p>
            <div><p>WELCOME50</p><p>is applied</p></div>
            <span><input type="text" placeholder='Enter Coupon'/><span><p>Apply</p></span></span>
            
          </div>

        </div>
      </div>
      <div className="bottom-usercart">
      
                <h5>You may also like:</h5>
                
                <div className='cards-usercart'>
{[0, 1, 2,3,4,5].map((index) => (
                <div className="card-bottom-usercart" key={index}> 
      <img src={cardImage} alt="Course image" />
      <div className="middle-sec-card-usercart">
        <div className="addCourse-card-usercart">
          <h6>Frontend</h6>
        </div>
        <div className="pricing-card-usercart">
          <h5>Tag1 Tag2 Tag3</h5>
          {/* <h5>$10.99</h5> */}
        </div>
      </div>
      <p>Basit Bashir, Designer at Raybit...</p>
      <h5>UI basic Guidelines</h5>
      <h4>Beginner’s Guide to becoming a professional frontend developer</h4>
      <div className="bottom-card-userusercart">
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

export default UserCart