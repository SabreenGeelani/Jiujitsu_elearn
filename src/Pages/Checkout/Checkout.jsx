import React from "react";
import "./Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
const Checkout = () => {
  return (
    <>
      <div className="wrapper-checkout">
        <div className="top-checkout">
          <h4>Checkout</h4>
        </div>
        <div className="container-checkout">
          <div className="top-cointainer-checkout">
            <h5>Billing address</h5>
            <span>
              <p>Cancel</p>
            </span>
          </div>
          <div className="bottom-container-checkout">
            <div className="left-bottom-container-checkout">
              <div className="left-bottom-mid-container-checkout">
                <div>
                  <span>
                    <p>Country</p>
                    <p>
                      Required <p>*</p>
                    </p>
                  </span>
                  
                  <select>
                    <option value="option1">India</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
               
                </div>
                <div>
                  <span>
                    <p>State</p>
                    <p>
                      Required <p>*</p>
                    </p>
                  </span>
                  
                  <select>
                    <option value="option1"><p>Please select</p></option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
               
                </div>
                
                
              </div>

              <div className="left-bottom-bottom-container-checkout"></div>
            </div>
            <div className="right-bottom-container-checkout"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
