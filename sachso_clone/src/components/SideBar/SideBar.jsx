import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  NotificationOutlined,
  BookOutlined,
  ToolOutlined,
  BookFilled,
  TeamOutlined,
  SmileOutlined,
  InfoCircleFilled,
  SettingOutlined,
  FormOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ShareAltOutlined,
  LogoutOutlined

} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import logo from '../../assets/sachso_logo.png'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function SideBar() {

  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      localStorage.removeItem("access_token")

      alert("Đăng xuất thành công")
      navigate('/')

    } else {
      navigate(e.key);

    }

  }

  const adminItems = [
    { key: '/admin', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: '2', icon: <NotificationOutlined />, label: 'Thông báo' },
    { key: '3', icon: <BookOutlined />, label: 'Sách điện tử (offline)' },
    { key: '4', icon: <ToolOutlined />, label: 'Công cụ' },
    { key: '5', icon: <BookFilled />, label: 'Sách điện tử' },
    { key: '6', icon: <TeamOutlined />, label: 'Lớp học' },
    { key: '7', icon: <SmileOutlined />, label: 'Education Game' },
    { key: '8', icon: <InfoCircleFilled />, label: 'Hướng dẫn sử dụng' },
    {
      key: 'sub1',
      label: 'ADMINISTRATORS',
      children: [
        { key: '9', icon: <BookOutlined />, label: 'Thư Viện' },
        { key: '/admin/manage-question', icon: <FormOutlined />, label: 'Quản lí câu hỏi' },
        { key: '11', icon: <TeamOutlined />, label: 'Quản lý lớp học' },
        { key: '12', icon: <CheckCircleOutlined />, label: 'Ngân Hàng đã kiểm tra' },
        { key: '/admin/manage-user', icon: <UserOutlined />, label: 'Quản lý người dùng' },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất' },

      ],
    },
  ];

  const teacherItems = [
    { key: '/teacher', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: '2', icon: <NotificationOutlined />, label: 'Thông báo' },
    { key: '5', icon: <BookFilled />, label: 'Sách điện tử' },
    { key: '3', icon: <BookOutlined />, label: 'Sách điện tử (offline)' },
    { key: '/teacher/manage-class', icon: <TeamOutlined />, label: 'Quản lý Lớp học' },
    { key: '4', icon: <ToolOutlined />, label: 'Công cụ' },
    { key: '6', icon: <ShareAltOutlined />, label: 'Chuyên môn nghiệp vụ' },
    { key: '7', icon: <SmileOutlined />, label: 'Education Game' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất' }
  ];

  const studentItems = [
    { key: '/student', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: '2', icon: <NotificationOutlined />, label: 'Thông báo' },
    { key: '4', icon: <ToolOutlined />, label: 'Công cụ' },
    { key: '5', icon: <BookFilled />, label: 'Sách điện tử' },
    { key: '/student/class', icon: <TeamOutlined />, label: 'Lớp học' },
    { key: '7', icon: <SmileOutlined />, label: 'Education Game' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất' }
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const token = localStorage.getItem('access_token');
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role || null;
    } catch (err) {
      console.error("Lỗi khi decode token:", err);
    }
  }
  let items = [];
  switch (userRole) {
    case 'admin':
      items = adminItems;
      break;
    case 'teacher':
      items = teacherItems;
      break;
    case 'student':
      items = studentItems;
      break;
    default:
      items = [];
  }



  return (
    <div style={{ width: collapsed ? 80 : 256 }} className="transition-all duration-300">
      <div className='flex items-center py-5 px-4'>
        {!collapsed && (
          <img src={logo} alt='Sách số logo' className='h-8' />
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            {/* Có thể thay bằng icon */}
            <span className="text-sm">S</span>
          </div>
        )}

        <Button
          className="ml-auto"
          type="text"
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};


export default SideBar;
