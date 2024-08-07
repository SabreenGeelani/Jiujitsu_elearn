import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import { SignUp } from "../Pages/SignUppage/SignUp";
import { VerifyEmail } from "../Pages/veryEmail/VerifyEmail";
import ExpertRoutes from "./ExpertRoutes";
import UserRoutes from "./UserRoutes";
const role = localStorage.getItem("userType");
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/verifyEmail" element={<VerifyEmail />} />

    {role === "expert" && <Route path="*" element={<ExpertRoutes />} />}
    {role === "user" && <Route path="*" element={<UserRoutes />} />}
  </Routes>
);

export default AppRoutes;
