import { Select, Form, Button, Input, Tag, Space } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

function FilterQuestion({ onFilter }) {
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = useState({});

  const onFinish = (values) => {
    setFilterValues(values);
    onFilter(values);
  };

  const handleRemoveFilter = (key) => {
    const updated = { ...filterValues, [key]: undefined };
    setFilterValues(updated);
    form.setFieldsValue({ [key]: undefined });
    onFilter(updated);
  };

  const getLabel = (key) => {
    const labels = {
      class: "Khối lớp",
      unit: "Unit",
      skill: "Kỹ năng",
      type: "Dạng câu hỏi",
      request: "Yêu cầu đề bài",
      level: "Mức độ",
      question: "Câu hỏi",
    };
    return labels[key] || key;
  };

  return (
    <div className="py-4 px-4 space-y-4">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{}}
        className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4"
      >
        <Form.Item name="class" label="Khối lớp" className="flex-1">
          <Select
            showSearch
            placeholder="Chọn khối lớp"
            allowClear
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "Lớp 1", label: "Lớp 1" },
              { value: "Lớp 2", label: "Lớp 2" },
              { value: "Lớp 3", label: "Lớp 3" },
              { value: "Lớp 4", label: "Lớp 4" },
            ]}
          />
        </Form.Item>

        <Form.Item name="unit" label="Unit" className="flex-1">
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder="Chọn Unit"
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "Unit 1", label: "Unit 1" },
              { value: "Unit 2", label: "Unit 2" },
              { value: "Unit 3", label: "Unit 3" },
              { value: "Unit 4", label: "Unit 4" },
              { value: "Unit Starter", label: "Unit Starter" },
              { value: "End of Year", label: "End of Year" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Kỹ năng" name="skill">
          <Input type="text" />
        </Form.Item>

        <Form.Item name="type" label="Dạng câu hỏi" className="flex-1">
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "Fill Color", label: "Fill Color" },
              { value: "Multiple Choice", label: "Multiple Choice" },
              { value: "Sentence Completion", label: "Sentence Completion" },
            ]}
          />
        </Form.Item>

        <Form.Item name="request" label="Yêu cầu đề bài" className="flex-1">
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Listen, read and tick the correct anwser.",
                label: "Listen, read and tick the correct anwser.",
              },
              {
                value: "Look at the picture and write the missing word.",
                label: "Look at the picture and write the missing word.",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="level" label="Mức độ nhận thức" className="flex-1">
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "Thông hiểu", label: "Thông hiểu" },
              { value: "Vận dụng", label: "Vận dụng" },
              { value: "Nâng cao", label: "Nâng cao" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Câu hỏi" name="question">
          <Input type="text" placeholder="Câu hỏi" />
        </Form.Item>

        <Form.Item className="flex-none">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>

      {/* 💡 Hiển thị chip bộ lọc đang hoạt động */}
      <Space wrap>
        {Object.entries(filterValues)
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([key, value]) => (
            <Tag
              key={key}
              closable
              onClose={() => handleRemoveFilter(key)}
              icon={<CloseOutlined />}
            >
              {`${getLabel(key)}: ${
                Array.isArray(value) ? value.join(", ") : value
              }`}
            </Tag>
          ))}
      </Space>
    </div>
  );
}

export default FilterQuestion;