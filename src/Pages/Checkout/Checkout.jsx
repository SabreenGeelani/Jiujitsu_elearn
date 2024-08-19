import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { AiOutlineBank } from "react-icons/ai";
import { CgPaypal } from "react-icons/cg";
import { MdCheck, MdCheckCircle } from "react-icons/md";
import "./Checkout.css";

function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = () => {
    setPaymentSuccessful(true);
  };

  return (
    <div className="w-100">
      {paymentSuccessful ? (
        <div
          className="payment-success d-flex flex-column align-items-center justify-content-center"
          style={{ height: "calc(100vh - 5rem)", gap: "6rem" }}
        >
          <div
            className="bg-gradient-custom-div rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "13rem", height: "13rem" }}
          >
            <MdCheck style={{ fontSize: "8rem" }} />
          </div>
          <div>
            <h4>Payment Successfull!</h4>
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="btn btn-primary mt-4 signup-now px-3"
                onClick={() => (window.location.href = "/userCourses")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="d-flex align-items-center justify-content-between py-3 pb-4">
            <h3 className="fw-bold text-capitalize">Checkout</h3>
          </header>
          <main
            className="custom-box px-5 py-4 h-100"
            style={{ minHeight: "30rem" }}
          >
            <header className="d-flex align-items-center justify-content-between py-2 pb-4">
              <h4 className="text-capitalize">Billing Address</h4>
              <button className="signup-now py-2 px-3 fw-lightBold mb-0 h-auto">
                Cancel
              </button>
            </header>
            <div className="d-flex">
              <div className="w-75" style={{ marginRight: "20px" }}>
                <div className="mb-4">
                  <div className="d-flex gap-3 mb-2">
                    <div className="form-group w-50">
                      <div className="d-flex align-items-center justify-content-between">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Required <span className="text-danger">*</span>
                        </div>
                      </div>
                      <select id="country" className="form-control">
                        <option value="India">India</option>
                      </select>
                    </div>

                    <div className="form-group w-50">
                      <div className="d-flex align-items-center justify-content-between">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Required <span className="text-danger">*</span>
                        </div>
                      </div>
                      <select id="state" className="form-control">
                        <option value="">Please select</option>
                      </select>
                    </div>
                  </div>
                  <small className="text-muted-custom">
                    Jiujitsux is required by law to collect applicable
                    transaction taxes for purchases made in certain tax
                    jurisdictions.
                  </small>
                </div>

                <div>
                  <h4 className="mb-4">Payment method</h4>
                  <div className="border rounded">
                    <div>
                      <div className="form-check mb-3 d-flex align-items-center gap-5 signup-now justify-content-start py-3 h-auto">
                        <input
                          className="form-check-input ms-1"
                          type="radio"
                          name="paymentMethod"
                          id="creditCard"
                          value="creditCard"
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="creditCard"
                        >
                          <FaRegCreditCard className="me-4 fs-4" />
                          Credit/Debit Card
                        </label>
                      </div>
                      {selectedPaymentMethod === "creditCard" && (
                        <div className="credit-card-info mt-4 px-3">
                          <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">
                              Card Number
                            </label>
                            <div className="input-group">
                              <input
                                type="text"
                                id="cardNumber"
                                className="form-control border-end-0"
                                style={{ paddingBlock: "0.7rem" }}
                                placeholder="1234 5678 9012 3456"
                              />
                              <div className="input-group-text border-start-0">
                                <FaRegCreditCard className="fs-5 text-muted" />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-3 mb-3">
                            <div className="w-50">
                              <label
                                htmlFor="expiryDate"
                                className="form-label"
                              >
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                className="form-control"
                                style={{ paddingBlock: "0.7rem" }}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div className="w-50">
                              <label htmlFor="cvv" className="form-label">
                                CVV/CVC
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                className="form-control"
                                style={{ paddingBlock: "0.7rem" }}
                                placeholder="CVC/CVV"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="nameOnCard" className="form-label">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="nameOnCard"
                              className="form-control"
                              style={{ paddingBlock: "0.7rem" }}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="saveCard"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="saveCard"
                            >
                              Securely save this card for later purchases
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="form-check mb-3 d-flex align-items-center gap-5 signup-now justify-content-start py-3 h-auto">
                        <input
                          className="form-check-input ms-1"
                          type="radio"
                          name="paymentMethod"
                          id="upi"
                          value="upi"
                          onChange={handlePaymentMethodChange}
                        />
                        <label className="form-check-label" htmlFor="upi">
                          <CgPaypal className="me-4 fs-4" />
                          UPI
                        </label>
                      </div>
                      {selectedPaymentMethod === "upi" && (
                        <div className="upi-info mt-4 px-3 pb-4">
                          <label htmlFor="upiId" className="form-label">
                            Enter UPI ID/VPA
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            className="form-control"
                            style={{ paddingBlock: "0.7rem" }}
                            placeholder="example@upi"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="form-check d-flex align-items-center gap-5 signup-now justify-content-start py-3 h-auto">
                        <input
                          className="form-check-input ms-1"
                          type="radio"
                          name="paymentMethod"
                          id="netBanking"
                          value="netBanking"
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="netBanking"
                        >
                          <AiOutlineBank className="me-4 fs-4" />
                          Net Banking
                        </label>
                      </div>
                      {selectedPaymentMethod === "netBanking" && (
                        <div className="net-banking-info mt-4 px-3 pb-5">
                          <label
                            htmlFor="bankSelect"
                            className="form-label d-block"
                          >
                            Select Bank
                          </label>
                          <select
                            id="bankSelect"
                            className="w-100 border rounded px-3"
                            style={{ paddingBlock: "0.7rem" }}
                          >
                            <option value="">Please select a bank</option>
                            <option value="bank1">Bank 1</option>
                            <option value="bank2">Bank 2</option>
                            <option value="bank3">Bank 3</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="summary p-4 px-5 rounded w-50 d-flex flex-column gap-4"
                style={{ height: "350px", backgroundColor: "#F7F7F7" }}
              >
                <h4 className="text-center">Summary</h4>
                <div>
                  <div className="d-flex justify-content-between pb-3 border-bottom border-2">
                    <span className="fw-lightBold">Original Price :</span>
                    <span>₹3500</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pt-3">
                    <span className="fw-lightBold">Total :</span>
                    <span className="fw-lightBold">₹3500</span>
                  </div>
                </div>
                <small className="text-muted d-block mb-3">
                  By completing your purchase you agree to these{" "}
                  <a
                    href="#"
                    className="text-black text-decoration-none fw-lightBold"
                  >
                    Terms of Service
                  </a>
                  .
                </small>

                <button
                  className="btn btn-primary w-100 signup-now"
                  onClick={handlePaymentSubmit} // Trigger payment submit
                >
                  Proceed
                </button>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default Checkout;
