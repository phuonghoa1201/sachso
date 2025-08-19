import SideBar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import DashboardBreadcrumbs from "../components/DashboardHeader/DashboardBreadcumbs";
import { Routes, Route } from "react-router-dom";
import ManageClass from "../pages/teacher/ManageClass/ManageClass";
import ClassTeacherDetail from "../pages/teacher/ManageClass/ClassTeacherDetail/ClassTeacherDetail";
function TeacherRoutes() {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <div>
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <div className="flex-1 p-4 bg-blue-300">
          <DashboardBreadcrumbs />
          <Routes>
            {/* Index route cho dashboard chính */}
            <Route index element={<div>Trang dashboard teacher chính</div>} />

            {/* Các route con */}
            <Route path="manage-class" element={<ManageClass />} />
            <Route path="manage-class/:id_class" element={<ClassTeacherDetail />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default TeacherRoutes;
