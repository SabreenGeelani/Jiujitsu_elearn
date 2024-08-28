import { useState } from "react";

export default function ExpertWallet() {
  const [activeTab, setActiveTab] = useState("activity");
  return (
    <div className="w-100">
      <header className=" py-3">
        <h3 className="fw-bold">Welcome back, Basit</h3>
      </header>
      <main className="custom-box py-5">
        <div className="d-flex align-items-center justify-content-between px-5 pb-3">
          <div>
            <h5 className="mb-3">
              Account type: <span className="fw-normal">Expert</span>
            </h5>
            <h5 className="mb-3">
              Status: <span className="fw-normal">Verified</span>
            </h5>
            <h5>
              Recent Payout: <span className="fw-normal">$567</span>
            </h5>
          </div>
          <div className="bg-gradient-custom-div text-center p-2 w-25 rounded-4">
            <h5 className="mb-4 fw-light">Account Balance</h5>
            <div className="mb-4">
              <h6>$678</h6>
            </div>
            <button className="bg-transparent text-white border-white rounded fw-light">
              Withdraw money
            </button>
          </div>
        </div>
        <div className="d-flex gap-5 px-4">
          <h5
            className={`text-white px-3 pb-2 fw-light cursor-pointer ${
              activeTab === "activity"
                ? "border-bottom border-4 bg-gradient-custom-div pt-2 rounded-top"
                : ""
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </h5>
        </div>
        {activeTab === "activity" && (
          <div className="tab-pane active">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" className="text-center ">
                    Date
                  </th>
                  <th scope="col" className="text-center">
                    Type
                  </th>
                  <th scope="col" className="text-center">
                    Payment Status
                  </th>
                  <th scope="col" className="text-center">
                    Amount
                  </th>
                  <th scope="col" className="text-center">
                    Service Charges
                  </th>
                  <th scope="col" className="text-center">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-middle fs-small py-3">Basit</td>
                  <td className="text-center align-middle fs-small">
                    23-08-2024
                  </td>
                  <td className="text-center align-middle fs-small">
                    Credited
                  </td>
                  <td className="text-center align-middle fs-small">Success</td>
                  <td className="text-center align-middle fs-small">$44.30</td>
                  <td className="text-center align-middle fs-small">$4.30</td>
                  <td className="text-center align-middle fs-small">UPI</td>
                </tr>
                <tr>
                  <td className="align-middle fs-small py-3">Jhon</td>
                  <td className="text-center align-middle fs-small">
                    30-08-2024
                  </td>
                  <td className="text-center align-middle fs-small">
                    Credited
                  </td>
                  <td className="text-center align-middle fs-small">Success</td>
                  <td className="text-center align-middle fs-small">$56.30</td>
                  <td className="text-center align-middle fs-small">$4.30</td>
                  <td className="text-center align-middle fs-small">
                    Credit Card
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
