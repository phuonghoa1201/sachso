import { Select, Form, Button, Input } from "antd";

function FilterUser({ onSearchFilter }) {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="py-4 px-4">
        <Form
          form={form}
          layout="inline"
          onFinish={onSearchFilter}
          className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4"
          initialValues={{
            role: "",  
            level: "",
          }}
        >
          <Form.Item name="role" label="Loại tài khoản" className="flex-1">
            <Select
              showSearch
              placeholder="Chọn loại tài khoản"
              allowClear
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: "student", label: "Học sinh" },
                { value: "teacher", label: "Giáo viên" },
                { value: "staff", label: "Nhân viên" },
                // Bạn có thể thêm {value: "", label: "Tất cả"} nếu muốn
              ]}
            />
          </Form.Item>

          <Form.Item name="level" label="Cấp" className="flex-1">
            <Select
              showSearch
              placeholder="Chọn cấp"
              allowClear
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: "Cấp 1", label: "Cấp 1" },
                { value: "Cấp 2", label: "Cấp 2" },
                { value: "Cấp 3", label: "Cấp 3" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Email" name="email" className="flex-1">
            <Input type="email" placeholder="Nhập email" allowClear />
          </Form.Item>

          <Form.Item label="Điện thoại" name="phone" className="flex-1">
            <Input type="text" placeholder="Nhập số điện thoại" allowClear />
          </Form.Item>

          <Form.Item className="flex-none">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default FilterUser;
