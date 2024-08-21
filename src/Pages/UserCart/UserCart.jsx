import React, { useEffect, useMemo, useState } from "react";
import "./UserCart.css";
import itemThumb from ".././../assets/usercartimage.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import cardImage from "../../assets/coursesCard.png";
import { BASE_URI } from "../../Config/url";
import useFetch from "../../hooks/useFetch";
import { SyncLoader, PulseLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";

const UserCart = () => {
  const [loadingItems, setLoadingItems] = useState({});
  const url = `${BASE_URI}/api/v1/cart`;
  const token = localStorage.getItem("token");
  const { data, isLoading, error, refetch } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const APIdata = useMemo(() => data?.data || [data], [data]);
  const cartItems = APIdata[0];
  console.log((error && error) || (cartItems && cartItems));

  const handleCart = async (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      console.log(id);
      const response = await axios.post(
        `${BASE_URI}/api/v1/cart`,
        { course_id: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success(`${response.data.message}`);
    } catch (err) {
      toast.error(`Error: ${err?.response?.data?.message}`);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleRemoveCart = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URI}/api/v1/cart/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success(`${response.data.message}`);
      refetch();
    } catch (err) {
      toast.error(`Error: ${err?.response?.data?.message}`);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <>
      {isLoading ? (
        <SyncLoader id="spinner-usercourseview" size={8} color="black" />
      ) : (
        <div className="wrapper-usercart">
          <div className="top-usercart">
            <h3>Shopping Cart</h3>
          </div>
          <div className="mid-usercart">
            <div className="mid-left-usercart">
              {cartItems?.cart?.map((item, index) => (
                <div key={index} className="mid-left-cards-usercart">
                  <div className="mid-left-left-usercart">
                    <img src={item.thumbnail || itemThumb} alt="thumbnail" />
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveCart(item?.course_id)}
                    >
                      <p>Remove</p>
                    </div>
                  </div>
                  <div className="mid-left-mid-usercart">
                    <h5>
                      {item?.title?.split(" ").slice(0, 3).join(" ") + "..."}
                    </h5>
                    <p>
                      {item?.description?.split(" ").slice(0, 7).join(" ") +
                        "..."}
                    </p>
                    <p>
                      {item?.totalRviews} reviews ({item?.rating})
                    </p>
                  </div>
                  <div className="mid-left-right-usercart">
                    <h6>
                      ${item?.price}{" "}
                      <FontAwesomeIcon icon={faTag} className="tag-usercart" />
                    </h6>
                    <span>
                      <p>${item?.discounted_price}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mid-right-usercart">
              <div className="mid-right-top-usercart">
                <h5>Total:</h5>
                <span>
                  <h6>${cartItems?.totalPrice}</h6>
                  <h6>$15.99</h6>
                </span>
                <div>
                  <p>Checkout</p>
                  <p>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </p>
                </div>
              </div>
              <div className="mid-right-bottom-usercart">
                <p>Promotions</p>
                <div>
                  <p>WELCOME50</p>
                  <p>is applied</p>
                </div>
                <span>
                  <input type="text" placeholder="Enter Coupon" />
                  <span>
                    <p>Apply</p>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="bottom-usercart">
            <h5>You may also like:</h5>
            <div className="cards-usercart">
              {cartItems?.expertCourses?.map((items, index) => (
                <div className="card-bottom-usercart" key={index}>
                  <img src={items?.thumbnail || cardImage} alt="Course image" />
                  <div className="middle-sec-card-usercart">
                    <div className="addCourse-card-usercart">
                      <h6>{items?.category}</h6>
                    </div>
                    <div className="pricing-card-usercart">
                      <h5>Tag1 Tag2 Tag3</h5>
                    </div>
                  </div>
                  <p>{items?.name}, Designer at Raybit...</p>
                  <h5>{items?.title?.split(" ").slice(0, 3).join(" ")}</h5>
                  <h4>
                    {items?.description?.split(" ").slice(0, 7).join(" ") +
                      "..."}
                  </h4>
                  <div className="bottom-card-userusercart">
                    <span>
                      <h5>${items?.discount}</h5>
                      <h5>${items?.price}</h5>
                    </span>
                    <div onClick={() => handleCart(items?.id)}>
                      {loadingItems[items?.id] ? (
                        <PulseLoader size={8} color="white" />
                      ) : (
                        <h6>Add to Cart</h6>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCart;
