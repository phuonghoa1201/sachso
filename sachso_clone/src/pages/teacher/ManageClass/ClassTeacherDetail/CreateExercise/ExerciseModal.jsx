import { Modal, Button, Form, Input, Table, Image, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import { addExerciseApi, deleteExerciseApi, getAllQuestionsApi, getExerciseApi } from "../../../../../util/teacher/teacherApi";
import { DeleteOutlined } from "@ant-design/icons";
function ExerciseModal({ open, onCancel, classId }) {
  const [form] = Form.useForm();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // câu hỏi đã chọn

  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const [libraryQuestions, setLibraryQuestions] = useState([]);
  const [librarySelectedKeys, setLibrarySelectedKeys] = useState([]);

  // state manage view exercise
  const [exercises, setExercises] = useState([]);

  // Delete modal
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);


  // loading
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false)

  const colors = [
    "#000000", "#f5222d", "#fa541c", "#722ed1",
    "#9254de", "#1890ff", "#40a9ff", "#36cfc9",
    "#73d13d", "#b7eb8f", "#fadb14", "#ffc53d",
    "#fa8c16", "#925e42", "#5c8a94",
  ];

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    form.setFieldsValue({ color });
  };

  // Mở modal thư viện và load câu hỏi
  const handleOpenLibrary = async () => {
    try {
      setLibraryLoading(true);
      const res = await getAllQuestionsApi();
      console.log("API response:", res.DT);
      setLibraryQuestions(res.DT || []);
      // đánh dấu các câu hỏi đã chọn
      setLibrarySelectedKeys(selectedQuestions.map((q) => q._id));
      setLibraryModalOpen(true);
    } catch (err) {
      console.error("Load library error:", err);
    } finally {
      setLibraryLoading(false)
    }
  };

  // Xác nhận chọn câu hỏi từ modal thư viện
  const handleConfirmLibrary = () => {
    const chosen = libraryQuestions.filter((q) => librarySelectedKeys.includes(q._id));
    setSelectedQuestions(chosen);
    setLibraryModalOpen(false);
  };

  // Lưu exercise
  const handleClickSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        // Lôi id của lớp học
        class_id: classId,
        // Lôi id của question mà mình đã chọn từ chỗ library
        questions: selectedQuestions.map((q) => q._id),
      };
      console.log("Payload gửi lên API:", payload);
      setSaveLoading(true);
      const res = await addExerciseApi(payload);
      // Cập nhật bảng luôn
      alert("Tạo bài tập thành công !")
      console.log("Tạo bài tập thành công", res.data);
      form.resetFields();
      setSelectedQuestions([]);
      setSelectedColor(null);

      // Gọi lại API để cập nhật bảng
      fetchExercise();
      setSaveLoading(false)

      // onCancel();
    } catch (err) {
      console.error("Create exercise error:", err);
      setSaveLoading(false)

    }
  };
  // View exercise
  const fetchExercise = async () => {
    const res = await getExerciseApi();
    console.log("API response:", res);
    if (Array.isArray(res)) {
      setExercises(res);
    } else {
      setExercises([]);
    }
  };
  useEffect(() => {
    fetchExercise();
  }, []);



  // Hàm onDelete
  const onDelete = (record) => {
    setExerciseToDelete(record)
    setConfirmDeleteVisible(true)
  }

  // Table bài tập đã tạo
  const selectedColumns = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 60
    },
    {
      title: "Tên bài tập",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Tổng số câu hỏi",
      dataIndex: "totalQuestions",
      key: "totalQuestions",

    },
    {
      key: 'action',
      render: (_, record) => (

        <Button shape="circle" icon={<DeleteOutlined />} danger type="dashed" onClick={() => {
          console.log("DELETE:", record);
          onDelete(record);
        }} />
      ),
    },

  ];

  // Table modal thư viện
  const libraryColumns = [

    { title: "Tên câu hỏi", dataIndex: "content", key: "content" },
    { title: "Lớp", dataIndex: ["gradeId", "name"], key: "grade", render: (_, record) => record.gradeId?.name || "—" },
    { title: "Unit", dataIndex: ["unitId", "name"], key: "unit", render: (_, record) => record.unitId?.name || "—" },
    { title: "Loại", dataIndex: ["questionTypeId", "name"], key: "type", render: (_, record) => record.questionTypeId?.name || "—" },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "image",
      render: (url) => url ? <Image width={100} src={url} /> : "—"
    },
    {
      title: "Audio",
      dataIndex: "audioUrl",
      key: "audio",
      render: (url) => url ? <audio controls src={url} /> : "—"
    }
  ];

  return (
    <>
      <Modal title="TẠO MỚI BÀI TẬP" open={open} onCancel={onCancel} footer={false} width={800}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề:" rules={[{ required: true }]}>
            <Input placeholder="Nhập tiêu đề bài tập" />
          </Form.Item>
          <div style={{ display: "flex", gap: 8 }}>
            <Form.Item name="ex_type" label="Loại bài tập" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="Ví dụ: Ngữ pháp, Từ vựng..." />
            </Form.Item>
            <Form.Item name="score" label="Điểm" rules={[{ required: true }]} style={{ width: 100 }}>
              <Input placeholder="0" />
            </Form.Item>
          </div>

          <Form.Item name="color" label="Màu:" rules={[{ required: true }]}>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleSelectColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-blue-800" : "border-transparent"}`}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item name="requirement" label="Yêu cầu/Hướng dẫn:" rules={[{ required: true }]}>
            <TextArea rows={5} placeholder="Nhập yêu cầu hoặc hướng dẫn cho học sinh" />
          </Form.Item>

          <div className="mb-3">
            <Button type="dashed" onClick={handleOpenLibrary}>
              Chọn câu hỏi từ thư viện
            </Button>
          </div>
          <Spin spinning={libraryLoading} tip="Đang tải câu hỏi..."></Spin>

          <Table
            columns={selectedColumns}
            dataSource={exercises}
            rowKey="_id"
            pagination={false}
            title={() => "Bài tập đã tạo"}
          />
        </Form>

        <div className="flex justify-end mt-4">
          <Button type="primary" onClick={handleClickSave} loading={saveLoading}>
            Lưu thông tin
          </Button>
        </div>
      </Modal>

      {/* Modal thư viện câu hỏi */}
      <Modal
        title="Chọn câu hỏi từ thư viện"
        open={libraryModalOpen}
        onCancel={() => setLibraryModalOpen(false)}
        onOk={handleConfirmLibrary}
        width={900}
      >

        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: librarySelectedKeys,
            onChange: (keys) => setLibrarySelectedKeys(keys),
          }}
          columns={libraryColumns}
          dataSource={libraryQuestions}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        title="Xác nhận xoá"
        open={confirmDeleteVisible}
        onOk={async () => {

          try {
            const res = await deleteExerciseApi(exerciseToDelete._id)
            if (res.EC !== 0) {
              console.error("Lỗi từ backend:", res.error);
              alert("Xóa câu hỏi không thành công", res.error);
              return;
            }
            // Xóa khỏi UI
            setExercises(prev => prev.filter(u => u._id !== exerciseToDelete._id)); // xóa theo _id backend
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
        <p>Bạn có chắc chắn muốn xoá question "<strong>{exerciseToDelete?.title}</strong>" không?</p>
      </Modal>
    </>
  );
}

export default ExerciseModal;
