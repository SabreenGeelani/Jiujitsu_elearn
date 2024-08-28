import { Routes, Route } from "react-router-dom";
import Courses from "../Pages/Courses/Courses";
import CourseCreation from "../Pages/CourseCreation/CourseCreation";
import CourseView from "../Pages/Course overview/CourseView";
import AddLesson from "../Pages/AddLesson/AddLesson";
import ExpertWallet from "../Pages/ExpertWallet/ExpertWallet";
import { useState } from "react";

const ExpertRoutes = () => {
  const [editCourse, setEditCourse] = useState(false);
  const [courseId, setCourseId] = useState("");
  return (
    <Routes>
      <Route path="/courses" element={<Courses />} />
      <Route path="/courseView/:id" element={<CourseView />} />
      <Route
        path="/courseCreation"
        element={
          <CourseCreation editCourse={editCourse} courseeId={courseId} />
        }
      />
      <Route
        path="/addLesson/:id"
        element={
          <AddLesson setEditCourse={setEditCourse} setCourseId={setCourseId} />
        }
      />
      <Route path="/expertWallet" element={<ExpertWallet />} />
    </Routes>
  );
};

export default ExpertRoutes;
