import { useState } from "react";

const PurchaseHistory = () => {
  const [activeTab, setActiveTab] = useState("courses");

  const courses = [
    {
      courseName: "React Basics",
      date: "26/07/2024",
      price: "$50",
      paymentType: "Credit Card",
    },
    {
      courseName: "Advanced React",
      date: "26/07/2024",
      price: "$100",
      paymentType: "PayPal",
    },
    {
      courseName: "Flutter",
      date: "26/07/2024",
      price: "$300",
      paymentType: "MasterCard",
    },
    {
      courseName: "PHP",
      date: "26/07/2024",
      price: "$30",
      paymentType: "UPI",
    },
    {
      courseName: "Node.js Basics",
      date: "26/07/2024",
      price: "$70.7",
      paymentType: "PayPal",
    },
    {
      courseName: "UI/UX",
      date: "26/07/2024",
      price: "$30.9",
      paymentType: "UPI",
    },
  ];

  return (
    <div className="w-100">
      <header className="bg-gradient-custom-div p-3 pb-0 rounded-bottom-0 custom-box">
        <h3 className="pb-5">Purchase History</h3>
        <div className="d-flex gap-5 px-4">
          <h5
            className={`text-white px-3 pb-2 fw-light cursor-pointer ${
              activeTab === "courses" ? "border-bottom border-4" : ""
            }`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </h5>
          <h5
            className={`text-white px-3 pb-2 fw-light cursor-pointer ${
              activeTab === "refund" ? "border-bottom border-4" : ""
            }`}
            onClick={() => setActiveTab("refund")}
          >
            Refund
          </h5>
        </div>
      </header>
      <div className="tab-content px-3 py-4 custom-box rounded-top-0">
        <div className="px-4">
          {activeTab === "courses" && (
            <div className="tab-pane active">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col" className="text-center ">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Payment Type
                    </th>
                    <th scope="col" className="text-center">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td className="align-middle fs-small py-3">
                        {course.courseName}
                      </td>
                      <td className="text-center align-middle fs-small">
                        {course.date}
                      </td>
                      <td className="text-center align-middle fs-small">
                        {course.price}
                      </td>
                      <td className="text-center align-middle fs-small">
                        {course.paymentType}
                      </td>
                      <td className="text-center align-middle">
                        <div className="d-flex align-items-center justify-content-center">
                          <button className="signup-now py-1 px-3 fw-lightBold fs-small mb-0 h-auto">
                            Print
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "refund" && (
            <div className="tab-pane active">
              <div
                className="d-flex flex-column align-items-center justify-content-center gap-4"
                style={{ minHeight: "25rem" }}
              >
                <h3>You don’t have any refunds </h3>
                <h5 className="fw-light">
                  Any refunds will be processes to the original mode of payment
                </h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
