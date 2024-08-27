import { Routes, Route } from "react-router-dom";
import UserCourses from "../Pages/UserCourses/UserCourses";
import UserCourseOverview from "../Pages/UserCourseOverview/UserCourseOverview";
import UserCart from "../Pages/UserCart/UserCart";
import PurchaseHistory from "../Pages/PurchaseHistory/PurchaseHistory";
import Messages from "../Pages/UserModule/Messages/Messages";
import Settings from "../Pages/Settings/Settings";
import MyLearning from "../Pages/MyLearning/MyLearning";
import UserPurchasedCourse from "../Pages/UserPurchasedCourse/UserPurchasedCourse";

const UserRoutes = () => (
  <Routes>
    <Route path="/userCourses" element={<UserCourses />} />
    <Route path="/userCourseView/:id" element={<UserCourseOverview />} />

    <Route path="/userCart" element={<UserCart />} />
    <Route path="/purchaseHistory" element={<PurchaseHistory />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/myLearning" element={<MyLearning/>} />
    <Route path="/userPurchasedCourses/:id" element={<UserPurchasedCourse/>} />
  </Routes>
);

export default UserRoutes;
