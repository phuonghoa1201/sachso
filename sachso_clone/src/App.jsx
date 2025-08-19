import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/home/Home/Home.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; 
import Login from "./pages/home/Login/Login.jsx";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import StudentRoutes from "./routes/StudentRoutes.jsx";
import Register from "./pages/home/Register/Register.jsx";
import TeacherRoutes from "./routes/TeacherRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLogginSucess = () => {
    setIsLoggedIn(true);
    setOpenLoginModal(false);
    // const role = localStorage.getItem("userRole");
    // if (role === "admin") navigate("/admin");
    // else if (role === "student") navigate("/student");
    // else if (role === "teacher") navigate("/teacher");
    // else navigate("/unauthorized");
  };

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);
   const [registerEmail, setRegisterEmail] = useState("");


  const handleRegisterSuccess = (email) => {
    setRegisterEmail(email); 
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  }

  const showNavbar = !(
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/teacher")
  );

  return (
    <>
      {showNavbar && (
        <Navbar
          onOpenLoginModal={handleOpenLoginModal}
          onOpenRegisterModal={handleOpenRegisterModal}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        
       
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
             <TeacherRoutes/>
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isLoggedIn && (
        <>
          <Login
            open={openLoginModal}
            onClose={handleCloseLoginModal}
            onLoginSuccess={handleLogginSucess}
            prefillEmail={registerEmail}
          />
          <Register open={openRegisterModal} onClose={handleCloseRegisterModal} onRegisterSuccess={handleRegisterSuccess} />
        </>
      )}
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}



