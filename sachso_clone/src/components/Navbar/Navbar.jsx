import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../../assets/sachso_logo.png";
import styles from './Navbar.module.css'


function Navbar({ onOpenLoginModal, onOpenRegisterModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);


  // Class để active NavLink (đang active sẽ đổi màu)
  const activeClass = "text-blue-900 font-semibold";

  return (
    <nav className="bg-white fixed w-full z-20 top-0 border-b border-gray-200 shadow p-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-4 md:space-x-10">
          <NavLink to="/" className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={logo} alt="Sach so logo" className="h-8" />
          </NavLink>

          <ul className="hidden md:flex space-x-8">
            <li className={styles.textList}>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : undefined)}>
                Trang chủ
              </NavLink>
            </li>
            <li className={styles.textList}>
              <NavLink to="https://phuongnam.edu.vn/" className={({ isActive }) => (isActive ? activeClass : undefined)}>
                Phương Nam
              </NavLink>
            </li>
            <li className={styles.textList}>
              <NavLink to="#" onClick={onOpenLoginModal}>
                Đăng nhập
              </NavLink>
            </li>
            <li className={styles.textList}>
              <NavLink to="#" onClick={onOpenRegisterModal}>
                Đăng ký cho học sinh
              </NavLink>
            </li>

          </ul>
        </div>

        <button
          onClick={handleToggle}
          className="md:hidden text-2xl text-blue-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>


      </div>

      {/* Menu mobile */}
      {isOpen && (
        <ul className="md:hidden bg-white border-t border-gray-200 shadow-lg space-y-3 p-4 text-gray-700 text-lg">
          <li className={styles.textList}>
            <NavLink
              to="/"
              onClick={() => {
                setIsOpen(false);
              }}
              className={({ isActive }) => (isActive ? activeClass : "block")}
            >
              Trang chủ
            </NavLink>
          </li>
          <li className={styles.textList}>
            <NavLink
              to="https://phuongnam.edu.vn/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : "block")}
            >
              Phương Nam
            </NavLink>
          </li>
          <li className={styles.textList}>
            <NavLink
              to="#"
              onClick={() => {
                setIsOpen(false);
                onOpenLoginModal();
              }}

            >
              Đăng nhập
            </NavLink>
          </li>
          <li className={styles.textList}>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenRegisterModal();
              }}
              className="block cursor-pointer"
            >
              Đăng ký cho học sinh
            </button>
          </li>

        </ul>
      )}
    </nav>
  );
}

export default Navbar;
