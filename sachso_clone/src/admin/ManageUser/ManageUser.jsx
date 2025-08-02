import { PlusOutlined, InsertRowAboveOutlined, } from "@ant-design/icons";
import TableUser from "./TableUser/TableUser";
import { useEffect, useState } from "react";
import AddUser from "./CrudUser/AddUser";
import ImportExcel from "./CrudUser/ImportExcel.jsx";
import FilterUser from "./CrudUser/FilterUser.jsx";
import { Modal } from "antd";
import ViewUser from "./CrudUser/ViewUser.jsx";
import { deleteUserApi, getUserApi, viewUserApi } from "../../util/api.js";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [openImportExcel, setImportExcel] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      console.log("API response:", res);
      if (Array.isArray(res)) {
        setUsers(res);
      } else {
        setUsers([]);
      }
    };
    fetchUser();
  }, []);

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
    setEditingUser(null);
  };

  const handleEditModal = (user) => {
    setEditingUser(user);
    setOpenAddUserModal(true);
  };

  const handleViewUser = async (user) => {
    try {
      const res = await viewUserApi(user._id);
      if (res.EC == 0) {
        setViewUser(res.DT)
      } else {
        alert("Không lấy được data người dùng")
      }

    } catch (error) {
      console.error("Lỗi khi gọi API xem chi tiết:", error);
      alert("Đã xảy ra lỗi khi xem chi tiết người dùng");

    }

    // setViewUser(user);
  };

  const addUser = (newUserFromBackend) => {
    setUsers(prev => [...prev, newUserFromBackend]); // thêm user có _id từ backend
    handleCloseAddUserModal();
  };

  const updateUser = (updatedUserFromBackend) => {
    setUsers(prev =>
      prev.map(user =>
        user._id === updatedUserFromBackend._id ? updatedUserFromBackend : user
      )
    );
    handleCloseAddUserModal();
  };

  const handleImportExcelData = (excelData) => {
    const newUsers = excelData.map((item, index) => ({
      ...item,
      key: `excel-${index}`, // thêm key tạm
      id: Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      positions: item.positions?.trim() ? [item.positions.trim()] : ["Khác"],
      levels: item.levels?.trim() ? [item.levels.trim()] : ["Khác"]
    }));
    setUsers(prev => [...prev, ...newUsers]);
    setImportExcel(false);
  };

  const handleFilterChange = (values) => {
    setFilterValues(values);
  };

  const filteredUser = (() => {
    const roleFilter = filterValues.role?.trim();
    const levelFilter = filterValues.level?.trim();
    const emailFilter = filterValues.email?.trim().toLowerCase();
    const phoneFilter = filterValues.phone?.trim();

    // Nếu không có filter nào thì trả về tất cả users
    if (!roleFilter && !levelFilter && !emailFilter && !phoneFilter) {
      return users;
    }

    return users.filter(user => {
      const roleMatch = roleFilter ? user.role === roleFilter : true;
      const levelMatch = levelFilter ? user.level === levelFilter : true;
      const emailMatch = emailFilter
        ? user.email?.toLowerCase().includes(emailFilter)
        : true;
      const phoneMatch = phoneFilter
        ? String(user.phone).includes(phoneFilter)
        : true;

      return roleMatch && levelMatch && (emailMatch || phoneMatch);
    });
  })();


  return (

    <div>
      <div className="w-full h-32 bg-blue-300">
        <div className="  mx-auto mt-4 bg-white">
          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
            <div className="uppercase text-xl font-medium">
              Quản lý người dùng
            </div>
            <div className="flex space-x-2 text-sm">
              <button className=" py-2 border rounded border-gray-400 px-2" onClick={() => { setEditingUser(null); setOpenAddUserModal(true); }}>
                <PlusOutlined /> Thêm người dùng
              </button>
              <button onClick={() => setImportExcel(true)} className=" py-2 border rounded border-gray-400 px-2" >
                <InsertRowAboveOutlined /> Nhập từ excel
              </button>
            </div>
          </div>


          {/* <div className="flex justify-between">
        <button onClick={() => { setEditingUser(null); setOpenAddUserModal(true); }}>
          <PlusOutlined /> Thêm người dùng
        </button>
        <button onClick={() => setImportExcel(true)}>
          <InsertRowAboveOutlined /> Nhập từ Excel
        </button>
      </div> */}

          <FilterUser onSearchFilter={handleFilterChange} />

          <TableUser
            users={filteredUser}
            onEdit={handleEditModal}
            onView={handleViewUser}
            onDelete={(user) => { setUserToDelete(user); setConfirmDeleteVisible(true); }}
          />

          <AddUser
            openAddUser={openAddUserModal}
            closeAddUser={handleCloseAddUserModal}
            addUser={addUser}
            updateUser={updateUser}
            userToEdit={editingUser}
          />

          <ImportExcel
            openImportExcel={openImportExcel}
            closeImportExcel={() => setImportExcel(false)}
            onImportExcel={handleImportExcelData}
          />

          <ViewUser
            openViewUser={!!viewUser}
            closeViewUser={() => setViewUser(null)}
            userData={viewUser}
          />

          <Modal
            title="Xác nhận xoá"
            open={confirmDeleteVisible}
            onOk={async () => {

              try {
                const res = await deleteUserApi(userToDelete._id)
                if (res.EC !== 0) {
                  console.error("Lỗi từ backend:", res.error);
                  alert("Xóa người dùng không thành công", res.error);
                  return;
                }
                // Xóa khỏi UI
                setUsers(prev => prev.filter(u => u._id !== userToDelete._id)); // xóa theo _id backend
              } catch (error) {
                console.error("Lỗi khi gọi API:", error.message || error);
                alert("Đã xảy ra lỗi khi chỉnh sửa người dùng");
                return;

              }

              setConfirmDeleteVisible(false);
            }}
            onCancel={() => setConfirmDeleteVisible(false)}
            okText="Xoá"
            cancelText="Hủy"
            okType="danger"
          >
            <p>Bạn có chắc chắn muốn xoá user "<strong>{userToDelete?.name}</strong>" không?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
