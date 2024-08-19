import { Routes, Route } from "react-router-dom";
import Courses from "../Pages/Courses/Courses";
import CourseCreation from "../Pages/CourseCreation/CourseCreation";
import CourseView from "../Pages/Course overview/CourseView";
import AddLesson from "../Pages/AddLesson/AddLesson";

const ExpertRoutes = () => (
  <Routes>
    <Route path="/courses" element={<Courses />} />
    <Route path="/courseView/:id" element={<CourseView/>} />
    <Route path="/courseCreation" element={<CourseCreation />} />
    <Route path="/addLesson/:id" element={<AddLesson />} />
  </Routes>
);

export default ExpertRoutes;
