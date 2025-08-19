import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import GradeSelector from "./GradeSelector";
import { addClassApi } from "../../../../util/teacher/teacherApi";

function CreateClass({ addClassToState }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const classData = {
        gradeId: values.gradeId,         
        nameofClass: values.nameofClass,   
        totalStudent: 0,                 
        noteClass: values.noteClass          
      };

      const res = await addClassApi(
        classData.gradeId,
        classData.nameofClass,
        classData.totalStudent,
        classData.noteClass
      );

      if (res.EC === 0) {
        alert(`Thêm lớp thành công: ${res.DT.nameofClass}`);
        addClassToState?.(res.DT); 
        form.resetFields();
      } else {
        alert(res.EM || "Thêm lớp thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Đã xảy ra lỗi khi thêm lớp học");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Tạo lớp học mới</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Khối lớp */}
        <GradeSelector />

        {/* Tên lớp */}
        <Form.Item
          label="Tên lớp"
          name="nameofClass"
          rules={[{ message: "Vui lòng nhập tên lớp!" }]}
        >
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>

        {/* Ghi chú */}
        <Form.Item label="Ghi chú" name="noteClass">
          <Input.TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
        </Form.Item>

        {/* Nút tạo lớp */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo lớp học
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateClass;
