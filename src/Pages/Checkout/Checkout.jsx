import { MdCheck } from "react-icons/md";
import "./Checkout.css";

function Checkout() {
  return (
    <div className="w-100">
      {/* {paymentSuccessful ? ( */}
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
              onClick={() => (window.location.href = "/myLearning")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
