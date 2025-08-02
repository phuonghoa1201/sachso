import SideBar from "../components/SideBar/SideBar";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import DashboardBreadcrumbs from "../components/DashboardHeader/DashboardBreadcumbs";
import { Routes, Route } from 'react-router-dom';
import ManageQuestion from "../admin/ManageQuestion/ManageQuestion";
import ManageUser from "../admin/ManageUser/ManageUser";
function AdminRoutes() {
     return (
       <div className="flex h-screen overflow-x-hidden">
            <div>
                <SideBar />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <div className="flex-1 p-4 bg-blue-300">
                    <DashboardBreadcrumbs/>
                    <Routes>
                        <Route path="" element={<div>Trang dashboard chính</div>} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="manage-question" element={<ManageQuestion />} />
                    </Routes>
                  
                </div>
            </div>
        </div>
    );

}
export default AdminRoutes;