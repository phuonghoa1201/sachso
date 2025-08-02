import { Modal, Button, Form, Input, Select } from "antd";
import { useState } from "react";
import modalImg from '../../../assets/modalImg.png';
import { createUserApi } from "../../../util/api";

// const { Option } = Select;

function Register({ open, onClose, onRegisterSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    const today = new Date().toISOString();
    const { name, email, password, level, phone } = values;

    const res = await createUserApi(name, email, password, level, phone, today);

    if (res) {
      alert("Tạo tài khoản thành công");


      setTimeout(() => {
        setLoading(false);
        form.resetFields();
        onClose();
        onRegisterSuccess(email);
      }, 1000);
    } else if (res && res.message) {
      alert(res.message); 
      setLoading(false);

    } else {
      alert("Lỗi tạo tài khoản")
      setLoading(false);
    }
  };

  return (
    <Modal title="ĐĂNG KÝ" centered open={open} onCancel={onClose} footer={null}>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 h-full">
        <div className="w-full md:w-1/2">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Cấp" name="level" rules={[{ required: true, message: "Vui lòng chọn cấp!" }]}>
              <Select placeholder="Chọn cấp">
                <Select.Option value="Cấp 1">Cấp 1</Select.Option>
                <Select.Option value="Cấp 2">Cấp 2</Select.Option>
                <Select.Option value="Cấp 3">Cấp 3</Select.Option>
                <Select.Option value="Khác">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Điện thoại" name="phone">
              <Input type="tel" />
            </Form.Item>
            <Form.Item>
              <Button className="w-full" type="primary" htmlType="submit" loading={loading}>
                ĐĂNG KÝ
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <img className="w-full h-full" src={modalImg} alt="Register visual" />
        </div>
      </div>
    </Modal>
  );
}

export default Register;
