import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Modal, Tabs, Spin, Dropdown, Button } from "antd";
import { deleteClassApi, viewClassApi } from "../../../../util/teacher/teacherApi";
import { AuthContext } from "../../../../components/context/auth.context";
import { getAccountApi } from "../../../../util/api";
import CreateExercise from "./CreateExercise/CreateExercise";
import { DeleteFilled, EditFilled, EllipsisOutlined } from '@ant-design/icons';
import ClassUpdateModal from "./ClassUpdateModal";
import { useNavigate } from "react-router-dom";
function ClassTeacherDetail() {
  const { id_class } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const navigate = useNavigate();

  // Delete modal
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);


  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await viewClassApi(id_class);
        console.log("Data response", res);

        if (res.EC === 0) {
          setClassInfo(res.DT);

        } else {
          alert("Không tìm thấy lớp hoặc lỗi server");
        }
      } catch (error) {
        console.error(error);
        alert("Lỗi khi lấy chi tiết lớp");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id_class]);

  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext); // lấy cả setAuth
  console.log(">>Check auth:", auth);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true)
      const res = await getAccountApi();
      console.log("Load Acouunt", res);

      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
            phone: res.phone

          }
        });
      }
      setAppLoading(false)
    };
    fetchAccount();
  }, [setAuth]);

  const handleUpdate = async (updatedData) => {
    setClassInfo(updatedData)
    console.log("Dữ liệu cập nhật:", updatedData);
    // alert("Cập nhật thành công!");
    setOpenUpdateModal(false);
   
  };


  if (loading) return <Spin tip="Đang tải chi tiết lớp..." className="m-8" />;
  if (!classInfo)
    return (
      <div className="p-6 text-red-500 font-semibold">
        Không tìm thấy lớp có mã: {id_class}
      </div>
    );

  const items = [
    { key: "1", label: "Bài tập", children: <CreateExercise classId={classInfo._id} /> },
    { key: "2", label: "Kết quả làm bài", children: "Content of Tab Pane 2" },
    { key: "3", label: "Đánh giá thường xuyên", children: "Content of Tab Pane 3" },
    { key: "4", label: "Đánh giá định kỳ", children: "Content of Tab Pane 4" },
    { key: "5", label: "Học sinh", children: "Content of Tab Pane 5" },
    { key: "6", label: "Thông báo", children: "Content of Tab Pane 6" },
    { key: "7", label: "Rèn luyện bồi dưỡng", children: "Content of Tab Pane 7" },
  ];

  const menu = {
    items: [
      {
        key: 'edit',
        label: 'Sửa thông tin',
        icon: <EditFilled />,
        onClick: () => setOpenUpdateModal(true), // bật modal
      },
      {
        key: 'delete',
        label: 'Xóa lớp học',
        icon: <DeleteFilled />,
        danger: true,
        onClick: () => {
          setClassToDelete(classInfo),
          setConfirmDeleteVisible(true)
        }
          
      },
    ],
  };



  return (
    <div className="mx-auto mt-4 bg-white">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
        <div className="uppercase text-xl font-medium">Thông tin lớp học</div>
        <div className="flex space-x-2 text-sm">
          <button className="py-2 text-white rounded bg-blue-500 px-4">Báo cáo</button>
          <Dropdown menu={menu} trigger={['click']} placement="bottomRight">
            <Button
              shape="circle"
              icon={<EllipsisOutlined className="text-xl text-gray-700" />}
            />
          </Dropdown>


        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 m-4 sm:grid-cols-2 md:grid-cols-6 border border-gray-300">
        {/* Mã lớp học */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words">Mã lớp học</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words">{classInfo.shortCode}</div>

        {/* Tên lớp học */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words">Tên lớp học</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words">{classInfo.nameofClass}</div>

        {/* Sỉ số */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words">Sỉ số</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words">{classInfo.totalStudent}</div>

        {/* Giáo viên */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words">Giáo viên</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words">{auth.user.name || "Chưa gán"}</div>

        {/* Điện thoại */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words">Điện thoại</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words">{auth.user.phone || "Chưa có"}</div>

        {/* Email */}
        <div className="border border-gray-300 px-4 py-2 bg-gray-200 text-sm break-words truncate">Email</div>
        <div className="border border-gray-300 px-4 py-2 text-sm break-words truncate">{auth.user.email || "Chưa có"}</div>
      </div>



      {/* Tabs */}
      <div className="my-8 mx-4 h-100">
        <Tabs defaultActiveKey="1" items={items} />
      </div>

      <ClassUpdateModal
        open={openUpdateModal}
        onCancel={() => setOpenUpdateModal(false)}
        onUpdate={handleUpdate}
        classData={classInfo}
      />

      {/* Delete Confirm Modal */}
      <Modal
        title="Xác nhận xoá"
        open={confirmDeleteVisible}
        onOk={async () => {

          try {
            const res = await deleteClassApi(classToDelete._id)
            console.log("Api response", res);
            
            if (res.EC !== 0) {
              console.error("Lỗi từ backend:", res.error);
              alert("Xóa lớp học không thành công", res.error);
              return;
            }
            navigate("/teacher/manage-class")
            // Xóa khỏi UI
          //  setClasses(prev => prev.filter(c => c._id !== classToDelete._id));
          } catch (error) {
            console.error("Lỗi khi gọi API:", error.message || error);
            alert("Đã xảy ra lỗi khi xóa lớp học");
            return;

          }

          setConfirmDeleteVisible(false);
        }}
        onCancel={() => setConfirmDeleteVisible(false)}
        okText="Xoá"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xoá lớp "<strong>{classToDelete?.nameofClass}</strong>" không?</p>
      </Modal>

    </div >
  );
}

export default ClassTeacherDetail;
