import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SignUp } from "./Pages/SignUppage/SignUp";
import { VerifyEmail } from "./Pages/veryEmail/VerifyEmail";
import { Layout } from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login";
import CourseCreation from "./Pages/CourseCreation/CourseCreation";
import AddLesson from "./Pages/AddLesson/AddLesson";
import Courses from "./Pages/Courses/Courses";
import CourseView from "./Pages/Course overview/CourseView";
import UserCourses from "./Pages/UserCourses/UserCourses";
import UserCourseOverview from "./Pages/UserCourseOverview/UserCourseOverview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Layout>
          <Routes>

            <Route path="/" exact element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/userCourses" element={<UserCourses/>}/>
            <Route path="/courseView/:id" element={<CourseView />} />
            <Route path="/courseCreation" element={<CourseCreation />} />
            <Route path="/addLesson" element={<AddLesson />} />
            <Route path="/userCourseView" element={<UserCourseOverview/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
