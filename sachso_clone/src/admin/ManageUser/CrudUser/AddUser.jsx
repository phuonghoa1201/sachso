import { Modal, Form, Input, Select, message } from "antd";
import { useEffect } from "react";
import { addUserApi, editUserApi } from "../../../util/api";

function AddUser({ openAddUser, closeAddUser, addUser, updateUser, userToEdit = null }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (userToEdit) {
      form.setFieldsValue(userToEdit);
    } else {
      form.resetFields();
    }
  }, [userToEdit, form]);

  const onFinish = async (values) => {
    const today = new Date().toISOString();
    const { name, email, role, level, phone } = values
    if (userToEdit) {
      try {
        const updatedData = { name, email, role, level, phone, today }
        const res = await editUserApi(userToEdit._id, updatedData)
        if (res.EC !== 0) {
          console.error("Lỗi từ backend:", res.error);
          alert("Sửa người dùng không thành công", res.error);
          return;
        }

        alert(`Chỉnh sửa dùng thêm thành công !`)
        updateUser({ ...userToEdit, ...updatedData });


      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message || error);
        alert("Đã xảy ra lỗi khi chỉnh sửa người dùng");
        return;

      }


    } else {
      // addUser(values);
      try {
        const res = await addUserApi(name, email, role, level, phone, today);

        if (res.EC !== 0) {
          console.error("Lỗi từ backend:", res.error);
          alert("Thêm người dùng không thành công do trùng email", res.error);
          return;
        }

        alert(`Người dùng thêm thành công !`)
        addUser(values);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err.message || err);
        alert("Đã xảy ra lỗi khi thêm người dùng");
        return;
      }
    }
    form.resetFields();
    closeAddUser();
  };

  return (
    <div>
      <Modal
        title={userToEdit ? "Sửa Người dùng" : "Thêm Người dùng"}
        centered
        open={openAddUser}
        onCancel={closeAddUser}
        footer={null}
      >
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 h-full">
          <div className="w-full">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Vui lòng tên!" }]}
              >
                <Input type="name" placeholder="Nhập tên người dùng cần thêm" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input type="email" placeholder="Nhập email cần thêm" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input type="phone" placeholder="Nhập số điện thoại" />
              </Form.Item>

              <div className="flex space-x-4">
                <Form.Item
                  className="flex-1"
                  label="Loại tài khoản"
                  name="role"
                  rules={[{ required: true, message: "Vui lòng nhập loại tài khoản" }]}
                >
                  <Select
                    placeholder="Chọn loại tài khoản"
                    options={[
                      { value: "student", label: "Học sinh" },
                      { value: "teacher", label: "Giáo viên" },
                      { value: "staff", label: "Nhân viên" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Cấp"
                  name="level"
                  rules={[{ required: true, message: "Vui lòng nhập cấp tài khoản" }]}
                >
                  <Select
                    placeholder="Chọn cấp"
                    options={[
                      { value: "Cấp 1", label: "Cấp 1" },
                      { value: "Cấp 2", label: "Cấp 2" },
                      { value: "Cấp 3", label: "Cấp 3" },
                      { value: "Khác", label: "Khác" },
                    ]}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 w-full text-white p-1"
                >
                  {userToEdit ? "Cập nhật người dùng" : "Thêm người dùng"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddUser;